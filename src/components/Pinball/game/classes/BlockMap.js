/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Container} from 'pixi.js';
import {Vector2} from 'Pinball/game/lib';
import {Block} from 'Pinball/game/classes';

// 在旧值上加新值，如果新值为undefined时使用旧值
const useNewByOldFunc = (oldValue, newValue) => (newValue !== undefined) ? newValue : oldValue;

const mergeNew = (oldObject, newObject, func = useNewByOldFunc) => _.mergeWith(oldObject, newObject, func);

export class BlockMap {
    constructor({app, width, height, rows, columns, gap = 0, padding = 0, mapData, blockOption = {}}) {
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.columns = columns;
        this.maxNumber = this.rows * this.columns;
        this.padding = padding;
        this.gap = gap;
        this.mapData = mapData;
        this.map = {};
        this.app = app;
        this.item = new Container();
        this.blockOption = blockOption;
        this.calculate();
        if (app) this.init(app);
    }

    setGap(gap) {
        const delta1 = (this.width - 2 * this.padding) / (this.columns - 1);
        const delta2 = (this.height - 2 * this.padding) / (this.rows - 1);
        if (delta1 >= gap && delta2 >= gap) this.gap = gap;
        else this.gap = Math.min(delta1, delta2);
    }

    init(app) {
        this.app = app;
        return this;
    }

    calculate() {
        this.columnWidth = (this.width - 2 * this.padding - (this.columns - 1) * this.gap) / this.columns;
        this.rowHeight = (this.height - 2 * this.padding - (this.rows - 1) * this.gap) / this.rows;
        if (this.blockOption.width === undefined) this.blockOption.width = this.columnWidth;
        if (this.blockOption.height === undefined) this.blockOption.height = this.rowHeight;
        return this;
    }

    createBlock({index, row, column, width = this.blockOption.width, height = this.blockOption.height, ...rest}) {
        if (width > this.columnWidth) {
            console.warn('block\'s width is larger than column width');
        }
        if (height > this.rowHeight) {
            console.warn('block\'s height is larger than row height');
        }
        let boxPosition;
        if (index !== undefined) {
            if (index > this.maxNumber) {
                console.error(`The index ${index} is bigger than ${this.maxNumber}`);
                return this;
            }
            boxPosition = this.getPositionByCoordinate(Math.ceil(index / this.columns), index % this.columns);
        } else if (row !== undefined && column !== undefined) { // 查询所传坐标位于哪个目标框内
            boxPosition = this.getPositionByCoordinate(row, column);
        }

        const delta = new Vector2((this.columnWidth - width) / 2, (this.rowHeight - height) / 2);
        const targetPosition = boxPosition.add(delta);
        const blockOption = mergeNew(this.blockOption, {app: this.app, row, column, width, height, position: targetPosition, ...rest});
        const block = new Block(blockOption);
        this.addBlock2Map(block, row, column);
        return this;
    }

    addBlock2Map(block, row, column) {
        if (this.map[`${row}:${column}`]) {
            this.removeBlock(row, column);
            console.warn(`the coordinate at ${row}:${column} is not empty!`);
        }
        this.map[`${row}:${column}`] = block;
        this.item.addChild(block.item);
    }

    removeBlock(row, column) {
        if (this.map[`${row}:${column}`]) {
            this.item.removeChild(this.map[`${row}:${column}`].item);
        }
    }

    getPositionByCoordinate(row, column) {
        return new Vector2(
            this.padding + (column) * (this.gap + this.columnWidth),
            this.padding + (row) * (this.gap + this.rowHeight),
        );
    }

    fillAll() {
        for (let column = 0; column < this.columns; ++column) {
            for (let row = 0; row < this.rows; ++row) {
                this.createBlock({row, column});
            }
        }
    }
}
