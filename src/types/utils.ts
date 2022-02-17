type ElementAttrValueType = string | number | boolean;

type Func<T, S = T> = (...args: T[]) => S;

type EventHandler = Func<Event, void>;

export {
  ElementAttrValueType,
  EventHandler,
  Func,
};
