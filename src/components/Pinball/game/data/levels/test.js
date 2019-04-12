/**
 * Author: DrowsyFlesh
 * Create: 2019/4/3
 * Description:
 */
import {BasicThing, SlowdownEF} from 'Pinball/game/lib/Things';
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
                position: new LimitedVector2(10, 10),
                width: 10, height: 400, radius: 40,
                density: 0.01,
            },
        },
        {
            type: BasicThing,
            attributes: {
                position: new LimitedVector2(280, 10),
                width: 10, height: 400, radius: 40,
                density: 0.01,
            },
        },
        //{
        //    type: SlowdownEF,
        //    attributes: {
        //        position: new LimitedVector2(60, 120),
        //        width: 180, height: 100, radius: 100, alpha: 0.1,
        //        density: 0,
        //        effectConfig: {
        //            µ: 0.7,
        //        },
        //    },
        //},
    ],
};
