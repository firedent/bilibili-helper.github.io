/**
 * Author: DrowsyFlesh
 * Create: 2019-04-08
 * Description: 效果场，简称EF
 */
import {Thing} from 'Pinball/game/lib/Things/Thing';

export class EffectField extends Thing {
    type = 'effectField';

    constructor(options) {
        super(options);
    }

    /**
     * 效果处理接口
     * @param thing {Thing}
     */
    do(thing) {

    }
}
