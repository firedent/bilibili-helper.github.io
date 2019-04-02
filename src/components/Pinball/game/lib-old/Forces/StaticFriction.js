/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description:
 */
export class StaticFriction {
    /**
     * 静摩擦力
     * @param mass 质量
     * @param µ 静摩擦系数
     */
    constructor(mass, µ) {
        this.mass = mass;
        this.µ = µ;
    }

    get force() {
        return this.mass * this.µ;
    }
}
