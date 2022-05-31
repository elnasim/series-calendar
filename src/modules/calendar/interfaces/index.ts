export type TCalendar = Array<Array<TDay>>;

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

export interface ISerial {
  id: number;
  title: string;
  img: string;
  episodes: ISerialEpisode[];
}

export interface ISerialEpisode {
  id: number;
  title: string;
  month: string;
  year: string;
}
