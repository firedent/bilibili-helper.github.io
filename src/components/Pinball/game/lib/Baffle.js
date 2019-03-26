/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
import {Vector2, Block, Rect} from 'Pinball/game/lib';

export class Baffle {
    constructor({
        app,
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
        rotation,
        ...rest
    }) {
        this._radius = 0;

        this.color = color;
        this.alpha = alpha;
        this.length = length || width;
        this.thick = thick || height;
        this.speed = speed;
        this.radius = radius;
        this.position = position;
        this.rotation = rotation;
        this.acceleration = acceleration;
        this.maxAcceleration = new Vector2(length * 0.07, thick * 0.1);
        Object.assign(this, rest);
        if (app) this.init(app);
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
        const rect = new Block(this);
        this.block = rect;
        this.item = rect.item;
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
            this.position.x + this.width / 2 + options.position.x,
            this.position.y - options.radius + options.position.y,
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
            if (up.down) this.moveUp(delta);
            if (down.down) this.moveDown(delta);
            if (left.down) this.moveLeft(delta);
            if (right.down) this.moveRight(delta);
            if (up.down || down.down || left.down || right.down) this.collisionCheckWithBox(this.app.width, this.app.height);
        });
    }

    moveUp(delta) {
        if (Object.is(this.acceleration.y, NaN)) this.acceleration.y = this.maxAcceleration.y;
        if (this.acceleration.y < this.maxAcceleration.y) this.acceleration.y += (this.acceleration.y + 0.5) * this.speed * delta;
        return this.setY(this.item.y - this.acceleration.y);
    }

    moveDown(delta) {
        if (Object.is(this.acceleration.y, NaN)) this.acceleration.y = this.maxAcceleration.y;
        if (this.acceleration.y < this.maxAcceleration.y) this.acceleration.y += (this.acceleration.y + 0.5) * this.speed * delta;
        return this.setY(this.item.y + this.acceleration.y);
    }

    moveLeft(delta) {
        if (Object.is(this.acceleration.x, NaN)) this.acceleration.x = this.maxAcceleration.x;
        if (this.acceleration.x < this.maxAcceleration.x) this.acceleration.x += (this.acceleration.x + 0.5) * this.speed * delta;
        return this.setX(this.item.x - this.acceleration.x);
    }

    moveRight(delta) {
        if (Object.is(this.acceleration.x, NaN)) this.acceleration.x = this.maxAcceleration.x;
        if (this.acceleration.x < this.maxAcceleration.x) this.acceleration.x += (this.acceleration.x + 0.5) * this.speed * delta;
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
