/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import TWEEN from '@tweenjs/tween.js';
import {Game, LimitedVector2, Vector2} from 'Pinball/game/lib';
import BezierEasing from 'bezier-easing';
import {Easing} from 'Pinball/game/lib/Math/Easing';
import {TweenVector2} from 'Pinball/game/lib/Math/TweenVector2';

const increaseAccelerationBezier = new Easing(
    new LimitedVector2(.99, .22),
    new LimitedVector2(.47, .84),
);

const decreaseAccelerationBezier = increaseAccelerationBezier.flip();
const accelerationSpeed = 0;
const acceleration = new TweenVector2(0, 0).setMinXY(-accelerationSpeed, -accelerationSpeed).setMaxXY(accelerationSpeed, -accelerationSpeed)  // baffle acceleration
                                           .setTween('increase', {
                                               duration: 10, // fps * seconds
                                               bezier: increaseAccelerationBezier.bezier,
                                           })
                                           .setTween('decrease', {
                                               duration: 5, // fps * seconds
                                               bezier: decreaseAccelerationBezier.bezier,
                                           });
const velocitySpeed = 3;
const velocity = new TweenVector2(1, -1.7).setMinXY(-velocitySpeed, -velocitySpeed).setMaxXY(velocitySpeed, velocitySpeed) // baffle velocity
                                          .setTween('increase', {
                                              duration: 6, // fps * seconds
                                              bezier: increaseAccelerationBezier.bezier,
                                          })
                                          .setTween('decrease', {
                                              duration: 6, // fps * seconds
                                              bezier: decreaseAccelerationBezier.bezier,
                                          });

export const createApp = (width, height) => {
    const game = new Game().create(width, height);
    game.initGUI({
        global: {
            speed: {
                value: {speed: 1},
                min: .1,
                max: 5,
            },
        },
        ball: {
            speed: {
                value: {speed: 2.5},
                min: .1,
                max: 5,
                step: .1,
            },
            open: true,
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

    baffle.createBall({
        radius: 10,
        velocity,
        acceleration,
        position: new LimitedVector2(0, 0),
        drawDirection: true,
    });
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
                ball.moveTo(delta, baffleUpCenter);
            } else ball.moveTo(delta);

            ball.collisionCheckRoundedRect(baffle);
            for (let key in game.blockMap.map) {
                const res = ball.collisionCheckRoundedRect(game.blockMap.map[key]);
                //res && console.log(1);
            }
            ball.collisionCheckWithMap(width, height);
        });
    });

    return game.app;
};








