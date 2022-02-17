type NoticeChainItem = {
  html: string;
  delay?: number;
}

type NoticeCallbackType = (notification: NoticeChainItem[] | string, delay?: number) => void;

export {
  NoticeChainItem,
  NoticeCallbackType,
};
