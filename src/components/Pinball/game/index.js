/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Game, Vector2} from 'Pinball/game/lib';
import {BlockMap} from 'Pinball/game/items';

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
    game.createMap({
            width,
            height: height / 2,
            rows: 2,
            columns: 5,
            gap: 10,
            padding: 40,
        })
        .createBlock({row: 0, column: 0, radius: 3})
        .createBlock({row: 0, column: 1, radius: 3})
        .createBlock({row: 1, column: 0, radius: 3})
        .createBlock({row: 1, column: 1, radius: 3});

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








