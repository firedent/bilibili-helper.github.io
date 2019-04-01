/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */

import {EPSILON} from 'Pinball/game/lib/Math/consts';

export class Vector2 {
    _x;
    _y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get isVector2() {return true;}

    get x() {
        return this._x;
    }

    set x(n) {
        this._x = n;
    }

    get y() {
        return this._y;
    }

    set y(n) {
        this._y = n;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set length(length) {
        if (this.length === 0) this.set(1, 1);
        else if (Math.abs(length) < EPSILON) this.set(0, 0);
        this.normalize().multiplyScalar(length);
    }

    // computes the angle in radians with respect to the positive x-axis
    get radian() {
        let radian = Math.atan2(this.y, this.x);
        if (radian < 0) radian += 2 * Math.PI;
        return radian; // 转化为笛卡尔坐标系内的方向
    }

    set radian(radian) {
        if (this.radian === radian) return;
        this.rotate(radian - this.radian);
    }

    get angle() {
        return this.radian * 180 / Math.PI;
    }

    get array() {
        return [this.x, this.y];
    }

    valueOf() {
        return {x: this.x, y: this.y};
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    setZeroIfTooSmall(n) {
        return Math.abs(n) < EPSILON ? 0 : n;
    }

    set(x, y) {
        if (typeof x === 'number' && typeof y === 'number') {
            this.x = x;
            this.y = y;
        } else if (x instanceof Vector2) {
            this.x = x.x;
            this.y = x.y;
        }
        return this;
    }

    setX(x) {
        if (typeof x === 'number') {
            this.x = x;
        } else if (x instanceof Vector2) {
            this.x = x.x;
        }
        return this;
    }

    setY(y) {
        if (typeof y === 'number') {
            this.y = y;
        } else if (y instanceof Vector2) {
            this.y = y.y;
        }
        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    addScalar(scalar) {
        this.x += scalar;
        this.y += scalar;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    subScalar(scalar) {
        return this.addScalar(-scalar);
    }

    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    negateX() {
        this.x = -this.x;
        return this;
    }

    negateY() {
        this.y = -this.y;
        return this;
    }

    normalize() {
        return this.divideScalar(this.length || 1);
    }

    distanceToSquared(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    // 近似比较，保留3位有效数字
    equals(v) {
        if (v === undefined) return false;
        return (Math.abs(v.x - this.x) <= EPSILON) && (Math.abs(v.y - this.y) <= EPSILON);
    }

    flip() {
        this.x = this.y + this.x;
        this.y = this.x - this.y;
        this.x = this.x - this.y;
        return this;
    }

    rotateAround(center, radian) {
        const c = Math.cos(radian), s = Math.sin(radian);

        const x = this.x - center.x;
        const y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;
    }

    rotate(radian) {
        return this.rotateAround(new Vector2(0, 0), radian);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    // Positive or negative depends on whether this angle is bigger than target's angle
    radWithVector(v) {
        return this.radian - v.radian;
    }

    // Positive or negative depends on whether this angle is bigger than target's angle
    angleWithVector(v) {
        return this.radWithVector(v) * 180 / Math.PI;
    }

    // get the minimum rad between two vector's line
    radWithLine(v) {
        const rad = this.radWithVector(v);
        if (rad > Math.PI / 2) return Math.PI - rad;
        else return rad;
    }

    angleWithLine(v) {
        return this.radWithLine(v) * 180 / Math.PI;
    }

    projectWithNormal(normal) {
        this.radian = normal.multiplyScalar(normal.dot(this) * 2).sub(this).radian;
        return this;
    }

    // return the normal vector
    normal() {
        return new Vector2(this.y / this.x, -1).normalize();
    }
}

window.Vector2 = Vector2;
