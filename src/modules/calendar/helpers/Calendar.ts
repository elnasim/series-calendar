import { TCalendar } from "../interfaces";

class Calendar {
  public calendarStructure: TCalendar = [];

  public getMonthByIndex(monthIndex: number): string {
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

  public isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  public getDaysInMonth(month: number, year: number): number {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 1 && this.isLeapYear(year)) {
      return 29;
    }

    return months[month];
  }

  public getDaysOffset(date: Date): number {
    const startDay = date.getDay();
    return [6, 0, 1, 2, 3, 4, 5][startDay];
  }

  public calendarGenerate(date: Date) {
    date.setDate(1);
    const month = date.getMonth();
    const year = date.getFullYear();
    let iterableDay = 1;
    // const weeksInMonth =
    //   (this.daysInMonth(month, year) + this.daysOffset(date)) / 7;

    for (let week = 0; week < 6; week++) {
      this.calendarStructure[week] = [];

      for (let day = 0; day < 7; day++) {
        if (
          (week === 0 && day < this.getDaysOffset(date)) ||
          iterableDay > this.getDaysInMonth(month, year)
        ) {
          this.calendarStructure[week][day] = null;
        } else {
          this.calendarStructure[week][day] = {
            dayInfo: { dayIndex: iterableDay },
            content: [],
          };

          iterableDay++;
        }
      }
    }
  }

  public contentToCalendar() {}

  public getCalendar(date: Date) {
    this.calendarGenerate(date);
    return this.calendarStructure;
  }
}

const calendar = new Calendar();
export default calendar;
