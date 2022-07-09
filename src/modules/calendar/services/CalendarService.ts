import axios, { AxiosRequestHeaders } from "axios";

class CalendarService {
  private headers: AxiosRequestHeaders = {};

  async getSerialsByMonthAndYear(month: number, year: number) {
    const { data } = await axios({
      method: "GET",
      url: `${process.env.VUE_APP_API_URL}/api/episodes/${year}/${month + 1}`,
      headers: this.headers,
    });
    return data.episodes;
  }
}

const calendarService = new CalendarService();
export default calendarService;
