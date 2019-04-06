/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import * as dat from 'dat.gui';
import {Level} from 'Pinball/game/lib/levels';
import {Application} from 'pixi.js';

export class Game {
    app; // 渲染器对象
    level; // 当前载入关卡

    width = 0; // 渲染宽度
    height = 0; // 渲染高度

    gui; // gui对象
    guiCtrl = {}; // gui参数表

    keyMap = {}; // 按键绑定列表

    constructor() {
        this.initGUI();
    }

    create(width, height) {
        this.width = width;
        this.height = height;
        this.app = new Application({
            width,
            height,
            antialias: true,
            transparent: true,
        });
        return this;
    }

    addTicker(tickFunc) {
        this.app.ticker.add(tickFunc);
        return this;
    }

    loadLevel(levelOption) {
        this.level = new Level(levelOption);
        this.level.load();
    }

    //createMap(options) {
    //    this.blockMap = new BlockMap(options).init(this);
    //    this.app.stage.addChild(this.blockMap.item);
    //    return this.blockMap;
    //}

    initGUI(options) {
        if (!this.gui) this.gui = new dat.GUI();
        this.guiCtrl = options;
        for (let folderName in options) {
            const folder = this.gui.addFolder(folderName);
            for (let controllerName in options[folderName]) {
                if (controllerName === 'open' && options[folderName][controllerName]) {
                    folder.open();
                } else {
                    const {value, min, max, step} = options[folderName][controllerName];
                    folder.add(value, controllerName, min, max, step);
                }
            }
        }
    }

    /**
     * 按键绑定
     * @param element 绑定元素
     * @param keyName 按键名称
     * @param keyCode 按键代码
     * @return {{keyCode: *, downEvent: downEvent, upEvent: upEvent, downHandle: downHandle, upHandle: upHandle, down: boolean, element: *}}
     */
    bindKeyboard(element, keyName, keyCode) {
        const state = {
            element,
            keyCode,
            down: false,
            downHandle: () => {},
            upHandle: () => {},
            downEvent: function(e) {
                e.preventDefault();
                if (e.keyCode === keyCode) {
                    state.down = true;
                    state.downHandle(e);
                }
            },
            upEvent: function(e) {
                e.preventDefault();
                if (e.keyCode === keyCode) {
                    state.down = false;
                    state.upHandle(e);
                }
            },
        };
        element.addEventListener('keydown', state.downEvent, false);
        element.addEventListener('keyup', state.upEvent, false);
        this.keyMap[keyName] = state;
        return state;
    };

    unbindKey(keyName) {
        const keyState = this.keyMap[keyName];
        if (keyState) {
            const {element, downEvent, upEvent} = keyState;
            element.removeEventListener(downEvent);
            element.removeEventListener(upEvent);
        }
    }

    unbindMouseEvent() {
        const mouseState = this.mouseEvent;
        if (mouseState) {
            const {element, downEvent, upEvent} = mouseState;
            element.removeEventListener(downEvent);
            element.removeEventListener(upEvent);
        }
    }
}
