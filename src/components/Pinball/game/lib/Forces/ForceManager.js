/**
 * Author: DrowsyFlesh
 * Create: 2019-04-10
 * Description:
 */
import {LimitedVector2, Vector2} from 'Pinball/game/lib';

export class ForceManager {
    forces = new Map();

    /**
     * 力管理器
     * @param thing {Thing}
     */
    constructor(thing) {
        this.thing = thing;
    }

    /**
     * @param f {Force}
     */
    add(f) {
        this.forces.set(f.id, f);
        return this;
    }

    /**
     * @param fid {string}
     * @return {ForceManager}
     */
    remove(fid) {
        this.forces.delete(fid);
        return this;
    }

    // 清空
    empty() {
        this.forces = new Map();
        return this;
    }

    // 遍历，用于力的合成和处理
    each(callback) {
        this.forces.forEach((force, fid) => callback(force, fid));
        return this;
    }

    // 遍历起作用的力
    eachActive(callback) {
        this.each((force, fid) => {
            if (force.condition() && force.f.length > 0) { // 过滤掉不满足触发条件且不会零的力
                callback(force, fid);
            }
        });
        return this;
    }

    // 获取合力
    jointForce() {
        const jointForce = new LimitedVector2(0, 0);
        this.eachActive((force) => jointForce.add(force.f));
        return jointForce;
    }

    // 不满足条件的力并且是非持久力则删除
    clearInstantForce() {
        this.forces.forEach((force, fid) => {
            if (force.instantaneous) {
                this.remove(fid);
            }
        });
        return this;
    }
}
