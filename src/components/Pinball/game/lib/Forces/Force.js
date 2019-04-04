/**
 * Author: DrowsyFlesh
 * Create: 2019/4/1
 * Description:
 */
export class Force {
    thing; // 承载力的物体
    /**
     * 力计算的优先级，数字越大，优先级越低
     */
    priority = 0;

    constructor(thing) {
        this.thing = thing;
    }


    get f() {
        return;
    }

    /**
     * 力产生作用的条件
     * @return {boolean}
     */
    condition() {}


}
