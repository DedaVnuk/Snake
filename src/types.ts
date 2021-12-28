type NoticeCallbackType = (html: string, delay?: number) => void;

type Reducer = {func: (val: number) => number, param: string};

type CellID = {[key: string]: string};

type ElementAttrValueType = string|number|boolean;

export {
  NoticeCallbackType,
  Reducer,
  CellID,
  ElementAttrValueType,
};