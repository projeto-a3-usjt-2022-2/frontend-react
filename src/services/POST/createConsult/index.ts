import { API } from "../../api";

interface IParams {
  clinic: string;
  modality: string;
  date: string;
  hour: string;
  doctorId: string;
  userId: string;
}
export const createConsult = async (params: IParams) => {
  try {
    let { data, status } = await API.post("/createConsult", params);
    return { data, status };
  } catch (error) {
    throw new Error();
  }
};
