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
    /**
     * 标记是否为瞬时力，为瞬时力时，计算完后会立刻从合成列表中删除
     * @type {boolean}
     */
    instantaneous = true;

    constructor(thing) {
        this.thing = thing;
    }

    /**
     * @return {LimitedVector2}
     */
    get f() {
        return;
    }

    /**
     * 力产生作用的条件
     * @return {boolean}
     */
    condition() {}


}
