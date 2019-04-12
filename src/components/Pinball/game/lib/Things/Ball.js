import {LimitedVector2, NOT_INTERSECT, CENTER, Vector2, SyncData} from 'Pinball/game/lib';

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

    _heal;
    attack;
    healTextItem;

    constructor(options) {
        const {heal, attack = 0, radius, zIndex = 0, ...restOptions} = options;
        super({
            width: radius * 2,
            height: radius * 2,
            radius,
            zIndex,
            ...restOptions,
        });
        this.initHealText();
        this.heal = heal;
        this.attack = attack;
    }

    get heal() {
        return this._heal;
    }

    set heal(n) {
        if (this.healTextItem) {
            this.healTextItem.text = n;
            this.healTextItem.x = this.halfWidth - this.healTextItem.width / 2 + 1;
            this.healTextItem.y = this.halfHeight - this.healTextItem.height / 2 + 1;
        }
        this._heal = n;
    }

    initHealText() {
        this.healTextItem = new PIXI.Text(this.heal, new PIXI.TextStyle({
            fontSize: 10,
            fill: '#fb7299',
        }));
        this.healTextItem.x = this.halfWidth - this.healTextItem.width / 2;
        this.healTextItem.y = this.halfHeight - this.healTextItem.height / 2;
        this.healTextItem.pivot.x = 0.5;
        this.healTextItem.pivot.y = 0.5;
        this.item.addChild(this.healTextItem);
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
        this.syncManager.add(new SyncData('position', null, 'set', newPosition, 10));
    }

    composite() {
        this.next.heal = this.heal;
        this.next.attack = this.attack;
        return super.composite();
    }
}
