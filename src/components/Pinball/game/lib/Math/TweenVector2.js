/**
 * Author: DrowsyFlesh
 * Create: 2019/3/28
 * Description:
 */
import {EPSILON} from 'Pinball/game/lib/Math/consts';
import {LimitedVector2} from 'Pinball/game/lib/Math/LimitedVector2';
import {Easing} from 'Pinball/game/lib/Math/Easing';

export class TweenVector2 extends LimitedVector2 {
    constructor(x, y) {
        super(x, y);
        this.tween = {
            linear: {
                duration: 1,
                bezier: new Easing().bezier,
                samples: [0, 1],
                step: 0,
                complete: false,
            },
        };
        this.progress = null;
    }

    /**
     *
     * @param type [string]
     * @param config [object] - duration
     */
    setTween(type, config) {
        // duration means frames
        const {bezier, pointA, pointB, duration = 30} = config;
        config.bezier = bezier || new Easing(pointA, pointB).bezier;
        config.samples = config.bezier.getLUT(duration);
        config.step = 0;
        config.complete = false;
        this.tween[type] = config;
        return this;
    }

    setDuration(type, duration) {
        const tween = this.tween[type];
        if (tween) {
            tween.duration = duration;
        }
        return this;
    }

    updateTween() {
        const {tween} = this.progress;
        if (!tween || !tween.samples) return;
        else if (!tween.complete) {
            const sample = tween.samples[tween.step];

            if (tween.step < tween.duration) tween.step = tween.step + 1;
            if (tween.step === tween.duration) tween.complete = true;
            return sample;
        } else return;
    }

    // 只能在一个时间执行一个to，不然会将其他的覆盖
    to(vector, tweenType = 'linear') {
        if (this.equals(vector)) return this;

        const sign = vector.toString();
        let toInfo = this.progress;
        if (!toInfo || toInfo.sign !== sign) { // 没有移动到该点的事项
            this.progress = {
                sign,
                difference: vector.sub(this),
                tween: {...this.tween[tweenType]},
                startPoint: this.clone(),
                complete: false,
            };
        }

        const {difference, tween, startPoint} = this.progress;
        if (!tween.complete) {
            const delta = this.updateTween();
            this.copy(startPoint.clone().add(difference.clone().multiplyScalar(delta.y)));
        } else this.progress = null;
        return this;
    }
}

window.TweenVector2 = TweenVector2;
