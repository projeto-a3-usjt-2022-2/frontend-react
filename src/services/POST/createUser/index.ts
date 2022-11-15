import { API } from "../../api";

export type IUserInfo = {
  name: string;
  lastName: string;
  birthDate: string; // needs to be into toISOString;
  sex: string;
  cpf: string;
  crm: null | string;
  email: string;
  password: string;
  clinic: string;
  modality?: string | null;
  doctorSchedule?: string[] | null;
};

export const createUser = async (params: IUserInfo) => {
  try {
    let response = await API.post("/createUser", params);

    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
