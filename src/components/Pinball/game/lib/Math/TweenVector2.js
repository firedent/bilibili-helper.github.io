/**
 * Author: DrowsyFlesh
 * Create: 2019/3/28
 * Description:
 */
import {EPSILON} from 'Pinball/game/lib/Math/consts';
import {LimitedVector2} from 'Pinball/game/lib/Math/LimitedVector2';
import {Easing} from 'Pinball/game/lib/Math/Easing';

export class TweenVector2 extends LimitedVector2 {
    constructor(x, y, limit, tween, progress) {
        super(x, y, limit);
        this.tween = tween || {
            linear: {
                duration: 1,
                bezier: new Easing().bezier,
                samples: [0, 1],
                step: 0,
                complete: false,
            },
        };
        this.progress = progress || null;
    }

    get isTweenVector2() {return true;}

    clone() {
        const v = new TweenVector2(this.x, this.y, this.limit, this.tween, this.progress);
        return v;
    }

    copy(v) {
        super.copy(v);
        this.tween = v.tween;
        this.progress = this.progress;
        return this;
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
    to(target, tweenType = 'linear') {
        if (this.equals(target)) return this;
        const sign = target.toString();
        let toInfo = this.progress;
        if (!toInfo || toInfo.sign !== sign) { // 没有移动到该点的事项
            this.progress = {
                sign,
                difference: target.sub(this),
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

    toLength(targetLength, tweenType = 'linear') {
        if (targetLength === this.length) return this;
        const sign = targetLength;
        let toInfo = this.progress;
        if (!toInfo || toInfo.sign !== sign) { // 没有移动到该点的事项
            this.progress = {
                sign,
                difference: targetLength - this.length,
                tween: {...this.tween[tweenType]},
                startLength: this.length,
                complete: false,
            };
        }

        const {difference, tween, startLength} = this.progress;
        if (!tween.complete) {
            const delta = this.updateTween();
            this.length = startLength + difference * delta.y;
        } else this.progress = null;
        return this;
    }
}

window.TweenVector2 = TweenVector2;
