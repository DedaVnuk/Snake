import './css/snake.css'
import { $ } from './core/Dom';

export class Snake {

  constructor(initialHeadCell) {
    this.initialHeadCell = initialHeadCell
    this.$head = $.create('div', ['snake__head'])

    this.bodyParts = []
    this.headTrace = []

    this.init()
  }
  
  init() {
    this.currentHeadCell = this.initialHeadCell
    
    this.currentHeadCell.append(this.$head)
    this.writeTrace(this.currentHeadCell.dataId())

    let {row, col} = this.currentHeadCell.dataId(true)
    const $cell = $(`[data-id="${++row}:${col}"]`)
    const $bodyPart = $.create('div', ['snake__body-part'])
    $cell.append($bodyPart)
    this.addBodyPart($bodyPart)
  }

  move({row, col}) {
    let {row: currentRow, col: currentCol} = this.currentHeadCell.dataId(true)

    this.writeTrace(`${currentRow}:${currentCol}`)
    this.currentHeadCell = $(`[data-id="${row}:${col}"]`)

    if(!this.currentHeadCell.exists()) {
      throw new Error('Snake not in the field')
    }

    this.currentHeadCell.append(this.$head)

    this.headTrace.forEach((traceId, i) => {
      const $cell = $(`[data-id="${traceId}"]`)
      $cell.append(this.bodyParts[i])
    })

    return this
  }

  eat() {
    this.cells().forEach($cell => {
      const $food = $cell.find('.food')
      if($food.exists()) {
        $food.remove()
        this.addBodyPart()
      }
    })

    return this
  }

  writeTrace(id) {
    this.headTrace.push(id)
    this.headTrace = this.headTrace.slice(-this.bodyParts.length)
  }

  addBodyPart($bodyPart) {
    this.bodyParts.push($bodyPart || $.create('div', ['snake__body-part']))
  }

  cellsIds() {
    return this.cells().map($cell => $cell.dataId())
  }

  cells() {
    const bodyParts = this.bodyParts.map(part => part.parent().exists() && part.parent())
    return [this.currentHeadCell, ...bodyParts].filter(Boolean)
  }

}