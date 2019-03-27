/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Game, Vector2} from 'Pinball/game/lib';


export const createApp = (width, height) => {
    const game = new Game().create(width, height);
    const baffle = game.createBaffle({
        color: 0xdddddd,
        position: new Vector2(100, height - 50),
        width: 100,
        height: 10,
        radius: 50,
        friction: 0.99,
        maxVelocity: 3,
        //rotation: Math.PI,
    });
    const speed = 10;
    baffle.createBall({
        radius: 10,
        velocity: new Vector2(1 * speed, -1 * speed),
        //acceleration: new Vector2(-1 * speed, -1 * speed),
        position: new Vector2(-45, -120),
    });
    const [rows, columns, gap, padding] = [3, 3, 50, 50];
    const columnWidth = (width - 2 * padding - (columns - 1) * gap) / columns;
    game.createMap({
        width,
        height: 2 * padding + rows * (columnWidth + gap) - gap,
        rows,
        columns,
        gap,
        padding,
        blockOption: {
            color: 0xffffff,
            radius: 10,
            //width: 10,
            //height: 10,
            //alpha: 0.5,
        },
    })//.createBlock({index: 0});
    .fillAll();

    game.addTicker((delta) => {
        game.ballsMap.forEach((ball) => {
            ball.move(delta);
            ball.collisionCheckRoundedRect(baffle);
            for (let key in game.blockMap.map) {
                ball.collisionCheckRoundedRect(game.blockMap.map[key]);
            }
            ball.collisionCheckWithMap(width, height);
        });
    });

    return game.app;
};








