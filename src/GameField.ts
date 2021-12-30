import './css/game-field.css';
import { $, Dom } from './core/Dom';

import { CELL_SIDE } from './consts';

export class GameField {

  private $root: Dom;
  private numberOfRows: number;
  private numberOfCols: number;

  private width: number;
  private cellIds: Set<string>;
  private cellsIdsWithFood: string[];

  constructor(selector = '.game-field') {
    this.$root = $(selector);

    this.numberOfRows = Math.floor(this.$root.element.clientHeight / CELL_SIDE);
    this.numberOfCols = Math.floor(this.$root.element.clientWidth / CELL_SIDE);

    this.width = this.numberOfCols * CELL_SIDE;
    this.$root.css('width', this.width + 'px');

    this.$root.css('height', 'auto');

    this.cellIds = new Set();
    this.cellsIdsWithFood = [];
  }

  draw() {
    this.cellIds.clear();
    this.cellsIdsWithFood = [];
    this.$root.clear();

    const cellSideWithPx: string = `${CELL_SIDE}px`;

    for(let rowNumber = 0; rowNumber < this.numberOfRows; rowNumber++) {
      const $row: Dom = $.create('div', ['game-field__row']);

      for(let colNumber = 0; colNumber < this.numberOfCols; colNumber++) {
        const $cell: Dom = $.create('div', ['game-field__cell']);

        const cellId: string = `${rowNumber}:${colNumber}`;
        this.cellIds.add(cellId);


        $cell.css('width', cellSideWithPx);
        $cell.css('height', cellSideWithPx);
        $cell.attr('data-id', cellId);

        $row.append($cell);
      }

      this.$root.append($row);
    }
  }

  getCenterCell(): Dom {
    const row: number = Math.floor(this.numberOfRows / 2);
    const col: number = Math.floor(this.numberOfCols / 2);

    return this.$root.find(`[data-id="${row}:${col}"]`);
  }

  addFood(snakeCells: string[]) {
    const cellsForFood: string[] = [...this.cellIds].filter(id => !snakeCells.includes(id) && !this.cellsIdsWithFood.includes(id));

    if(cellsForFood.length === 0) {
      throw new Error('All cells are busy');
    }

    const randomIdIndex: number = Math.round(Math.random() * (cellsForFood.length-1));
    const id: string = cellsForFood[randomIdIndex];

    if(cellsForFood.includes(id)) {
      this.cellsIdsWithFood.push(id);

      const $cell: Dom = $(`[data-id="${id}"]`);
      $cell.append( $.create('div', ['food']) );
    }
  }

}