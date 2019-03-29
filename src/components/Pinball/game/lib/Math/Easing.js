/**
 * Author: DrowsyFlesh
 * Create: 2019/3/29
 * Description:
 */
import Bezier from 'bezier-js';
import {LimitedVector2} from 'Pinball/game/lib/Math/LimitedVector2';

const StartPoint = new LimitedVector2(0, 0).setMin('x', 0).setMax('x', 1);
const EndPoint = new LimitedVector2(1, 1).setMin('x', 0).setMax('x', 1);

export class Easing {
    constructor(A = StartPoint, B = EndPoint) {
        this.A = A;
        this.B = B;
        this.bezier = new Bezier(StartPoint.clone(), A, B, EndPoint.clone());
    }

    flip() {
        return new Easing(this.B, this.A);
    }
}

export const LinearEasing = new Easing();
