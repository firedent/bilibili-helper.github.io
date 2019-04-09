/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {BasicThing} from 'Pinball/game/lib/Things';
import {LimitedVector2} from 'Pinball/game/lib/Math';

export const testLevel = {
    id: 'test',
    coordinate: new LimitedVector2(0, 0),
    sceneSize: {
        width: 300,
        height: 600,
    },
    things: [
        {
            type: BasicThing,
            attributes: {
                position: new LimitedVector2(20, 0),
                width: 20,
                height: 320,
                radius: 40,
                density: 0.01,
                //µ: 0.01,
                //originAcceleration: new LimitedVector2(0, 1),
            },
        },
        {
            type: BasicThing,
            attributes: {
                position: new LimitedVector2(260, 20),
                width: 20,
                height: 300,
                radius: 40,
                density: 0.01,
                //µ: 0.01,
                //originAcceleration: new LimitedVector2(0, 1),
            },
        },
        {
            type: BasicThing,
            attributes: {
                position: new LimitedVector2(20, 300),
                width: 200,
                height: 20,
                radius: 40,
                density: 0.01,
                //µ: 0.01,
                //originAcceleration: new LimitedVector2(0, 1),
            },
        },
        {
            type: BasicThing,
            attributes: {
                position: new LimitedVector2(80, 20),
                width: 200,
                height: 20,
                radius: 40,
                density: 0.01,
                //µ: 0.01,
                //originAcceleration: new LimitedVector2(0, 1),
            },
        },
    ],
};
