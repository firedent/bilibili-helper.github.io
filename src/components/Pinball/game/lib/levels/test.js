/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {BasicThing} from 'Pinball/game/lib/Things';
import {LimitedVector2} from 'Pinball/game/lib/Math';

export const testLevel = {
    coordinate: new LimitedVector2(0, 0),
    scene: {
        width: 300,
        height: 600,
    },
    things: [
        {
            type: BasicThing,
            attributes: {
                position: new LimitedVector2(20, 20),
                mass: 1,
                density: 10,
                acceleration: new LimitedVector2(0, 0),
            },
        },
    ],
};
