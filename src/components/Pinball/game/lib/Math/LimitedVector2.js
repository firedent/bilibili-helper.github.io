/**
 * Author: DrowsyFlesh
 * Create: 2019/3/28
 * Description:
 */
import {Vector2} from 'Pinball/game/lib/Math/Vector2';

export class LimitedVector2 extends Vector2 {
    constructor(x = 0, y = 0) {
        super(x, y);
        this.limit = {min: {}, max: {}};
    }

    getMin(type) {
        return this.limit.min[type];
    }

    setMin(type, value) {
        this.limit.min[type] = value;
        return this;
    }

    getMax(type) {
        return this.limit.max[type];
    }

    setMax(type, value) {
        this.limit.max[type] = value;
        return this;
    }

    setMaxXY(x, y) {
        this.limit.max.x = x;
        this.limit.max.y = y;
        return this;
    }

    getMaxXY() {
        return {x: this.limit.max.x, y: this.limit.max.y};
    }

    setMinXY(x, y) {
        this.limit.min.x = x;
        this.limit.min.y = y;
        return this;
    }

    getMinXY() {
        return {x: this.limit.min.x, y: this.limit.min.y};
    }

    getMaxXYVector() {
        return new Vector2(this.limit.max.x, this.limit.max.y);
    }

    getMinXYVector() {
        return new Vector2(this.limit.min.x, this.limit.min.y);
    }

    checkXMin(correct) {
        if (this.limit.min.x === undefined) return true;
        else {
            const res = this.x >= this.limit.min.x;
            if (!res && correct) this.x = this.limit.min.x;
            return res;
        }
    }

    checkXMax(correct) {
        if (this.limit.max.x === undefined) return true;
        else {
            const res = this.x <= this.limit.max.x;
            if (!res && correct) this.x = this.limit.max.x;
            return res;
        }
    }

    checkX(correct) {
        return this.checkXMin(correct) && this.checkXMax(correct);
    }

    checkYMin(correct) {
        if (this.limit.min.y === undefined) return true;
        else {
            const res = this.y >= this.limit.min.y;
            if (!res && correct) this.x = this.limit.min.y;
            return res;
        }
    }

    checkYMax(correct) {
        if (this.limit.max.y === undefined) return true;
        else {
            const res = this.y <= this.limit.max.y;
            if (!res && correct) this.x = this.limit.max.y;
            return res;
        }
    }

    checkY(correct) {
        return this.checkYMin(correct) && this.checkYMax(correct);
    }

    checkXY(correct) {
        return this.checkX(correct) && this.checkY(correct);
    }

    checkLengthMin(correct) {
        if (this.limit.min.length === undefined) return true;
        else {
            const res = this.length >= this.limit.min.length;
            if (!res && correct) {
                this.setLength(this.limit.min.length);
            }
            return res;
        }
    }

    checkLengthMax(correct) {
        if (this.limit.max.length === undefined) return true;
        else {
            const res = this.length >= this.limit.max.length;
            if (!res && correct) this.setLength(this.limit.max.length);
            return res;
        }
    }

    checkLength(correct) {
        return this.checkLengthMin(correct) && this.checkLengthMax(correct);
    }

    //
    //set(x, y, correct) {
    //    super.set(x, y);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //setX(x, correct) {
    //    super.setX(x);
    //    this.checkX(correct);
    //    return this;
    //}
    //
    //setY(y, correct) {
    //    super.setY(y);
    //    this.checkY(correct);
    //    return this;
    //}
    //
    //copy(v, correct) {
    //    super.copy(v);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //add(v, correct) {
    //    super.add(v);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //addScalar(scalar, correct) {
    //    super.addScalar(scalar);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //sub(v, correct) {
    //    super.sub(v);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //subScalar(scalar, correct) {
    //    super.addScalar(-scalar);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //multiply(v, correct) {
    //    super.multiply(v);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //multiplyScalar(scalar, correct) {
    //    super.multiplyScalar(scalar);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //divide(v, correct) {
    //    super.divide(v);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //divideScalar(scalar, correct) {
    //    super.divideScalar(scalar);
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //floor(correct) {
    //    super.floor();
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //ceil(correct) {
    //    super.ceil();
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //round(correct) {
    //    super.round();
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //negate(correct) {
    //    super.negate();
    //    this.checkXY(correct);
    //    return this;
    //}
    //
    //negateX(correct) {
    //    super.negateX();
    //    this.checkX(correct);
    //    return this;
    //}
    //
    //negateY(correct) {
    //    super.negateY();
    //    this.checkY(correct);
    //    return this;
    //}
}
