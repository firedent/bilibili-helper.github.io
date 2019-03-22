/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Application} from 'pixi.js';
import {Ball, Baffle} from 'Pinball/game/items';
import {bindKeyboard, Vector2} from 'Pinball/game/lib';

export const createApp = (width, height) => {
    const app = new Application({
        width,
        height,
        antialias: true,
        transparent: true,
    });
    const speed = 0.5;
    let ball = new Ball({
        color: 0xffffff,
        speed: speed,
        radius: 10,
        position: new Vector2(50, 50),
        acceleration: new Vector2(1 / speed, 2 / speed),
    }).init();
    app.stage.addChild(ball.item);
    let baffle = new Baffle({
        color: 0xffffff,
        length: 100,
        thick: 7,
        speed: 0.4,
        position: new Vector2(100, 200),
    }).init();
    app.stage.addChild(baffle.item);
    app.ticker.add(delta => gameLoop(delta));


    const left = bindKeyboard(document, 37);
    const right = bindKeyboard(document, 39);

    const gameLoop = (delta) => {
        ball.collisionCheckWithBox(width, height);
        baffle.collisionCheckWithBall(ball);
        ball.move(delta);
        !left.down && !right.down && baffle.stopMove();
        if (left.down) baffle.moveLeft();
        if (right.down) baffle.moveRight();
        if (left.down || right.down) baffle.collisionCheckWithBox(width, height);
    };
    return app;
}








