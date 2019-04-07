/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description: 物体类
 */
import {BOTTOM, CENTER, EPSILON, LEFT, NOT_INTERSECT, RIGHT, TOP} from 'Pinball/game/lib/Math';
import {PullForce} from 'Pinball/game/lib/Forces/PullForce';
import {PushForce} from 'Pinball/game/lib/Forces/PushForce';
import {LimitedVector2, Vector2} from 'Pinball/game/lib/Math';
import {RoundedRect} from 'Pinball/game/lib/Shapes';
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
     * @type {Array<CollisionResult>}
     */
    results = [];

    constructor() {}

    get size() {
        return this.results.length;
    }

    sort() {
        this.results.sort((a, b) => a.priority < b.priority ? -1 : 0);
    }

    /**
     * 添加碰撞反应
     * @param collisionResult {Array<Object>|Object}
     */
    add(collisionResult) {
        if (collisionResult instanceof Array) {
            collisionResult.map((result) => {
                const {prototype, subAttrName, operation, value, priority = 0} = result;
                this.results.push(new CollisionResult(prototype, subAttrName, operation, value, priority));
            });
        } else {
            const {prototype, subAttrName, operation, value, priority = 0} = collisionResult;
            this.results.push(new CollisionResult(prototype, subAttrName, operation, value, priority));
        }
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
    _mass;
    _halfWidth;
    _halfHeight;
    _nextBBox;
    /**
     * 标记质量是否变化
     * 如果density或者width，height变化则应该将该标记置为true
     * 初始为true，首次计算质量
     * @type {boolean}
     * @private
     */
    _massChanged = true;

    /**
     * 标记质量是否变化
     * 如果width，height变化则应该将该标记置为true
     * 初始为true，首次计算质量
     * @type {boolean}
     * @private
     */
    _widthChanged = true;
    _heightChanged = true;

    /**
     * 再相互作用力处理时，存储一帧中已经碰撞检测过的且力互相作用过的对象
     * 帧计算结束前清空重置
     * @type {Set<string>}
     * @private
     */
    _collisionCheckedMap = new Set();

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
    _position; // 位置
    acceleration = new LimitedVector2(0, 0); // 加速度
    velocity = new LimitedVector2(0, 0); // 速度
    //mass; // 质量
    density; // 密度

    width;
    height;
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
    constructor({game, position, width, height, radius = 0, density, originAcceleration, alpha}) {
        this.id = UUID();
        this.game = game;

        this.position = position;
        this.next.position = this.position;

        this.width = width;
        this.height = height;
        this.density = density;

        this.acceleration = originAcceleration;

        this.shape = new RoundedRect({
            width: this.width,
            height: this.height,
            radius: radius,
            alpha,
        });

        this.item.addChild(this.shape.item);
    }

    get app() {
        return this.game.app;
    }

    get mass() {
        if (this._massChanged) {
            this._mass = this.width * this.height * this.density;
            this._massChanged = false;
        }
        return this._mass;
    }

    get volume() {
        return this.mass / this.density;
    }

    get radius() {
        return this.shape.radius;
    }

    get crossSection() { // 横截面积
        return this.volume / 5; // 先用体积的五分之一代替
    }

    get halfWidth() {
        if (this._widthChanged) {
            this._halfWidth = this.width / 2;
            this._widthChanged = false;
        }
        return this._halfWidth;
    }

    get halfHeight() {
        if (this._heightChanged) {
            this._halfHeight = this.height / 2;
            this._heightChanged = false;
        }
        return this._halfHeight;
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
     * 碰撞检测结束，开始处理检测后的反应数据
     * 合并next和碰撞检测处理结果生成newNext用于下一帧的渲染数据
     * 结束后清理碰撞检测和反应的过程数据
     */
    compositeWithNextAndCollisionResult() {
        if (this.collisionResult.size > 0) {
            this.collisionResult.each((o) => {
                const {prototype, subAttrName, operation, value} = o;
                const param = this.next[prototype];
                if (param !== undefined) {
                    if (param instanceof LimitedVector2) {
                        if (operation === 'set') {
                            if (subAttrName && param[subAttrName] !== undefined) {
                                const newParam = param.clone();
                                newParam[subAttrName] = value;
                                this.newNext.set(prototype, newParam);
                            } else {
                                this.newNext.set(prototype, value);
                            }
                        } else if (operation === 'add') {
                            const newParam = param.clone();
                            if (subAttrName && param[subAttrName] !== undefined) {
                                newParam[subAttrName] += value;
                                this.newNext.set(prototype, newParam);
                            } else {
                                newParam.add(value);
                                this.newNext.set(prototype, newParam);
                            }
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

        // 清理缓存数据
        this._collisionCheckedMap.clear();
        return this;
    }

    updateWithNewNext() {
        if (this.newNext.size > 0) {
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
        return this;
    }

    /**
     * 碰撞检测部分
     */

    /**
     * 与物体进行碰撞检测
     */
    collisionWithThing(thing, mutual = true) {
        // 添加处理标记
        if (this._collisionCheckedMap.has(thing.id)) return;
        else this._collisionCheckedMap.add(thing.id);

        const collisionRes = this.onBBox(thing.nextBBox());
        window.collisionRes = collisionRes;
        if (!(collisionRes[0] === NOT_INTERSECT || collisionRes[1] === NOT_INTERSECT)) {
            let topS = this.topS(thing);
            let bottomS = this.bottomS(thing);
            let leftS = this.leftS(thing);
            let rightS = this.rightS(thing);

            let modified = false;

            const thisPosition = this.next.position;
            const targetPosition = thing.next.position;

            const thisL = (index) => thisPosition.x + this.radius[index];
            const thisR = (index) => thisPosition.x + this.width - this.radius[index];
            const thingL = (index) => targetPosition.x + thing.radius[index];
            const thingR = (index) => targetPosition.x + thing.width - thing.radius[index];

            let delta;

            const atUpOrDown = ((thisL(0) >= thingL(0) && thisR(1) <= thingR(1)) || (thisL(0) <= thingL(0) && thisR(1) >= thingR(1))) || ((thisL(3) >= thingL(3) && thisR(2) <= thingR(2)) || (thisL(3) <= thingL(3) && thisR(2) >= thingR(2)));
            if (atUpOrDown) {
                if (Math.abs(topS) < Math.abs(bottomS)) {
                    delta = mutual ? topS / 2 : topS;
                } else {
                    delta = Math.abs(mutual ? bottomS / 2 : bottomS);
                }
                if (delta !== undefined) {
                    this.collisionResult.add({
                        prototype: 'position',
                        subAttrName: 'y',
                        operation: 'set',
                        value: this.position.clone().y + delta,
                        priority: 10,
                    });

                    thing.collisionResult.add({
                        prototype: 'position',
                        subAttrName: 'y',
                        operation: 'set',
                        value: thing.position.clone().y - delta,
                        priority: 10,
                    });

                    // 如果没有互相作用，则直接按照完全反弹处理
                    if (mutual) {
                        // 计算两者互相碰撞时的互相作用力
                        const mutualForceVectorFromThing = new Vector2(0, -1);

                        const mutualForceWhichFromThisSize = Math.abs(this.acceleration.dot(mutualForceVectorFromThing));

                        mutualForceVectorFromThing.length = Math.abs(thing.acceleration.dot(mutualForceVectorFromThing));

                        const mutualForceVectorWhichFromThis = mutualForceVectorFromThing.negate();
                        mutualForceVectorWhichFromThis.length = mutualForceWhichFromThisSize;

                        this.collisionResult.add([
                            {
                                prototype: 'acceleration',
                                operation: 'add',
                                value: mutualForceVectorFromThing,
                            }
                            , {
                                prototype: 'velocity',
                                operation: 'set',
                                value: this.velocity.clone().negateY(),
                                priority: 10,
                            },
                        ]);

                        thing.collisionResult.add([
                            {
                                prototype: 'acceleration',
                                operation: 'add',
                                value: mutualForceVectorWhichFromThis,
                            },
                            {
                                prototype: 'velocity',
                                operation: 'set',
                                value: this.velocity.clone().negateY(),
                                priority: 10,
                            },
                        ]);
                    } else {
                        this.collisionResult.add({
                            prototype: 'velocity',
                            operation: 'set',
                            value: this.velocity.clone().negateY(),
                        });
                    }
                    return this;
                }
            } else {
                const thisT = (index) => thisPosition.y + this.radius[index];
                const thisB = (index) => thisPosition.y + this.height - this.radius[index];
                const thingT = (index) => targetPosition.y + thing.radius[index];
                const thingB = (index) => targetPosition.y + thing.height - thing.radius[index];
                const atLeftOrRight = ((thisT(0) >= thingT(0) && thisB(1) <= thingB(1)) || (thisT(0) <= thingT(0) && thisB(1) >= thingB(1))) || ((thisT(3) >= thingT(3) && thisB(2) <= thingB(2)) || (thisT(3) <= thingT(3) && thisB(2) >= thingB(2)));

                if (atLeftOrRight) {
                    if (Math.abs(leftS) < Math.abs(rightS)) {
                        delta = mutual ? leftS / 2 : leftS;
                    } else {
                        delta = mutual ? rightS / 2 : rightS;
                    }
                    if (delta !== undefined) {
                        this.collisionResult.add({
                            prototype: 'position',
                            subAttrName: 'x',
                            operation: 'set',
                            value: this.position.clone().x + delta,
                            priority: 10,
                        });
                        //if (mutual) { // 有互相作用 则同时调整两者的位置，同时移动差值的一半，反向
                        thing.collisionResult.add({
                            prototype: 'position',
                            subAttrName: 'x',
                            operation: 'set',
                            value: thing.position.clone().x - delta,
                            priority: 10,
                        });
                        //}

                        // 如果没有互相作用，则直接按照完全反弹处理
                        if (mutual) {
                            // 计算两者互相碰撞时的互相作用力
                            const mutualForceVectorFromThing = new Vector2(1, 0);

                            const mutualForceWhichFromThisSize = Math.abs(this.acceleration.dot(mutualForceVectorFromThing));

                            mutualForceVectorFromThing.length = Math.abs(thing.acceleration.dot(mutualForceVectorFromThing));

                            const mutualForceVectorWhichFromThis = mutualForceVectorFromThing.negate();
                            mutualForceVectorWhichFromThis.length = mutualForceWhichFromThisSize;

                            this.collisionResult.add([
                                {
                                    prototype: 'acceleration',
                                    operation: 'add',
                                    value: mutualForceVectorFromThing,
                                }
                                , {
                                    prototype: 'velocity',
                                    operation: 'set',
                                    value: this.velocity.clone().negateX(),
                                    priority: 10,
                                },
                            ]);

                            thing.collisionResult.add([
                                {
                                    prototype: 'acceleration',
                                    operation: 'add',
                                    value: mutualForceVectorWhichFromThis,
                                },
                                {
                                    prototype: 'velocity',
                                    operation: 'set',
                                    value: this.velocity.clone().negateX(),
                                    priority: 10,
                                },
                            ]);
                        } else {
                            this.collisionResult.add({
                                prototype: 'velocity',
                                operation: 'set',
                                value: this.velocity.clone().negateX(),
                            });
                        }
                    }
                    return this;
                }
            }

            // 弹板角落回弹处理
            //top left
            if (this.collisionCheckWithCornerCircle({
                mutual, thing,
                radiusSUM: this.radius[2] + thing.radius[0],
                thisPoint: new Vector2(thisPosition.x + this.width - this.radius[2], thisPosition.y + this.height - this.radius[2]),
                point: targetPosition.clone().addScalar(thing.radius[0]),
            })) return this;

            // top right
            if (this.collisionCheckWithCornerCircle({
                mutual, thing,
                radiusSUM: this.radius[3] + thing.radius[1],
                thisPoint: new Vector2(thisPosition.x + this.radius[3], thisPosition.y + this.height - this.radius[3]),
                point: new Vector2(targetPosition.x + thing.width - thing.radius[1], targetPosition.y + thing.radius[1]),
            })) return this;

            // bottom left
            if (this.collisionCheckWithCornerCircle({
                mutual, thing,
                radiusSUM: this.radius[1] + thing.radius[3],
                thisPoint: new Vector2(thisPosition.x + this.width - this.radius[1], thisPosition.y + this.radius[1]),
                point: new Vector2(targetPosition.x + thing.radius[3], targetPosition.y + thing.height - thing.radius[3]),
            })) return this;

            // bottom right
            if (this.collisionCheckWithCornerCircle({
                mutual, thing,
                radiusSUM: this.radius[0] + thing.radius[2],
                thisPoint: thisPosition.clone().addScalar(this.radius[0]),
                point: new Vector2(targetPosition.x + thing.width - thing.radius[2], targetPosition.y + thing.height - thing.radius[2]),
            })) return this;
            return this;
        }
    }

    /**
     * 圆角碰撞
     * @param radiusSUM
     * @param thing
     * @param point
     * @return {boolean}
     */
    collisionCheckWithCornerCircle({mutual, thing, radiusSUM, thisPoint, point}) {
        //const thisPosition = this.next.position;
        const thisVelocity = this.next.velocity;

        const distance = thisPoint.distanceTo(point);
        if (distance - radiusSUM <= 0) {
            let normalVector = thisPoint.clone().sub(point);

            // 嵌入时位置调整
            const difference = mutual ? normalVector.length / 2 : normalVector.length;

            const amendVector = normalVector.clone();
            amendVector.length = radiusSUM - difference; // 修正向量

            this.collisionResult.add({
                prototype: 'position',
                operation: 'set',
                value: this.position.clone().add(amendVector),
                priority: 10,
            });

            if (mutual) {
                const mutualForceVectorFromThing = thisVelocity.clone().negate().projectWithNormal(normalVector); // 计算this反射方向
                mutualForceVectorFromThing.length = Math.abs(thing.acceleration.dot(normalVector)); // 计算this收到的推力大小

                const mutualForceVectorWhichFromThis = thing.next.velocity.clone().negate().projectWithNormal(normalVector.negate()); // 计算thing反射方向
                mutualForceVectorWhichFromThis.length = Math.abs(this.acceleration.dot(normalVector)); // 计算thing收到的推力大小

                this.collisionResult.add([
                    {
                        prototype: 'acceleration',
                        operation: 'add',
                        value: mutualForceVectorFromThing,
                    }
                    , {
                        prototype: 'velocity',
                        subAttrName: 'radian',
                        operation: 'set',
                        value: mutualForceVectorFromThing.radian,
                        priority: 10,
                    },
                ]);

                thing.collisionResult.add([
                    {
                        prototype: 'acceleration',
                        operation: 'add',
                        value: mutualForceVectorWhichFromThis,
                    },
                    {
                        prototype: 'velocity',
                        operation: 'set',
                        value: this.velocity.clone().negateX(),
                        priority: 10,
                    },
                ]);

            } else {
                const newVelocity = thisVelocity.clone().negate().projectWithNormal(normalVector);
                this.collisionResult.add({
                    prototype: 'velocity',
                    subAttrName: 'radian',
                    operation: 'set',
                    value: newVelocity.radian,
                    priority: 10,
                });
            }
            return true;
        } else return false;
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
            this._updateSign = this.lastTime;
            this._bbox = new Rectangle(this.position.x, this.position.y, this.width, this.height);
        }
        return this._bbox;
    }

    /**
     * 根据下一帧数据返回BBox
     * @return {PIXI.Rectangle}
     */
    nextBBox(force = false) {
        if (this._updateSign !== this.lastTime || force) {
            this._updateSign = this.lastTime;
            const {position} = this.next;
            const {width, height} = this.item;
            this._nextBBox = new Rectangle(position.x, position.y, width, height);
        }
        return this._nextBBox;
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
        window.a12 = [axis1, axis2];
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
    outBBox(targetBoundRect) {
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
        const bbox = this.nextBBox();
        const axis1 = this.segmentRelationship( // y轴向那一测的投影测试
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
        const axis2 = this.segmentRelationship( // x轴向那一测的投影测试
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

    // 用于包围盒检测，但是是可以获得接触时的偏移差值，用于位置修正

    topS = (target) => target.position.y - this.position.y - this.height;
    bottomS = (target) => this.position.y - target.position.y - target.height - this.height;
    leftS = (target) => target.position.x - this.position.x - this.width;
    rightS = (target) => this.position.x - target.position.x - target.width - this.width;
}
