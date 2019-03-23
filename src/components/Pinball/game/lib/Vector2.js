/**
 * Author: DrowsyFlesh
 * Create: 2019/3/22
 * Description:
 */
export class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    get isVector2() {return true;}

    get height() {return this.y;}

    get width() {return this.x;}

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
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

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        return this.divideScalar(this.length() || 1);
    }

    distanceToSquared(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return dx * dx + dy * dy;
    }

    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }

    equals(v) {
        return (v.x === this.x) && (v.y === this.y);
    }

    // computes the angle in radians with respect to the positive x-axis
    rad() {
        let radian = Math.atan2(this.y, this.x);
        if (radian < 0) radian += 2 * Math.PI;
        return 2 * Math.PI - radian; // 转化为笛卡尔坐标系内的方向
    }

    angle() {
        return this.rad() * 180 / Math.PI;
    }

    flip() {
        this.x = this.y + this.x;
        this.y = this.x - this.y;
        this.x = this.x - this.y;
        return this;
    }

    rotateAround(center, angle) {
        const c = Math.cos(angle), s = Math.sin(angle);

        const x = this.x - center.x;
        const y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;
    }

    rotate(angle) {
        return this.rotateAround(this, angle);
    }

    toArray() {
        return [this.x, this.y];
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    radWithVector(v) {
        const m = this.length() * v.length();
        let dot = this.dot(v.normalize());
        if (dot / m > 1 || dot / m < -1) {
            v = v.clone().negate();
            dot = this.dot(v);
        }
        return Math.acos(dot / m);
    }

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

    projectionWithLine(line) {
        let theta = this.radWithLine(line);
        if (theta > Math.PI / 2) theta = Math.PI / 2 - this.radWithLine(line);
        const NormalLength = 2 * this.length() * Math.sin(theta);
        const Normal = line.normal().setLength(NormalLength);
        const NormalLineDot = Normal.dot(this);
        const res = line.clone();
        return res.sub(Normal.multiplyScalar(2 * NormalLineDot)).setLength(this.length());
    }

    projectionWithNormal(normal) {
        const theta = this.radWithLine(normal);
        const NormalLength = 2 * this.length() * Math.sin(theta);
        const Normal = normal.setLength(NormalLength);
        const NormalLineDot = Normal.dot(this);
        const res = normal.normal();
        return res.sub(Normal.multiplyScalar(2 * NormalLineDot)).setLength(this.length());
    }

    // return the normal vector
    normal() {
        return new Vector2(this.y / this.x, -1).normalize();
    }
}
