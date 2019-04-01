import {LEFT, RIGHT, TOP, BOTTOM, CENTER, NOT_INTERSECT, EPSILON, Vector2} from 'Pinball/game/lib/Math';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/28
 * Description:
 */
import {} from 'Pinball/game/lib/Math';

export class Collision {
    movable;
    app;
    item;
    bbox = null;
    currentTime = -1; // 保存当前帧
    carrier;

    constructor(options) {
        Object.assign(this, options);
    }

    get lastTime() {
        return this.app.app.ticker.lastTime;
    }

    get halfWidth() {
        return this.carrier.halfWidth;
    }

    get halfHeight() {
        return this.carrier.halfHeight;
    }

    get radius() {
        return this.carrier.radius;
    }

    updateBBox() {
        if (this.lastTime !== this.currentTime) {
            this.currentTime = this.lastTime;
            this.bbox = this.item.getBounds();
        }
    }

    /**
     * 碰撞测试，并返回碰撞方位
     * @param target
     * @param type [string]
     * @return {string[]}
     */
    checkBBox(target, type) {
        target.collision.updateBBox();
        if (type === 'in') return this.checkBBoxInside(target.collision.bbox);
        else if (type === 'on') return this.checkBBoxOverLaying(target.collision.bbox);
        else if (type === 'out') return this.checkBBoxOutside(target.collision.bbox);
    }

    /**
     * 以下根据分离轴定律做包围盒相交性测试
     */

    /**
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

    /**
     * bbox相交测试
     * @param x
     * @param w
     * @param y
     * @param height
     * @return {string[]}
     */
    checkBBoxInside(targetBoundRect) {
        const [axis1, axis2] = this.bboxCheckRes(targetBoundRect);

        let res = [null, null];

        if (axis1 <= 3) res[0] = RIGHT;
        else if (axis1 >= 5) res[0] = LEFT;
        else res[0] = CENTER;

        if (axis2 <= 3) res[1] = BOTTOM;
        else if (axis2 >= 5) res[1] = TOP;
        else res[1] = CENTER;

        return res;
    }

    checkBBoxOverLaying(targetBoundRect) {
        const [axis1, axis2] = this.bboxCheckRes(targetBoundRect);

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

    checkBBoxOutside(targetBoundRect) {
        const [axis1, axis2] = this.bboxCheckRes(targetBoundRect);

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
     * @param x
     * @param width
     * @param y
     * @param height
     * @param right
     * @param bottom
     * @return {number[]}
     */
    bboxCheckRes({x, width, y, height, right, bottom}) {
        this.updateBBox();
        const axis1 = this.segmentRelationship(
            {
                x: this.bbox.left,
                w: this.bbox.width,
                y: this.bbox.right,
            },
            {
                x,
                w: width,
                y: right,
            },
        ); // y轴向投影测试
        const axis2 = this.segmentRelationship(
            {
                x: this.bbox.y,
                w: this.bbox.height,
                y: this.bbox.bottom,
            },
            {
                x: y,
                w: height,
                y: bottom,
            },
        ); // x轴向投影测试
        return [axis1, axis2];
    }

    collisionCheckWithRoundedRect(target) {
        const collisionRes = this.checkBBox(target, 'on');
        if (collisionRes[0] !== NOT_INTERSECT && collisionRes[1] !== NOT_INTERSECT) {
            let topS = this.topS(target);
            let bottomS = this.bottomS(target);
            let leftS = this.leftS(target);
            let rightS = this.rightS(target);

            const targetMov = target.movable;
            const thisMov = this.movable;
            const targetPosition = targetMov.position;
            const thisPosition = thisMov.position;
            const thisVelocity = thisMov.velocity;

            let modified = false;

            const atUp = thisPosition.x - (targetPosition.x + target.radius[0]) >= EPSILON && thisPosition.x - (targetPosition.x + target.width - target.radius[1]) <= EPSILON;
            const atDown = thisPosition.x - (targetPosition.x + target.radius[3]) >= EPSILON && thisPosition.x - (targetPosition.x + target.width - target.radius[2]) <= EPSILON;

            if (collisionRes[1] === TOP && atUp && topS <= EPSILON) {
                thisVelocity.negateY();
                thisMov.setY(thisPosition.y + topS);
                modified = true;
            } else if (collisionRes[1] === BOTTOM && atDown && bottomS <= EPSILON) {
                thisVelocity.negateY();
                thisMov.setY(thisPosition.y - bottomS);
                modified = true;
            }

            const atLeft = thisPosition.y - (targetPosition.y + target.radius[0]) >= EPSILON && thisPosition.y - (targetPosition.y + target.height - target.radius[3]) <= EPSILON;

            const atRight = thisPosition.y - (targetPosition.y + target.radius[1]) >= EPSILON && thisPosition.y - (targetPosition.y + target.height - target.radius[2]) <= EPSILON;

            if (collisionRes[1] === LEFT && atLeft && leftS <= EPSILON) {
                thisVelocity.negateX();
                thisMov.setX(thisPosition.x + leftS);
                modified = true;
            } else if (collisionRes[1] === RIGHT && atRight && rightS <= EPSILON) {
                thisVelocity.negateX();
                thisMov.setX(thisPosition.x - rightS);
                modified = true;
            }

            if (modified) {
                return this;
            }

            if (target.radius !== 0) {
                // 弹板角落回弹处理
                //top left
                if (this.collisionCheckWithCornerCircle({
                    radiusSUM: this.radius[2] + target.radius[0],
                    target,
                    point: targetPosition.clone().addScalar(target.radius[0]),
                })) return this;

                // top right
                if (this.collisionCheckWithCornerCircle({
                    radiusSUM: this.radius[3] + target.radius[1],
                    target,
                    point: new Vector2(targetPosition.x + target.width - target.radius[1], targetPosition.y + target.radius[1]),
                })) return this;

                // bottom left
                if (this.collisionCheckWithCornerCircle({
                    radiusSUM: this.radius[1] + target.radius[3],
                    target,
                    point: new Vector2(targetPosition.x + target.radius[3], targetPosition.y + target.height - target.radius[3]),
                })) return this;
                // bottom right
                if (this.collisionCheckWithCornerCircle({
                    radiusSUM: this.radius[0] + target.radius[2],
                    target,
                    point: new Vector2(targetPosition.x + target.width - target.radius[2], targetPosition.y + target.height - target.radius[2]),
                })) return this;
            } else return this;
        }
    }

    collisionCheckWithCornerCircle({radiusSUM, target, point}) {
        const thisPosition = this.movable.position;
        const thisVelocity = this.movable.velocity;

        const distance = thisPosition.distanceTo(point);
        if (distance - radiusSUM <= EPSILON) {
            let normalVector = thisPosition.clone().sub(point);

            // 嵌入时位置调整
            const difference = normalVector.length;
            const amendVector = normalVector.clone();
            amendVector.length = radiusSUM - difference; // 修正向量

            thisPosition.add(amendVector);
            thisVelocity.negate().projectWithNormal(normalVector);
            return true;
        } else return false;
    }

    topS = (target) => target.movable.position.y - this.movable.position.y - this.halfHeight;
    bottomS = (target) => this.movable.position.y - target.movable.position.y - target.height - this.halfHeight;
    leftS = (target) => target.movable.position.x - this.movable.position.x - this.halfWidth;
    rightS = (target) => this.movable.position.x - target.movable.position.x - target.width - this.halfWidth;
}
