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
import {Thing} from 'Pinball/game/lib/Things';
import {Baffle} from 'Pinball/game/lib/Things/Baffle';
import {Container, Graphics} from 'pixi.js';

export class Level {
    /**
     * @param game {Game}
     */
    game;
    stage = new Container();
    scene; // 场景
    shape;

    coordinate; // 大地图数据
    originThingData; // 战斗物体初始化列表
    things = {}; // 战斗物体实例化Map

    baffle;

    /**
     * 关卡
     * @param coordinate {LimitedVector2} 大地图数据
     * @param battleData {Thing[]} 战斗场景中物体的初始化数据列表
     */
    constructor({game, coordinate, scene, things}) {
        this.game = game;
        this.coordinate = coordinate;
        this.originThingData = things;
        this.scene = new Thing({
            game,
            position: new LimitedVector2(0, 0),
            mass: 1000,
            density: 100,
            originAcceleration: new LimitedVector2(0, 0),
        });
        this.scene.shape = new Graphics();
        this.scene.shape.beginFill(0, 0).drawRect(0, 0, scene.width, scene.height);
        this.scene.shape.endFill();
        this.scene.item.addChild(this.scene.shape);
        this.load();
    }

    get app() {
        return this.game.app;
    }

    // 载入关卡
    load() {
        this.initKeyboard();
        this.initStage();
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

        /**
         * 物体状态计算与更新
         * 1. 初步计算：先计算物体各自属性和受力模型计算下一帧的属性，如位置，加速度，速度，存储在next中
         * 2. 碰撞检测：根据next数据做碰撞检测，存储在collisionResult中
         * 3. 二次计算：根据next和collisionResult生成新的newNext
         * 4. 更新数据：根据next更新为当前数据
         */
        // 1. 初步计算：先计算物体各自属性和受力模型计算下一帧的属性，如位置，加速度，速度，存储在next中
        //_.each(this.things,(thing) => {
        // thing.composite();
        //});
        this.baffle.composite();

        // 2. 碰撞检测：根据next数据做碰撞检测，存储在collisionResult中
        this.baffle.collisionWithScene(this.scene);

        // 3. 二次计算：根据next和collisionResult生成新的newNext
        this.baffle.compositeWithNextAndCollisionResult();

        // 4. 更新数据：根据newNext更新为当前数据
        this.baffle.updateWithNewNext();
    };

    destory() { // 退出关卡
        this.unbindKeyboard();
    }

    initStage() {
        this.initBattleField();
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
            const thing = new ThingType(attributes);
            this.things[thing.id] = thing;
            this.stage.addChild(thing.item);
        });
        return this;
    }

    // 创建并载入反射板
    initBaffle() {
        this.baffle = new Baffle();
        this.stage.addChild(this.baffle.item);
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

    // 卸载按键绑定
    unbindKeyboard() {
        this.game.unbindKey('left');
        this.game.unbindKey('right');
    }

    /**
     * 检查战斗数据，校验战斗是否结束
     * @param type {string} 战斗结束类型
     */
    //checkEnd(type) {
    //
    //}
}
