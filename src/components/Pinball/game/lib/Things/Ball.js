import {LimitedVector2, NOT_INTERSECT, CENTER, Vector2} from 'Pinball/game/lib';

/**
 * Author: DrowsyFlesh
 * Create: 2019/4/4
 * Description:
 */
import {Thing} from 'Pinball/game/lib/Things/Thing';

export class Ball extends Thing {
    type = 'ball';

    needRecycle = false; // 是否能被回收的标记

    carried = true; // 被baffle携带的标记，被携带即跟随baffle一起移动

    constructor(options) {
        const {radius, zIndex = 0, ...restOptions} = options;
        super({
            width: radius * 2,
            height: radius * 2,
            radius,
            zIndex,
            ...restOptions,
        });
    }

    followBaffle(baffle) {
        this.needRecycle = false;
        const newPosition = baffle.launchPosition.clone().sub(new LimitedVector2(this.radius[0], this.radius[0] * 2));
        if (this.position.x < 0) {
            newPosition.x = 0;
            baffle.launchDelta.x = baffle.launchDelta.x + this.position.x;
        } else {
            const delta = this.position.x + this.radius[0] * 2 - this.game.level.scene.width;
            if (delta > 0) {
                newPosition.x = this.game.level.scene.width - this.radius[0] * 2;
                baffle.launchDelta.x = delta + baffle.launchDelta.x;
            }
        }
        this.collisionResult.add({
            prototype: 'position',
            operation: 'set',
            value: newPosition,
            priority: 10,
        });
    }
}
