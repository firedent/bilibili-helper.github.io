/**
 * Author: DrowsyFlesh
 * Create: 2019/3/27
 * Description:
 */
import {Shape} from 'Pinball/game/lib/Shapes/Shape';
import {MixClasses} from 'Pinball/game/utils/MixClasses';
import {Circle} from 'Pinball/game/lib/Shapes/Circle';
import {Movable} from './Movable';
import {Graphics} from 'pixi.js';

export class MovableCircle extends Circle {
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

    moveTo(delta, position) {
        this.movable.setDelta(delta).setSpeed(this.app.guiController.ball.speed.value.speed).moveTo(position);
        this.drawDirection && this.drawMoveDirection();
    }

    escapeFromGravitation(delta) {
        this.movable.escapeFromGravitation(delta);
        this.drawDirection && this.drawMoveDirection();
    }

    moveUnderGravitation(delta) {
        this.movable.moveUnderGravitation(delta);
        this.drawDirection && this.drawMoveDirection();
    }
}
