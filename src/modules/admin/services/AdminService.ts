import { ISerial, ISerialEpisode } from "@/modules/calendar/types";
import axios from "axios";
import { BaseService } from "@/modules/common/services/BaseService";

class AdminService extends BaseService {
  public async getAllSerials(): Promise<ISerial[]> {
    const { data } = await axios(`http://localhost:3000/api/serials`);
    return data;
  }

  public async getSerialById(id: string): Promise<ISerial> {
    const { data } = await axios(`http://localhost:3000/api/serials/${id}`);
    return data;
  }

  public async updateSerialById(
    id: string,
    payload: { title: string; img: string }
  ): Promise<ISerial> {
    const { data } = await axios.patch(
      `http://localhost:3000/api/serials/${id}`,
      payload
    );
    return data;
  }

  public async removeSerialById(id: number): Promise<boolean> {
    const { data } = await axios.delete(
      `http://localhost:3000/api/serials/${id}`
    );
    return data;
  }

  public async addSerial(title: string, img: string): Promise<ISerial> {
    const { data } = await axios({
      method: "POST",
      url: "http://localhost:3000/api/serials",
      data: {
        title: title,
        img: img,
      },
    });
    return data;
  }

  public async addEpisodes(
    serialId: number,
    payload: ISerialEpisode[]
  ): Promise<ISerial> {
    const { data } = await axios({
      method: "POST",
      url: `http://localhost:3000/api/episodes?serialId=${serialId}`,
      data: payload,
    });
    return data;
  }

  public async updateEpisodes(payload: ISerialEpisode[]): Promise<boolean> {
    const { data } = await axios({
      method: "PATCH",
      url: `http://localhost:3000/api/episodes`,
      data: payload,
    });
    return data;
  }

  public async removeEpisodes(payload: number[]): Promise<boolean> {
    const { data } = await axios({
      method: "DELETE",
      url: `http://localhost:3000/api/episodes`,
      data: payload,
    });
    return data;
  }
}

const adminService = new AdminService();
export default adminService;
