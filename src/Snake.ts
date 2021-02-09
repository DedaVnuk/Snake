import './css/snake.css'
import { $ } from './core/Dom';

type CellID = {row: string, col: string, [key: string]: string}

export class Snake {

  private initialHeadCell: any
  private $head: any
  private bodyParts: any[]
  private headTrace: any[]

  private currentHeadCell: any

  constructor(initialHeadCell: any) {
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

    let {row, col}: CellID = this.currentHeadCell.dataId(true)
    const $cell: any = $(`[data-id="${Number(row)+1}:${col}"]`)
    const $bodyPart: any = $.create('div', ['snake__body-part'])
    $cell.append($bodyPart)
    this.addBodyPart($bodyPart)
  }

  /**
   * @param  {Object} reducer - {param: 'row' || 'col', func - action with param(increment, decrement)} 
   * @return {Snake}
   */
  move(reducer: {param: string, func: (val: number) => number}) {
    const cell: CellID = this.currentHeadCell.dataId(true)
    this.writeTrace(`${cell.row}:${cell.col}`)

    if(reducer) {
      cell[reducer.param] = reducer.func(+cell[reducer.param]).toString()
    }

    this.currentHeadCell = $(`[data-id="${cell.row}:${cell.col}"]`)

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

  eat(): Snake {
    this.cells().forEach($cell => {
      const $food: any = $cell.find('.food')
      if($food.exists()) {
        $food.remove()
        this.addBodyPart()
      }
    })

    return this
  }

  writeTrace(id: string): void {
    this.headTrace.push(id)
    this.headTrace = this.headTrace.slice(-this.bodyParts.length)
  }

  addBodyPart($bodyPart?: any): void {
    this.bodyParts.push($bodyPart || $.create('div', ['snake__body-part']))
  }

  cellsIds(): any[] {
    return this.cells().map($cell => $cell.dataId())
  }

  cells(): any[] {
    const bodyParts: any[] = this.bodyParts.map(part => {
      const $parent = part.parent()
      return $parent.exists() ? $parent : null
    })
    return [this.currentHeadCell, ...bodyParts].filter(Boolean)
  }

}