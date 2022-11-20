import { API } from "../../api";

export const sendConsultToQueue = async (consult: any) => {
  try {
    console.log(consult);

    await API.post("/addConsultQueue", { consult: JSON.stringify(consult) });
  } catch (err) {
    throw new Error();
  }
};
