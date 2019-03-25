/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Game, Vector2} from 'Pinball/game/lib';

export const createApp = (width, height) => {
    const game = new Game().create(width, height);
    const speed = 1;
    const baffle = game.createBaffle({
        color: 0xdddddd,
        position: new Vector2(100, /*height - 50*/ 150),
        length: 100,
        radius: 50,
        rotation: Math.PI,
    });
    baffle.createBall({
        radius: 50,
        velocity: new Vector2(1 * speed, 1 * speed),
        //acceleration: new Vector2(10,10),
        position: new Vector2(-40, -20),
    });
    const [rows, columns, gap, padding] = [1, 1, 30, 100];
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
            alpha: 0.5,
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








