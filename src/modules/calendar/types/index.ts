export type TCalendar = TDay[][];

export type TDay = IDay | null;

export interface IDay {
  dayInfo: IDayInfo;
  content: Array<ISerialEpisodeWithSerialInfo>;
}

export interface IDayInfo {
  dayIndex: number;
}

export interface ISerialEpisodeWithSerialInfo {
  id: number;
  title: string;
  serial_id: number;
  season: number;
  episode_number: number;
  is_last_season_episode: number;
  date: Date;
  serial: {
    id: number;
    title: string;
    img: string;
    imdb: number;
    kinopoisk: number;
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
