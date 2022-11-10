import { API } from "../../api";

export type IParams = { credential: string; password: string };

export const userLogin = async ({ credential, password }: IParams) => {
  try {
    let response = await API.post("/login", { credential, password });

    return response.data;
  } catch (err) {
    throw new Error();
  }
};
