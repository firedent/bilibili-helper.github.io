/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Graphics} from 'pixi.js';
import {Movable} from './Movable';
import {RoundedRect} from 'Pinball/game/lib/Shapes';

export class MovableCircle extends RoundedRect {
    drawDirection = false;
    line = null;

    constructor(options) {
        super(options);
        this.movable = new Movable({item: this.item, ...options});
        this.drawDirection = options.drawDirection;
        this.drawDirection && this.createMoveDirection();
    }

    createMoveDirection() {
        this.line = new Graphics();
        this.line.beginFill(0x0000ff);
        this.line.drawRect(0, 0, this.radius, 1);
        this.line.endFill();
        this.item.addChild(this.line);
    }

    drawMoveDirection() {
        this.line.rotation = this.movable.velocity.radian;
    }

    moveTo(position) {
        const delta = this.app.app.ticker.deltaTime;

        this.movable
            .setDelta(delta)
            .setSpeed(this.app.guiController.ball.speed.value.speed)
            .runAndRestore(position);

        this.drawDirection && this.drawMoveDirection();
    }
}
