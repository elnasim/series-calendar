import { defineStore } from "pinia";

export interface ICalendarStore {
  currentUserDate: Date;
  changedDate: Date;
}

export const useCalendarStore = defineStore("calendar", {
  state: (): ICalendarStore => ({
    currentUserDate: new Date(),
    changedDate: new Date(),
  }),
  getters: {
    getCurrentUserDate(state): Date | null {
      return state.currentUserDate;
    },
  },
  actions: {
    setCurrentUserDate() {
      this.currentUserDate = new Date();
      this.setChangedDate(this.currentUserDate);
    },
    setChangedDate(date: Date) {
      this.changedDate = date;
    },
    setNextMonth() {
      this.changedDate = new Date(
        this.changedDate.getFullYear(),
        this.changedDate.getMonth() + 1
      );
    },
    setPrevMonth() {
      this.changedDate = new Date(
        this.changedDate.getFullYear(),
        this.changedDate.getMonth() - 1
      );
    },
  },
});
