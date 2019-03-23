/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Game, Vector2} from 'Pinball/game/lib';

export const createApp = (width, height) => {
    const game = new Game().create(width, height);
    game.createBall({
        radius: 50,
        position: new Vector2(50, 250),
        acceleration: new Vector2(1, 1),
        speed: 1,
    });
    game.createBaffle({
        position: new Vector2(100, 200),
    });

    const left = game.bindKey(document, 37);
    const right = game.bindKey(document, 39);
    game.addTicker(delta => gameLoop(delta));

    const gameLoop = (delta) => {
        game.ballsMap.forEach((ball) => {
            ball.collisionCheckWithMap(width, height);
            ball.collisionCheckWithBox(game.baffle);
            //game.baffle.collisionCheckWithBall(ball);
            ball.move(delta);
        });

        !left.down && !right.down && game.baffle.stopMove();
        if (left.down) game.baffle.moveLeft();
        if (right.down) game.baffle.moveRight();
        if (left.down || right.down) game.baffle.collisionCheckWithBox(width, height);
    };
    return game.app;
};








