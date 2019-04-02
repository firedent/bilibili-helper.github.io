

/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description: 物体类
 */
import {BOTTOM, CENTER, LEFT, NOT_INTERSECT, RIGHT, TOP} from 'Pinball/game/lib-old/Math';

/**
 * 物体类
 */
export class Thing {
    app; // pixi.js's application
    next = {}; // next attribute map

    position; // 位置
    acceleration; // 加速度
    mass; // 质量

    item; // 渲染对象
    width;
    height;

    constructor() {

    }

    /**
     * 碰撞检测部分
     */

    /**
     * 同一帧更新bbox盒的标记，如果和当前time相同则默认不再更新
     * @type {number}
     * @private
     */
    _bboxUpdateSign = -1;
    _bbox;

    /**
     * 获取
     * @param force
     * @return {Rectangle}
     */
    bbox(force = false) {
        if (this._bboxUpdateSign !== this.app.ticker.lastTime || force)
            this._bbox = this.item.getBounds();
        return this._bbox;
    }

    /**
     * 包围盒内测试，返回全包含和碰撞方向两种状态
     * @param targetBoundRect {Rectangle}
     * @return {*[]}
     */
    inBBox(targetBoundRect) {
        const [axis1, axis2] = this.checkBBox(targetBoundRect);

        let res = [null, null];

        if (axis1 <= 3) res[0] = RIGHT;
        else if (axis1 >= 5) res[0] = LEFT;
        else res[0] = CENTER;

        if (axis2 <= 3) res[1] = BOTTOM;
        else if (axis2 >= 5) res[1] = TOP;
        else res[1] = CENTER;

        return res;
    }

    /**
     * 包围盒测试，返回全包含，碰撞方向和未碰撞三种状态
     * @param targetBoundRect {Rectangle}
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
     * @param targetBoundRect {Rectangle}
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
     * @param {Rectangle}
     * @return {number[]}
     */
    checkBBox({x, width, y, height, right, bottom}) {
        const bbox = this.bbox();
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
