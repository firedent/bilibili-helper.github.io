/**
 * Author: DrowsyFlesh
 * Create: 2019-04-09
 * Description:
 */

import * as PIXI from 'pixi.js';
import {TimerManager} from './TimerManager';
import {Timer} from './Timer';

let timer = {
    TimerManager: TimerManager,
    Timer: Timer,
};

if (!PIXI.TimerManager) {
    PIXI.TimerManager = new TimerManager();

    PIXI.Timer = Timer;
}

export default timer;
