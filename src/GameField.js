import './css/game-field.css'
import { $ } from './core/Dom';

const CELL_SIDE = 30

export class GameField {

  constructor(selector = '.game-field') {
    this.$root = $(selector)

    this.numberOfRows = Math.floor(this.$root.$el.clientHeight / CELL_SIDE)
    this.numberOfCols = Math.floor(this.$root.$el.clientWidth / CELL_SIDE)

    this.width = this.numberOfCols * CELL_SIDE 
    this.$root.css('width', this.width + 'px')

    this.height = this.numberOfRows * CELL_SIDE
    this.$root.css('height', 'auto')

    this.cellIds = new Set()
    this.cellsIdsWithFood = []
  }

  draw() {
    this.$root.clear()
    const cellSideWithPx = `${CELL_SIDE}px`

    for(let rowNumber = 0; rowNumber < this.numberOfRows; rowNumber++) {
      const $row = $.create('div', ['game-field__row'])

      for(let colNumber = 0; colNumber < this.numberOfCols; colNumber++) {
        const $cell = $.create('div', ['game-field__cell'])

        const cellId = `${rowNumber}:${colNumber}`
        this.cellIds.add(cellId)

        $cell.css('width', cellSideWithPx)
          .css('height', cellSideWithPx)
          .attr('data-id', cellId)

        $row.append($cell)
      }

      this.$root.append($row)
    }
  }

  getCenterCell() {
    const row = Math.floor(this.numberOfRows / 2)
    const col = Math.floor(this.numberOfCols / 2)

    return this.$root.find(`[data-id="${row}:${col}"]`)
  }

  addFood(snakeCells) {
    const cellsForFood = [...this.cellIds].filter(id => !snakeCells.includes(id) && !this.cellsIdsWithFood.includes(id))

    if(cellsForFood.length === 0) {
      throw new Error('All cells are busy')
    }

    const randomIdIndex = Math.round(Math.random() * (cellsForFood.length-1))
    const id = cellsForFood[randomIdIndex]

    if(cellsForFood.includes(id)) {
      this.cellsIdsWithFood.push(id)

      const $cell = $(`[data-id="${id}"]`)
      $cell.append( $.create('div', ['food']) )
    }
  }

}