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
import {Baffle} from 'Pinball/game/lib/Things/Baffle';
import {Container} from 'pixi.js';

export class Level {
    game;
    stage = new Container();

    coordinate; // 大地图数据
    originThingData; // 战斗物体初始化列表
    things = {}; // 战斗物体实例化Map

    baffle;

    /**
     * 关卡
     * @param coordinate {Vector2} 大地图数据
     * @param battleData {Thing[]} 战斗场景中物体的初始化数据列表
     */
    constructor({game, coordinate, things}) {
        this.game = game;
        this.coordinate = coordinate;
        this.originThingData = things;
        this.load();
    }

    get app() {
        return this.game.app;
    }

    // 载入关卡
    load() {
        this.initKeyboard();
        this.initStage();
        return this;
    }

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
        //const up = this.game.bindKey(document, 'up', 38);
        //const down = this.game.bindKey(document, 'down', 40);
        this.game.bindKey(document, 'left', 37);
        this.game.bindKey(document, 'right', 39);
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
