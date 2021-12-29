type NoticeChainItem = {
  html: string;
  delay?: number;
}

type NoticeCallbackType = (notification: NoticeChainItem[]|string, delay?: number) => void;

type Reducer = {func: (val: number) => number, param: string};

type CellID = {
  row: string;
  col: string;
};

type ElementAttrValueType = string|number|boolean;

export {
  NoticeCallbackType,
  NoticeChainItem,
  Reducer,
  CellID,
  ElementAttrValueType,
};