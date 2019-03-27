import {Graphics} from 'pixi.js';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Shape} from './Shape.js';

export class Circle extends Shape {
    radius = 1;
    constructor(options = {}) {
        const {app, color = 0xffffff, alpha, radius = 0} = options;
        super({app, color, alpha});
        this.radius = radius;
        this.init();
    }

    init() {
        let item = new Graphics();
        item.beginFill(this.color);
        item.drawCircle(0, 0, this.radius);
        item.endFill();
        this.item = item;
    }
}
