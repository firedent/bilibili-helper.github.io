import {BOTTOM, LEFT, RIGHT, TOP} from 'Pinball/game/lib-old/Math';

/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Graphics} from 'pixi.js';
import {MovableRoundedRect} from 'Pinball/game/lib-old/Movable/MovableRoundedRect';

export class MovableCircle extends MovableRoundedRect {
    drawDirection = false;
    line = null;

    constructor(options) {
        super(options);
        this.drawDirection = options.drawDirection;
        this.drawDirection && this.createMoveDirection();
    }

    createMoveDirection() {
        this.line = new Graphics();
        this.line.beginFill(0x0000ff);
        this.line.drawRect(0, 0, this.radius[0], 1);
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
