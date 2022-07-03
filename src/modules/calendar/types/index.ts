export type TCalendar = Array<Array<TDay>>;

export type TDay = IDay | null;

export interface IDay {
  dayInfo: IDayInfo;
  content: Array<ISerialEpisodeWithSerialInfo>;
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
  episodes?: ISerialEpisode[];
}

export interface ISerialEpisode {
  id?: number;
  title: string;
  day: number;
  month: MonthsEnum;
  year: number;
}

export interface ISerialEpisodeWithSerialInfo {
  id: number;
  title: string;
  date: Date;
  serial: {
    id: number;
    title: string;
    img: string;
  };
}

export enum MonthsEnum {
  "January" = 0,
  "February" = 1,
  "March" = 2,
  "April" = 3,
  "May" = 4,
  "June" = 5,
  "July" = 6,
  "August" = 7,
  "September" = 8,
  "October" = 9,
  "November" = 10,
  "December" = 11,
}
