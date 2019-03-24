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
        length: 100,
        radius: 50,
    });
    baffle.createBall({
        radius: 10,
        acceleration: new Vector2(1, -1),
        speed: 3,
    });
    const [rows, columns, gap, padding] = [2, 5, 10, 10];
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
        },
    }).fillAll();

    game.addTicker((delta) => {
        game.ballsMap.forEach((ball) => {
            ball.move();
            ball.collisionCheckRoundedRect(baffle);
            for (let key in game.blockMap.map) {
                ball.collisionCheckRoundedRect(game.blockMap.map[key]);
            }
            ball.collisionCheckWithMap(width, height);
        });
    });

    return game.app;
};








