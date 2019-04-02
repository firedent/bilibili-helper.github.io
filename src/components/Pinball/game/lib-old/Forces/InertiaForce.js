/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description:
 */
export class InertiaForce {
    constructor(mass, a) {
        this.mass = mass;
        this.a = a;
    }

    get force() {
        return this.mass * this.a;
    }
}
