import { API } from "../api";

interface IParams {
  clinic: string;
  modality?: string;
}

export const getDoctors = async ({ clinic, modality }: IParams) => {
  try {
    let { data } = await API.get(
      `/doctors?clinic=${clinic}&modality=${modality}`
    );

    return data;
  } catch (err: any) {
    throw new Error();
  }
};
