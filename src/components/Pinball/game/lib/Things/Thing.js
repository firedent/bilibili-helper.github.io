/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description: 物体类
 */
import {BOTTOM, CENTER, LEFT, NOT_INTERSECT, RIGHT, TOP} from 'Pinball/game/lib-old/Math';
import {PullForce} from 'Pinball/game/lib/Forces/PullForce';
import {PushForce} from 'Pinball/game/lib/Forces/PushForce';
import {LimitedVector2} from 'Pinball/game/lib/Math';
import UUID from 'uuid/v1';
import {Rectangle, Container} from 'pixi.js';

export class CollisionResult {
    prototype;
    subAttrName;
    operation;
    value;
    priority;

    constructor(prototype, subAttrName, operation, value, priority = 0) {
        this.prototype = prototype;
        this.subAttrName = subAttrName;
        this.operation = operation;
        this.value = value;
        this.priority = priority;
    }
}

export class CollisionResultMap {
    /**
     *
     * @type {Array[CollisionResult]}
     */
    results = [];

    constructor() {}

    get size() {
        return this.results.length;
    }

    sort() {
        this.results.sort((a, b) => a.priority < b.priority ? -1 : 0);
    }

    add({prototype, subAttrName, operation, value, priority = 0}) {
        this.results.push(new CollisionResult(prototype, subAttrName, operation, value, priority));
    }

    each(callback) {
        this.sort();
        if (typeof callback === 'function' && this.results.length > 0) {
            this.results.map(callback);
        }
    }

    clear() {
        this.results.length = 0;
    }
}

/**
 * 物体类
 */
export class Thing {
    /**
     * 同一帧更新标记，如果和当前time相同则默认不更新
     * @type {number}
     * @private
     */
    _updateSign = -1;
    _bbox;

    game; // pixi.js's application
    next = { // 碰撞检测前计算的出的运动结果数据集
        velocity: new LimitedVector2(0, 0),
    };
    collisionResult = new CollisionResultMap(); // 碰撞检测后，响应前存储的根据碰撞检测结果生成的调整数据集
    newNext = new Map(); // 碰撞响应后下一帧的数据集

    type = 'basic'; // 标记类型，默认为basic

    /**
     * 坐标位置
     * @param vector {LimitedVector2}
     * @private
     */
    _position = new LimitedVector2(0, 0); // 位置
    acceleration = new LimitedVector2(0, 0); // 加速度
    velocity = new LimitedVector2(0, 0); // 速度
    mass; // 质量
    density; // 密度

    shape; // 形状管理对象，更新并输出item
    item = new Container(); // 渲染对象

    forces = [];

    /**
     * 物体基类
     * @param app 渲染器对象
     * @param position 坐标
     * @param mass 质量
     * @param originAcceleration 初始加速度
     */
    constructor({game, position, mass, density, originAcceleration}) {
        this.id = UUID();
        this.game = game;

        this.position = position;
        this.next.position = this.position;

        this.mass = mass;
        //this.next.mass = this.mass;

        this.density = density;
        //this.next.density = this.density;

        this.acceleration = originAcceleration;
        //this.next.acceleration = this.acceleration;
    }

    get app() {
        return this.game.app;
    }

    get volume() {
        return this.mass / this.density;
    }

    get crossSection() { // 横截面积
        return this.volume / 5; // 先用体积的五分之一代替
    }

    get lastTime() {
        return this.app.ticker.lastTime;
    }

    /**
     * 属性设置
     */
    get position() {
        return this._position;
    }

    /**
     * 坐标位置
     * @param vector {LimitedVector2}
     */
    set position(vector) {
        const res = vector.checkXY(true);
        window.res = res;
        this._position = vector;
        this.item.x = vector.x;
        this.item.y = vector.y;
    }

    /**
     * 状态更新处理
     */

    /**
     * 将上一帧计算的到并暂存在next中的数据更新到当前帧，用于计算下一帧
     */
    update() {
        for (let key in this.next) {
            const value = this.next[key];
            if (this[key]) {
                this[key] = value;
                delete this.next[key];
            }
        }
    }

