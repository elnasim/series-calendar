import { TCalendar } from "../interfaces";

class Calendar {
  public static getMonthByIndex(monthIndex: number): string {
    const monthByIndex = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    return monthByIndex[monthIndex];
  }

  public static leapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  public static daysInMonth(month: number, year: number): number {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 1 && this.leapYear(year)) {
      return 29;
    }

    return months[month];
  }

  public static daysOffset(date: Date): number {
    const startDay = date.getDay();
    return [6, 0, 1, 2, 3, 4, 5][startDay];
  }

  public static calenarGenerate(month: number, year: number): TCalendar {
    const res: TCalendar = [];
    const date = new Date(year, month);
    const weeksInMonth =
      (this.daysInMonth(month, year) + this.daysOffset(date)) / 7;
    let iterableDay = 1;

    for (let week = 0; week < weeksInMonth; week++) {
      res[week] = [];

      for (let day = 0; day < 7; day++) {
        if (
          (week === 0 && day < this.daysOffset(date)) ||
          iterableDay > this.daysInMonth(month, year)
        ) {
          res[week][day] = null;
        } else {
          if (iterableDay === 1) {
            res[week][day] = {
              dayInfo: { dayIndex: iterableDay },
              content: [
                {
                  id: 1,
                  title: "название",
                  img: "https://appleinsider.ru/wp-content/uploads/2020/11/google_photos_service_limit.jpg",
                },
              ],
            };
          } else {
            res[week][day] = {
              dayInfo: { dayIndex: iterableDay },
              content: [],
            };
          }

          iterableDay++;
        }
      }
    }

    return res;
  }
}

export default Calendar;
