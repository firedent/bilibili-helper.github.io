/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Container, Graphics} from 'pixi.js';
import {Shape} from './Shape.js';

export class Rect extends Shape {
    _radius = 0;

    constructor(options = {}) {
        const {color = 0xffffff, width, height, radius = 0, app, alpha} = options;
        super({app, color, alpha});

        this.width = width;
        this.height = height;
        this.radius = radius;
        this.init();
    }

    get radius() {
        return this._radius;
    }

    // 约束圆角为宽高里较小值的一半
    set radius(value) {
        const min = Math.min(this.width / 2, this.height / 2);
        this._radius = value > min ? min : value;
    }

    init() {
        const width = this.width - 2 * this.radius < 0 ? 0 : this.width - 2 * this.radius;
        const height = this.height - 2 * this.radius < 0 ? 0 : this.height - 2 * this.radius;
        this.item = new Container();
        const r1 = new Graphics().beginFill(this.color, this.alpha).drawRect(this.radius, 0, width, this.height);
        this.item.addChild(r1);
        if (this.radius > 0) {
            const radiusSmallerThanHeight = 2 * this.radius < this.height;
            const radiusSmallerThanWidth = 2 * this.radius < this.width;
            let r2, c1, c2, c3, c4;
            c1 = new Graphics().beginFill(this.color, this.alpha).drawCircle(this.radius, this.radius, this.radius);
            this.item.addChild(c1);
            if (radiusSmallerThanHeight) {
                r2 = new Graphics().beginFill(this.color, this.alpha).drawRect(0, this.radius, this.width, height);
                this.item.addChild(r2);
                c3 = new Graphics().beginFill(this.color, this.alpha).drawCircle(this.radius, this.height - this.radius, this.radius);
                this.item.addChild(c3);
            }
            if (radiusSmallerThanWidth) {
                c2 = new Graphics().beginFill(this.color, this.alpha).drawCircle(this.width - this.radius, this.radius, this.radius);
                this.item.addChild(c2);
            }
            if (radiusSmallerThanHeight && radiusSmallerThanWidth) {
                c4 = new Graphics().beginFill(this.color, this.alpha).drawCircle(this.width - this.radius, this.height - this.radius, this.radius);
                this.item.addChild(c4);
            }
        }
        return this;
    }
}
