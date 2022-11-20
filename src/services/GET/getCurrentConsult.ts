import { API } from "../api";

export const getCurrentConsult = async () => {
  try {
    let res = await API.get("/currentConsult");

    return res.data;
  } catch (err) {
    throw new Error();
  }
};
