/**
 * Author: DrowsyFlesh
 * Create: 2019/3/21
 * Description:
 */
import {Application} from 'pixi.js';
import {Ball, Baffle} from 'Pinball/game/items';
import {bindKeyboard} from 'Pinball/game/lib';

const [width, height] = [300, 300];
export const app = new Application({
    width,
    height,
    antialias: true,
    transparent: true,
});

let ball = new Ball({
    color: 0xffffff,
    speed: 1,
    radius: 5,
    position: {x: 150, y: 50},
    acceleration: {x: 1, y: 5},
}).init();

app.stage.addChild(ball.item);

let baffle = new Baffle({
    color: 0xffffff,
    length: 100,
    thick: 7,
    speed: 0.4,
    position: {x: 80, y: 250},
}).init();
app.stage.addChild(baffle.item);

app.ticker.add(delta => gameLoop(delta));

const up = bindKeyboard(document, 38);
const down = bindKeyboard(document, 40);
const left = bindKeyboard(document, 37);
const right = bindKeyboard(document, 39);

const gameLoop = (delta) => {
    ball.collisionCheckWithBox(width, height);
    baffle.collisionCheckWithBall(ball);
    ball.move(delta);
    !up.down && !down.down && !left.down && !right.down && baffle.stopMove();
    //if (up.down) baffle.moveUp();
    //if (down.down) baffle.moveDown();
    if (left.down) baffle.moveLeft();
    if (right.down) baffle.moveRight();
    if (up.down || down.down || left.down || right.down) baffle.collisionCheckWithBox(width, height);
    //if (!up.down && !down.down) baffle.moveToCenter(700);

};
