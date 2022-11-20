import { API } from "../../api";

interface IAvaliableSchedule {
  doctorId: string;
  clinic: string;
  doctorSchedule: any[];
  date: string;
}

export const avaliableSchedule = async (params: IAvaliableSchedule) => {
  try {
    let { data } = await API.post("/doctorSchedule", params);

    return data;
  } catch (err: any) {
    throw new Error();
  }
};
