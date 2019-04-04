/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {BasicThing} from 'Pinball/game/lib/Things';
import {Vector2} from 'Pinball/game/lib/Math';

export const testLevel = {
    coordinate: new Vector2(0, 0),
    things: [
        {
            type: BasicThing,
            attributes: {
                position: new Vector2(20, 20),
                mass: 1,
                density: 10,
                acceleration: new Vector2(0, 0),
            },
        }
    ],
};