    /**
     * 受力处理及相关部分
     */

    /**
     * 施加拉力
     */
    pull(vector) {
        this.addForce(new PullForce(this, vector));
    }

    /**
     * 对目标施加推力，同时会受到反作用力
     * @param targetThing {PIXI.Rectangle}
     */
    push(targetThing) {
        const pushForce = new PushForce(targetThing); // 对目标施加推力
        this.addForce(new PullForce(this, pushForce.reactionForce)); // 对自身施加其反作用力（拉力）
    }

    /**
     * 增加受力
     * @param force {Force}
     */
    addForce(force) {
        this.forces.push(force);
        return this;
    }

    /**
     * 力的合成
     * 生成新的加速度，速度和位置到next中
     * @return {Thing}
     */
    composite() {
        const newAcceleration = new LimitedVector2(0, 0);
        this.forces.forEach((force) => {
            // 过滤掉不满足触发条件的力
            if (force.condition() && force.f.length > 0) { // 受力不为零
                newAcceleration.add(force.f);
            }
        });
        this.forces.forEach((force, index) => {
            // 不满足条件的力并且是非持久力则删除
            if (force.instantaneous) this.forces.splice(index, 1);
        });
        const newVelocity = this.velocity.clone().add(newAcceleration);
        const newPosition = this.position.clone().add(newVelocity);
        this.next['acceleration'] = newAcceleration;
        this.next['velocity'] = newVelocity;
        this.next['position'] = newPosition;
        return this;
    }

    /**
     * 合并next和碰撞检测处理结果生成newNext用于下一帧的渲染数据
     */
    compositeWithNextAndCollisionResult() {
        if (this.collisionResult.size > 0) {
            this.collisionResult.each((o) => {
                const {prototype, subAttrName, operation, value} = o;
                const param = this.next[prototype];
                if (param !== undefined) {
                    if (param instanceof LimitedVector2) {
                        if (subAttrName && param[subAttrName] !== undefined && operation === 'set') {
                            const newParam = param.clone();
                            newParam[subAttrName] = value;
                            this.newNext.set(prototype, newParam);
                        } else {
                            this.newNext.set(prototype, value);
                        }
                    }
                }
            });
            this.collisionResult.clear();
        } else {
            for (let key in this.next) {
                this.newNext.set(key, this.next[key]);
            }
        }
        return this;
    }

    updateWithNewNext() {
        for (let [key, value] of this.newNext) {
            //if (key === 'position') {
            //    this.position = value;
            //} else {
            //if (this[key] instanceof LimitedVector2) {
            //    //console.log(this[key]);
            //    this[key].set(value.x, value.y);
            //} else {
            this[key] = value;
            //}
            //}
        }
        this.newNext.clear();
    }

    /**
     * 碰撞检测部分
     */

    /**
     * 与圆角矩形碰撞检测
     */
    collisiionWithThing(ting) {
        const collisionRes = this.onBBox(ting.nextBBox());
        if (collisionRes[0] !== NOT_INTERSECT && collisionRes !== NOT_INTERSECT) return;
        else if (collisionRes[0] !== CENTER && collisionRes !== CENTER) {

        } else {
            if (collisionRes[0] === LEFT) {

            }
        }
    }

    /**
     * 与场景进行碰撞检测
     * @param scene {Thing}
     */
    collisionWithScene(scene) {
        const collisionRes = scene.inBBox(this.nextBBox());
        if (collisionRes[0] === CENTER && collisionRes[1] === CENTER) return false; // 未与场景边缘碰撞
        return collisionRes;
    }

    /**
     * 获取
     * @param force 强制更新标记
     * @return {PIXI.Rectangle}
     */
    BBox(force = false) {
        if (this._updateSign !== this.lastTime || force) {
            this._bbox = this.item.getBounds();
        }
        return this._bbox;
    }

    /**
     * 根据下一帧数据返回BBox
     * @return {PIXI.Rectangle}
     */
    nextBBox() {
        const {position} = this.next;
        const {width, height} = this.item;
        return new Rectangle(position.x, position.y, width, height);
    }

