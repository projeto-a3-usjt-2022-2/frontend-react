import { API } from "../../api";

interface IParams {
  clinic: string;
  userId: string;
  crm: string | null;
}

export const allConsultsById = async (bodyParams: IParams) => {
  try {
    let { data } = await API.post("/consults", bodyParams);

    return data;
  } catch {
    throw new Error();
  }
};
