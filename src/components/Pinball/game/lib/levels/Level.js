//class MapData {
//    coordinate;
//
//    /**
//     * 地图数据
//     * @param coordinate 在大地图上的坐标
//     */
//    constructor(coordinate) {
//        this.coordinate = coordinate;
//    }
//}
import _ from 'lodash';
import {LimitedVector2} from 'Pinball/game/lib/Math';
import {EffectField, Thing} from 'Pinball/game/lib/Things';
import {Baffle} from 'Pinball/game/lib/Things/Baffle';
import {Player} from 'Pinball/game/lib/Things/Player/Player';
import * as PIXI from 'pixi.js';
import 'Pinball/game/lib/Timer';
import 'Pinball/game/lib';
import {playerData} from 'Pinball/game/data';

export class Level {
    /**
     * @param game {Game}
     */
    game;
    stage = new PIXI.display.Layer();
    sceneSize;
    scene; // 场景
    shape;
    groups = {};

    player;

    id;
    coordinate; // 大地图数据
    originThingData; // 战斗物体初始化列表
    things = { // 战斗物体实例化Map
        ball: new Map(),
        baffle: null,
        effectField: new Map(),
        entry: new Map(),
        other: new Map(),
        player: null,
    };

    keyMap = {}; // 按键绑定列表

    /**
     * 关卡
     * @param coordinate {LimitedVector2} 大地图数据
     * @param battleData {Thing[]} 战斗场景中物体的初始化数据列表
     */
    constructor({game, id, coordinate, sceneSize, things}) {
        this.game = game;
        this.id = id;
        this.sceneSize = sceneSize;
        this.coordinate = coordinate;
        this.originThingData = things;
        this.scene = new Thing({
            game,
            type: 'scene',
            position: new LimitedVector2(0, 0),
            alpha: 0,
            width: sceneSize.width,
            height: sceneSize.height,
            density: 0,
            originAcceleration: new LimitedVector2(0, 0),
        });
        this.app.stage = new PIXI.display.Stage();
        this.app.stage.group.enableSort = true;
    }

    get app() {
        return this.game.app;
    }

    get baffle() {
        return this.things.baffle;
    }

    set baffle(thing) {
        this.things.baffle = thing;
    }

    // 载入关卡
    load() {
        this.initPlayer(playerData);
        this.initStage();
        this.initKeyboard();
        this.game.addTicker(this.ticker);
        return this;
    }

    ticker = (delta) => {
        /**
         * 按键响应
         */
        const {left, right} = this.game.keyMap;
        window.keyLeftRight = `${left.down}:${right.down}`;
        if (left.down && !right.down) this.baffle.moveLeft(delta);
        if (right.down && !left.down) this.baffle.moveRight(delta);

        this.baffle.drawDirectionLine();
        PIXI.TimerManager.update(delta);

        /**
         * 物体状态计算与更新
         * 1. 初步计算：先计算物体各自属性和受力模型计算下一帧的属性，如位置，加速度，速度，存储在next中
         * 2. 碰撞检测：根据next数据做碰撞检测，存储在collisionResult中
         * 3. 二次计算：根据next和collisionResult生成新的newNext
         * 4. 更新数据：根据next更新为当前数据
         */

            // 1. 初步计算：先计算物体各自属性和受力模型计算下一帧的属性，如位置，加速度，速度，存储在next中
        const unCarriedBalls = [];
        const carriedBalls = [];
        this.things.ball.forEach((ball) => {
            if (ball.carried) {
                ball.followBaffle(this.baffle);
                carriedBalls.push(ball);
            } else {
                ball.composite();
                unCarriedBalls.push(ball);
            }
        });
        this.things.entry.forEach((type) => type.forEach((thing) => {
            thing.composite();
        }));
        this.baffle.composite();
        this.player.composite();

        // 2. 碰撞检测：根据next数据做碰撞检测，存储在collisionResult中
        unCarriedBalls.map((ball) => {
            this.things.entry.forEach((type) => type.forEach((thing) => {
                ball.collisionWithThingAndReflect(thing);
            }));
            ball.collisionWithThingAndReflect(this.things.player);
            ball.collisionWithThingAndCallback(this.baffle, (res) => {
                // res 为true则碰撞到
                res && this.baffle.carryBall(ball);
            });
            ball.collisionWithScene(this.scene);
            ball.applyEffects();
        });
        carriedBalls.map((ball) => {
            ball.collisionWithScene(this.scene);
            ball.applyEffects();
        });
        this.things.entry.forEach((type) => type.forEach((thisThing) => {
            //this.things.entry.forEach((type) => type.forEach((thing) => { // 物体之间互相做碰撞检测和反应
            //    thisThing.collisionWithThing(thing);
            //}));
            thisThing.collisionWithThingAndReflect(this.baffle);
            thisThing.collisionWithScene(this.scene);
            thisThing.applyEffects();
        }));
        this.baffle.collisionWithScene(this.scene);
        this.baffle.applyEffects();
        this.things.effectField.forEach((EF) => {
            this.things.ball.forEach((ball) => {
                EF.collisionWithThingAndApply(ball);
                EF.collisionWithThingAndApply(this.player);
            });
        });

        // 3. 二次计算：根据next和collisionResult生成新的newNext
        this.things.ball.forEach((ball) => {
            ball.syncNextAndCollisionResult();
        });
        this.things.entry.forEach((type) => type.forEach((thing) => {
            thing.syncNextAndCollisionResult();
        }));
        this.baffle.syncNextAndCollisionResult();
        this.player.syncNextAndCollisionResult();

        // 4. 更新数据：根据newNext更新为当前数据
        this.things.ball.forEach((ball) => {
            ball.updateWithNewNextAndClear();
        });
        this.things.entry.forEach((type) => type.forEach((thing) => {
            thing.updateWithNewNextAndClear();
        }));
        this.baffle.updateWithNewNextAndClear();
        this.player.updateWithNewNextAndClear();
        this.things.effectField.forEach((EF) => {
            EF.updateWithNewNextAndClear();
        });
    };