    /**
     * 包围盒内测试，返回全包含和碰撞方向两种状态
     * @param targetBoundRect {PIXI.Rectangle}
     * @return {*[]}
     */
    inBBox(targetBoundRect) {
        const [axis1, axis2] = this.checkBBox(targetBoundRect);
        let res = [null, null];

        if (axis1 <= 3) res[0] = LEFT;
        else if (axis1 >= 6) res[0] = RIGHT;
        else res[0] = CENTER;

        if (axis2 <= 3) res[1] = TOP;
        else if (axis2 >= 5) res[1] = BOTTOM;
        else res[1] = CENTER;

        return res;
    }

    /**
     * 包围盒测试，返回全包含，碰撞方向和未碰撞三种状态
     * @param targetBoundRect {PIXI.Rectangle}
     * @return {*[]}
     */
    onBBox(targetBoundRect) {
        const [axis1, axis2] = this.checkBBox(targetBoundRect);

        let res = [null, null];

        if (axis1 === 1 || axis1 === 2) res[0] = RIGHT;
        else if (axis1 === 7 || axis1 === 8) res[0] = LEFT;
        else if (axis1 === 0 || axis1 === 9) {
            res[0] = NOT_INTERSECT;
        } else res[0] = CENTER;

        if (axis2 === 1 || axis2 === 2) res[1] = BOTTOM;
        else if (axis2 === 7 || axis2 === 8) res[1] = TOP;
        else if (axis2 === 0 || axis2 === 9) {
            res[1] = NOT_INTERSECT;
        } else res[1] = CENTER;

        return res;
    }

    /**
     * 包围盒测试，返回未碰撞和其他两种状态
     * @param targetBoundRect {PIXI.Rectangle}
     * @return {*[]}
     */
    outBBOx(targetBoundRect) {
        const [axis1, axis2] = this.checkBBox(targetBoundRect);

        let res = [null, null];

        if (axis1 < 1) res[0] = RIGHT;
        else if (axis1 > 8) res[0] = LEFT;
        else res[0] = CENTER;

        if (axis2 < 1) res[1] = BOTTOM;
        else if (axis2 > 8) res[1] = TOP;
        else res[1] = CENTER;

        return res;
    }

    /**
     * bbox双轴测试
     * @param {PIXI.Rectangle}
     * @return {number[]}
     */
    checkBBox(targetBoundRect) {
        const {x, width, y, height, right, bottom} = targetBoundRect;
        const bbox = this.BBox();
        const axis1 = this.segmentRelationship( // y轴向投影测试
            {
                x: bbox.left,
                w: bbox.width,
                y: bbox.right,
            },
            {
                x,
                w: width,
                y: right,
            },
        );
        const axis2 = this.segmentRelationship( // x轴向投影测试
            {
                x: bbox.y,
                w: bbox.height,
                y: bbox.bottom,
            },
            {
                x: y,
                w: height,
                y: bottom,
            },
        );
        return [axis1, axis2];
    }

    /**
     * 根据分离轴定律做包围盒相交性测试
     * 判断两线段位置关系
     * @param segment1
     * @param segment2
     * @return {number}
     */
    segmentRelationship({x: x1, w: w1, y: y1}, {x: x2, w: w2, y: y2}) {
        const deltaX = x1 - x2;
        const deltaW = w1 - w2;
        const deltaY = y1 - y2;
        if (y1 < x2) return 0; // 左不交
        else if (x1 > y2) return 9; // 右不交
        else if (x1 > x2 && y2 < y1) return 2; // 左相交
        else if (x1 < x2 && y2 > y1) return 7; // 右相交
        else if ((deltaX > 0 && deltaY < 0) || (deltaX < 0 && deltaY > 0)) return 4; // 全包含
        else if (y1 === x2) return 1; // 左相邻
        else if (y2 === x1) return 8; // 右相邻
        else if (deltaX === 0 && deltaY !== 0) return 3; // 左对齐
        else if (deltaX !== 0 && deltaY === 0) return 6; // 右对齐
        else if (deltaX === 0 && deltaW === 0) return 5; // 完全对齐
    }

}
