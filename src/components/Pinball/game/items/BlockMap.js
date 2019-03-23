/**
 * Author: DrowsyFlesh
 * Create: 2019/3/23
 * Description:
 */
import {Container} from 'pixi.js';
import {Vector2} from 'Pinball/game/lib';
import {Block} from 'Pinball/game/items';

export class BlockMap {
    constructor({app, width, height, rows, columns, gap = 0, padding = 0, mapData}) {
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
        return this;
    }

    createBlock({color, index, row, column, hp, radius, width = this.columnWidth, height = this.rowHeight, ...rest}) {
        if (width > this.columnWidth) {
            console.error('block\'s width is larger than column width');
            return this;
        } else if (height > this.rowHeight) {
            console.error('block\'s height is larger than row height');
            return this;
        }
        let boxPosition;
        if (index !== undefined) {
            if (index > this.maxNumber) {
                console.error(`The index ${index} is bigger than ${this.maxNumber}`);
                return this;
            }

            boxPosition = this.getPositionByCoordinate(Math.ceil(index / this.columns) - 1, index % this.columns - 1);
        } else if (row !== undefined && column !== undefined) { // 查询所传坐标位于哪个目标框内
            boxPosition = this.getPositionByCoordinate(row, column);
        }

        const delta = new Vector2((this.columnWidth - width) / 2, (this.rowHeight - height) / 2);
        const targetPosition = boxPosition.add(delta);
        const block = new Block({color, app: this.app, hp, radius, width, height, position: targetPosition, ...rest});
        this.map[`${row}:${column}`] = block;
        this.item.addChild(block.item);
        return this;
    }

    getPositionByCoordinate(row, column) {
        return new Vector2(
            this.padding + (column) * (this.gap + this.columnWidth),
            this.padding + (row) * (this.gap + this.rowHeight),
        );
    }

}
