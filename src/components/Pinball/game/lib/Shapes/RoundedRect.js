/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Graphics} from 'pixi.js';

export class RoundedRect {
    color;
    alpha;
    width;
    height;
    zIndex;
    rotation;

    _temp = [];
    _radiusTopLeft = 0;
    _radiusTopRight = 0;
    _radiusBottomLeft = 0;
    _radiusBottomRight = 0;
    _complete = false;

    shapeType;
    item;

    constructor(options = {}) {
        const {color = 0xffffff, width, height, radius = 0, alpha = 1, zIndex = 0, rotation = 0, pivot = {x: 0, y: 0}} = options;
        this.color = color;
        this.alpha = alpha;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.zIndex = zIndex;
        this.rotation = rotation;
        this.pivot = pivot;
        this.initShape();
    }

    get radius() {
        return [this._radiusTopLeft, this._radiusTopRight, this._radiusBottomRight, this._radiusBottomLeft];
    }

    // 约束圆角为宽高里较小值的一半
    set radius(value) {
        let [tl, tr, br, bl] = [0, 0, 0, 0];
        if (value instanceof Array) {
            if (value.length === 1) {
                const v = this.normalizeRadius(value[0]);
                [tl, tr, br, bl] = [v, v, v, v];
            } else if (value.length === 2) {
                const [v0, v1] = [this.normalizeRadius(value[0]), this.normalizeRadius(value[1])];
                [tl, tr, br, bl] = [v0, v1, v0, v1];
            } else if (value.length === 3) {
                const [v0, v1, v2] = [this.normalizeRadius(value[0]), this.normalizeRadius(value[1]), this.normalizeRadius(value[2])];
                [tl, tr, br, bl] = [v0, v1, v2, v1];
            } else if (value.length === 4) {
                const [v0, v1, v2, v3] = [
                    this.normalizeRadius(value[0]),
                    this.normalizeRadius(value[1]),
                    this.normalizeRadius(value[2]),
                    this.normalizeRadius(value[3]),
                ];
                [tl, tr, br, bl] = [v0, v1, v2, v3];
            }
        } else if (typeof value === 'number') {
            const v = this.normalizeRadius(value);
            [tl, tr, br, bl] = [v, v, v, v];
        }
        this._radiusTopLeft = tl;
        this._radiusTopRight = tr;
        this._radiusBottomRight = br;
        this._radiusBottomLeft = bl;
        //if (this._complete) this.initShape();
    }

    get halfWidth() {
        return this.width / 2;
    }

    get halfHeight() {
        return this.height / 2;
    }

    get rotation() {
        return this.item.rotation;
    }

    set rotation(n) {
        if (this.item) this.item.rotation = n;
    }

    setSize({width, height}) {
        if (width !== undefined) {
            this.width = width;
            this.item.width = width;
        }
        if (height !== undefined) {
            this.height = height;
            this.item.height = height;
        }
    }

    normalizeRadius(n) {
        const minSize = Math.min(this.halfWidth, this.halfHeight);
        return n > minSize ? minSize : n;
    }

    initShape() {
        const type = this.getShapeType();
        this.shapeType = type;
        switch (type) {
            case 'roundedRect':
                this.initRoundedRect();
                break;
            case 'circle':
                this.initCircle();
                break;
            case 'rect':
                this.initRect();
                break;
            case 'empty':
            default:
                break;
        }
        this.item.zIndex = this.zIndex;
        this.item.pivot.x = this.item.width * this.pivot.x;
        this.item.pivot.y = this.item.height * this.pivot.y;
        this._complete = true;
        return this;
    }

    initRoundedRect() {
        const roundedRect = new Graphics();
        roundedRect.beginFill(this.color, this.alpha);

        if (this._radiusTopLeft > 0) {
            roundedRect.moveTo(this._radiusTopLeft, 0);
            roundedRect.arc(this._radiusTopLeft, this._radiusTopLeft, this._radiusTopLeft, Math.PI, Math.PI * 3 / 2);
        }
        roundedRect.moveTo(this._radiusTopLeft, 0);
        roundedRect.lineTo(this.width - this._radiusTopRight, 0);

        if (this._radiusTopRight > 0)
            roundedRect.arc(this.width - this._radiusTopRight, this._radiusTopRight, this._radiusTopRight, Math.PI * 3 / 2, Math.PI * 2);

        roundedRect.lineTo(this.width, this.height - this._radiusBottomRight);

        if (this._radiusBottomRight > 0)
            roundedRect.arc(this.width - this._radiusBottomRight, this.height - this._radiusBottomRight, this._radiusBottomRight, 0, Math.PI / 2);

        roundedRect.lineTo(this.width - this._radiusBottomLeft, this.height);

        if (this._radiusBottomLeft > 0)
            roundedRect.arc(this._radiusBottomLeft, this.height - this._radiusBottomLeft, this._radiusBottomLeft, Math.PI / 2, Math.PI);

        roundedRect.lineTo(0, this._radiusTopLeft);

        roundedRect.endFill();
        this.item = roundedRect;
    }

    initCircle() {
        const circle = new Graphics();
        circle.beginFill(this.color, this.alpha);
        circle.drawCircle(0, 0, this._radiusTopLeft);
        circle.endFill();
        circle.x = this._radiusTopLeft;
        circle.y = this._radiusTopLeft;
        this.item = circle;
    }

    initRect() {
        const rect = new Graphics();
        rect.beginFill(this.color, this.alpha);
        rect.drawRect(0, 0, this.width, this.height);
        rect.endFill();
        this.item = rect;
    }

    getShapeType() {
        if (this.isEmpty()) return 'empty';
        else if (this.isRoundedRect()) return 'roundedRect';
        else if (this.isCircle()) return 'circle';
        else if (this.isRect()) return 'rect';
    }

    isEmpty() {
        if (this.width < 0 && this.width === this.height) return true;
        else return false;
    }

    isRect() {
        if (this._radiusTopLeft === 0
            && this._radiusTopLeft === this._radiusTopRight
            && this._radiusTopLeft === this._radiusBottomRight
            && this._radiusTopLeft === this._radiusBottomLeft
        ) return true;
        else return false;
    }

    isRoundedRect() {
        if (
            !this.isCircle() && (
                this._radiusTopLeft > 0
                || this._radiusTopRight > 0
                || this._radiusBottomRight > 0
                || this._radiusBottomLeft > 0
            )) {
            return true;
        } else return false;
    }

    isCircle() {
        if (
            this.width === this.height // 宽高相等
            && ( // 四个角相同圆角值
                this._radiusTopLeft === this._radiusTopRight
                && this._radiusTopLeft === this._radiusBottomRight
                && this._radiusTopLeft === this._radiusBottomLeft
            )
            && this._radiusTopLeft !== 0 // 半径不为零
            && this._radiusTopLeft === this.halfWidth && this._radiusTopLeft === this.halfHeight // 半径等于圆角值
        ) {
            return true;
        } else return false;
    }
}
