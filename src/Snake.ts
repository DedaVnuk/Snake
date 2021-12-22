import './css/snake.css'
import { $, Dom } from './core/Dom';
import { 
  Reducer,
  CellID,
} from './types';

export class Snake {

  private initialHeadCell: Dom
  private $head: Dom
  private bodyParts: Dom[]
  private headTrace: string[]

  private currentHeadCell: Dom

  constructor(initialHeadCell: Dom) {
    this.initialHeadCell = initialHeadCell;
    this.currentHeadCell = initialHeadCell;

    this.$head = $.create('div', ['snake__head']);

    this.bodyParts = [];
    this.headTrace = [];

    this.init();
  }
  
  init() {
    this.currentHeadCell.append(this.$head);
    this.writeTrace(String(this.currentHeadCell.dataId()));

    let {row, col}: CellID = this.currentHeadCell.dataId(true) as CellID;
    const $cell: Dom = $(`[data-id="${Number(row)+1}:${col}"]`);
    const $bodyPart: Dom = $.create('div', ['snake__body-part']);
    $cell.append($bodyPart);
    this.addBodyPart($bodyPart);
  }

  /**
   * @param  {Object} reducer - {param: 'row' || 'col', func - action with param(increment, decrement)} 
   * @return {Snake}
   */
  move(reducer: Reducer) {
    const cell: CellID = this.currentHeadCell.dataId(true) as CellID;
    this.writeTrace(`${cell.row}:${cell.col}`);

    if(reducer) {
      cell[reducer.param] = reducer.func(+cell[reducer.param]).toString();
    }

    this.currentHeadCell = $(`[data-id="${cell.row}:${cell.col}"]`);

    if(!this.currentHeadCell.exists()) {
      throw new Error('Snake not in the field');
    }

    this.currentHeadCell.append(this.$head);

    this.headTrace.forEach((traceId, i) => {
      const $cell = $(`[data-id="${traceId}"]`);
      $cell.append(this.bodyParts[i]);
    })

    return this;
  }

  eat(): Snake {
    this.cells().forEach($cell => {
      const $food: Dom = $cell.find('.food');
      if($food.exists()) {
        $food.remove();
        this.addBodyPart();
      }
    })

    return this;
  }

  writeTrace(id: string): void {
    this.headTrace.push(id);
    this.headTrace = this.headTrace.slice(-this.bodyParts.length);
  }

  addBodyPart($bodyPart?: Dom): void {
    this.bodyParts.push($bodyPart || $.create('div', ['snake__body-part']));
  }

  cellsIds(): string[] {
    return this.cells().map($cell => String($cell.dataId()));
  }

  cells(): Dom[] {
    const bodyParts: Dom[] = this.bodyParts.map(part => {
      const $parent = part.parent();
      return $parent.exists() ? $parent : null!;
    })
    return [this.currentHeadCell, ...bodyParts].filter(Boolean);
  }

}