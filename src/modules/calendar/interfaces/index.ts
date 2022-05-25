export type TCalendar = Array<Array<TDay>> | null;

export type TDay = IDay | null;

export interface IDay {
  dayInfo: IDayInfo;
  content: Array<IContentItem>;
}

export interface IDayInfo {
  dayIndex: number;
}

export interface IContentItem {
  id: number;
  title: string;
  img: string;
}