    destory() { // 退出关卡
        this.unbindKeyboard();
        this.unbindMouseEvent();
    }

    initStage() {
        this.initBattleField();
        this.stage.addChild(this.scene.item);
        this.app.stage.addChild(this.stage);
        return this;
    }

    // 创建战场
    initBattleField() {
        // 初始化并载入物体
        this.initThings();

        // 创建并载入反射板
        this.initBaffle();
        return this;
    }

    // 初始化并载入物体
    initThings() {
        _.each(this.originThingData, (tingConfig) => {
            const {type: ThingType, attributes} = tingConfig;
            const thing = new ThingType({game: this.game, ...attributes});
            this.addThing(thing);
        });
        return this;
    }

    initPlayer(playerData) {
        this.player = new Player({game: this.game, level: this, ...playerData});
        this.addThing(this.player);
    }

    // 创建并载入反射板
    initBaffle() {
        this.addThing(new Baffle(this.game));
        return this;
    }

    // 初始化按键绑定
    initKeyboard() {
        //const up = this.game.bindKeyboard(document, 'up', 38);
        //const down = this.game.bindKeyboard(document, 'down', 40);
        /**
         * baffle keyboard
         */
        this.game.bindKeyboard(document, 'left', 37);
        this.game.bindKeyboard(document, 'right', 39);

        return this;
    }

    addThing(thing) {
        if (thing.type === 'baffle') {
            this.baffle = thing;
        } else if (thing.type === 'ball') {
            this.things.ball.set(thing.id, thing);
        } else if (thing.type === 'effectField') {
            this.things.effectField.set(thing.id, thing);
        } else if (thing.type === 'player') {
            this.things.player = thing;
        } else if (thing.type === 'other') {
            this.things.other.set(thing.id, thing);
        } else {
            if (!this.things.entry.has(thing.type)) {
                this.things.entry.set(thing.type, new Map());
            }
            this.things.entry.get(thing.type).set(thing.id, thing);
        }
        // 创建zIndex图层
        if (!this.groups[thing.item.zIndex]) {
            this.groups[thing.item.zIndex] = new PIXI.display.Group(thing.item.zIndex);
            this.app.stage.addChild(new PIXI.display.Layer(this.groups[thing.item.zIndex]));
        }
        thing.loadedInLevel = true;
        thing.item.parentGroup = this.groups[thing.item.zIndex];
        this.stage.addChild(thing.item);
        this.app.stage.updateStage();
        return this;
    }

    removeThing(thing) {
        this.app.stage.removeChild(thing.item);
    }

    bindMouseEvent(element, eventType, callback) {
        if (element instanceof PIXI.DisplayObject) {
            element.interactive = true;
            element.buttonMode = true;
            element.on(eventType, callback);
        } else {
            console.warn(`element is not a DisplayObject`, element);
        }
    }

    // 卸载按键绑定
    unbindKeyboard() {
        this.game.unbindKey('left');
        this.game.unbindKey('right');
    }

    // 卸载鼠标事件
    unbindMouseEvent() {
        this.game.unbindMouseEvent();
    }

    /**
     * 检查战斗数据，校验战斗是否结束
     * @param type {string} 战斗结束类型
     */
    //checkEnd(type) {
    //
    //}
}
