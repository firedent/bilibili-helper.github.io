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

export class Level {
    coordinate; // 大地图数据
    battleData; // 战斗物体初始化列表
    things; // 战斗物体实例化Map
    endType; // 战斗结束类型

    /**
     * 关卡
     * @param coordinate {Vector2} 大地图数据
     * @param battleData {Thing[]} 战斗场景中物体的初始化数据列表
     */
    constructor(coordinate, things, endType) {
        this.coordinate = coordinate;
        this.originThings = things;
        this.endType = endType;
    }

    // 创建战场
    drawBattleField() {
        // 初始化并载入物体

        // 创建并载入反射板
    }

    // 初始化并载入物体
    initThings() {

    }

    // 创建并载入反射板
    initBaffle() {

    }

    /**
     * 检查战斗数据，校验战斗是否结束
     * @param type {string} 战斗结束类型
     */
    //checkEnd(type) {
    //
    //}
}
