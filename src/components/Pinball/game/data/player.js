/**
 * Author: DrowsyFlesh
 * Create: 2019-04-11
 * Description:
 */
import {LimitedVector2} from 'Pinball/game/lib/Math';
export const playerData = {
    heal: 100,
    balls: [
        {
            heal: 20,
            attack: 1,
            density: .001,
            radius: 10,
            originAcceleration: new LimitedVector2(0, 0),

        },
        {
            heal: 40,
            attack: 2,
            density: .001,
            radius: 20,
            originAcceleration: new LimitedVector2(0, 0),
        },
    ],
    effects: [],
};
