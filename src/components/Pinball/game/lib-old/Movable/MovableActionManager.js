/**
 * Author: DrowsyFlesh
 * Create: 2019/3/30
 * Description:
 */

export class MovableActionManager {
    constructor() {
        this.time;
        this.actionQueue = [];
    }

    get isEmpty() {
        return this.actionQueue.length === 0;
    }

    get lastAction() {
        return this.actionQueue[this.actionQueue.length - 1];
    }

    get lastResult() {
        const last = this.lastAction;
        if (last) return Object.values(this.lastAction)[0];
        else return undefined;
    }

    checkPreviousAction() {
        return this.lastResult;
    }

    sameTime(time) {
        return this.time === time;
    }

    setAction(time, actionName, result) {
        if (!this.sameTime(time)) { // 如果是不同帧，则创建新的队列
            this.time = time;
            this.actionQueue = [];
            this.actionQueue.push({[actionName]: result});
        } else if (this.lastAction) {
            this.actionQueue.push({[actionName]: result});
        }
        return this;
    }
}
