/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import TWEEN from '@tweenjs/tween.js';
import {Game, LimitedVector2, Vector2} from 'Pinball/game/lib';
import BezierEasing from 'bezier-easing';

export const createApp = (width, height) => {
    const game = new Game().create(width, height);
    game.initGUI({
        global: {
            speed: {
                value: {speed: 1},
                min: 0.1,
                max: 5,
            },
        },
        baffle: {
            accelerationSpeed: {
                value: {accelerationSpeed: 3},
                min: 1,
                max: 5,
            },
            velocitySpeed: {
                value: {velocitySpeed: 6},
                min: 1,
                max: 9,
            },
        },
    });
    const baffleAccelerationBezierEasing = BezierEasing(1, 0, 0, 1);
    const baffle = game.createBaffle({
        color: 0xdddddd,
        position: new LimitedVector2(100, height - 50),
        width: 100,
        height: 10,
        radius: 50,
        acceleration: new LimitedVector2(0, 0).setMax('length', 1),
        velocity: new LimitedVector2(0, 0).setMax('length', 1),
        //rotation: Math.PI,
    });

    //baffle.createBall({
    //    radius: 10,
    //    velocity: new Vector2(2 * game.guiController.global.speed, -2 * game.guiController.global.speed),
    //    //velocityBezierEasing: baffleAccelerationBezierEasing,
    //    gravitationBezierEasing: baffleAccelerationBezierEasing,
    //    maxGravitation: 1,
    //    maxVelocity: 20,
    //    //acceleration: new Vector2(-1 * speed, -1 * speed),
    //    position: new Vector2(-45, -120),
    //    drawDirection: true,
    //});
    const [rows, columns, gap, padding] = [2, 2, 30, 30];
    const columnWidth = (width - 2 * padding - (columns - 1) * gap) / columns;
    game.createMap({
            width,
            height: 2 * padding + rows * (columnWidth + gap) - gap,
            rows,
            columns,
            gap,
            padding,
            blockOption: {
                color: 0xeeeddd,
                radius: 50,
                //width: 10,
                //height: 10,
                //alpha: 0.5,
            },
        })//.createBlock({index: 0});
        .fillAll();
    const space = game.bindKey(document, 'space', 32);

    let baffleUpCenter;
    game.addTicker((delta) => {
        TWEEN.update();

        if (space.down) baffleUpCenter = game.baffle.center.sub(new Vector2(0, game.baffle.height / 2));
        window.baffleUpCenter = baffleUpCenter;
        game.ballsMap.forEach((ball) => {
            if (space.down) {
                game.baffle.attractBall(ball);
                ball.moveUnderGravitation(delta);
            } else ball.escapeFromGravitation(delta);

            ball.collisionCheckRoundedRect(baffle);
            for (let key in game.blockMap.map) {
                const res = ball.collisionCheckRoundedRect(game.blockMap.map[key]);
                res && console.log(1);
            }
            ball.collisionCheckWithMap(width, height);
        });
    });

    return game.app;
};








