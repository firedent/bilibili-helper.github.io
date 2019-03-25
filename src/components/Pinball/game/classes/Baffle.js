/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Rect} from 'Pinball/game/classes';
import {Vector2} from 'Pinball/game/lib';
import {Container} from 'pixi.js';

export class Baffle {
    constructor({
        color = 0xffffff,
        alpha = 1,
        length = 100,
        width = 100,
        thick = 10,
        height = 10,
        speed = 1,
        position = new Vector2(0, 0),
        acceleration = new Vector2(0.001, 0.001),
        radius = 0,
    }) {
        this._radius = 0;

        this.color = color;
        this.alpha = alpha;
        this.length = length || width;
        this.thick = thick || height;
        this.speed = speed;
        this.radius = radius;
        this.position = position;
        this.acceleration = acceleration;
        this.maxAcceleration = new Vector2(length * 0.07, thick * 0.1);

        this.canMove = true;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        const shorter = Math.min(this.thick, this.length);
        this._radius = value < shorter / 2 ? value : shorter / 2;
    }

    get width() {
        return this.length;
    }

    set width(value) {
        this.length = value;
        return this;
    }

    get height() {
        return this.thick;
    }

    set height(value) {
        this.thick = value;
        return this;
    }

    init(app) {
        this.app = app;
        let item = new Container();
        const rect = new Rect(this).init(app);
        item.addChild(rect.item);
        item.x = this.position.x;
        item.y = this.position.y;
        this.item = item;
        this.bindKeyboard();
        return this;
    }

    setX(n) {
        this.item.x = n;
        this.position.setX(n);
        //window.x = this.position.x;
        return this;
    }

    setY(n) {
        this.item.y = n;
        this.position.setY(n);
        //window.y = this.position.y;
        return this;
    }

    createBall(options) {
        options.position = new Vector2(
            this.position.x + this.width / 2,
            this.position.y - options.radius,
        );
        return this.app.createBall(options);
    }

    bindKeyboard() {
        const up = this.app.bindKey(document, 38);
        const down = this.app.bindKey(document, 40);
        const left = this.app.bindKey(document, 37);
        const right = this.app.bindKey(document, 39);
        this.app.addTicker(delta => {
            !up.down && !down.down && !left.down && !right.down && this.stopMove();
            if (up.down) this.moveUp();
            if (down.down) this.moveDown();
            if (left.down) this.moveLeft();
            if (right.down) this.moveRight();
            if (up.down || down.down || left.down || right.down) this.collisionCheckWithBox(this.app.width, this.app.height);
        });
    }

    moveUp() {
        if (Object.is(this.acceleration.y, NaN)) this.acceleration.y = this.maxAcceleration.y;
        if (this.acceleration.y < this.maxAcceleration.y) this.acceleration.y += (this.acceleration.y + 0.5) * this.speed;
        return this.setY(this.item.y - this.acceleration.y);
    }

    moveDown() {
        if (Object.is(this.acceleration.y, NaN)) this.acceleration.y = this.maxAcceleration.y;
        if (this.acceleration.y < this.maxAcceleration.y) this.acceleration.y += (this.acceleration.y + 0.5) * this.speed;
        return this.setY(this.item.y + this.acceleration.y);
    }

    moveLeft() {
        if (Object.is(this.acceleration.x, NaN)) this.acceleration.x = this.maxAcceleration.x;
        if (this.acceleration.x < this.maxAcceleration.x) this.acceleration.x += (this.acceleration.x + 0.5) * this.speed;
        return this.setX(this.item.x - this.acceleration.x);
    }

    moveRight() {
        if (Object.is(this.acceleration.x, NaN)) this.acceleration.x = this.maxAcceleration.x;
        if (this.acceleration.x < this.maxAcceleration.x) this.acceleration.x += (this.acceleration.x + 0.5) * this.speed;
        return this.setX(this.item.x + this.acceleration.x);
    }

    stopMove() {
        this.acceleration.set(0, 0);
        return this;
    }

    collisionCheckWithBox(width, height) {
        if (this.position.x < 0) {
            this.setX(0);
        } else if (this.position.x + this.width > width) {
            this.setX(width - this.width);
        }
        if (this.position.y < 0) {
            this.setY(0);
        } else if (this.position.y + this.height > height) {
            this.setY(height - this.height);
        }
        return this;
    }
};
