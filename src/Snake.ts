import './css/snake.css';
import { $, Dom } from './core/Dom';
import { Cell, CellID } from './types/Cell';
import { Reducer } from './types/Reducer';

export class Snake {

  private $head: Dom;
  private bodyParts: Dom[];
  private headTrace: CellID[];

  private currentHeadCell: Dom;

  constructor(initialHeadCell: Dom) {
    this.currentHeadCell = initialHeadCell;

    this.$head = $.create('div', ['snake__head']);

    this.bodyParts = [];
    this.headTrace = [];

    this.init();
  }
  
  private init(): void {
    this.currentHeadCell.append(this.$head);
    this.writeTrace(this.currentHeadCell.dataId());

    const {row, col} = this.currentHeadCell.dataId<Cell>(true);
    const $cell: Dom = $(`[data-id="${Number(row)+1}:${col}"]`);
    const $bodyPart: Dom = $.create('div', ['snake__body-part']);
    $cell.append($bodyPart);
    this.addBodyPart($bodyPart);
  }

  get head(): Dom {
    return this.$head;
  }

  move(reducer: Reducer): Snake {
    const cell = this.currentHeadCell.dataId<Cell>(true);
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
    });

    return this;
  }

  eat(): Snake {
    this.cells().forEach($cell => {
      const $food: Dom = $cell.find('.food');
      if($food.exists()) {
        $food.remove();
        this.addBodyPart();
      }
    });

    return this;
  }

  private writeTrace(id: CellID): void {
    this.headTrace.push(id);
    this.headTrace = this.headTrace.slice(-this.bodyParts.length);
  }

  private addBodyPart($bodyPart?: Dom): void {
    this.bodyParts.push($bodyPart || $.create('div', ['snake__body-part']));
  }

  cellsIds(): CellID[] {
    return this.cells().map(($cell: Dom) => $cell.dataId());
  }

  private cells(): Dom[] {
    const bodyParts: (Dom | null)[] = this.bodyParts.map((bodyPart: Dom) => {
      const $parent: Dom = bodyPart.parent();
      return $parent.exists() ? $parent : null;
    });
    return [this.currentHeadCell, ...bodyParts].filter(Boolean) as Dom[];
  }

}