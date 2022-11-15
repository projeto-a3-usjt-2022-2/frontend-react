import { toast } from "react-toastify";

export const getFormErrors = (formValue: any, isDoctor: boolean) => {
  let userError = getUserError(formValue);

  let isDoctorError: boolean = false;
  if (isDoctor) {
    isDoctorError = getDoctorErrors(formValue);
  }

  return userError !== false && isDoctorError !== false;
};

const getUserError = (formValue: any) => {
  if (formValue.password !== formValue.confirmPassword) {
    toast.error("As senhas não conferem");
    return true;
  } else if (!formValue.sex || formValue.sex === "Selecionar") {
    toast.error("Escolha pelo menos um sexo");
    return true;
  } else if (!formValue.clinic || formValue.clinic === "Selecionar") {
    toast.error("Escola uma clínica");
    return true;
  } else if (!formValue.clinic || formValue.clinic === "Selecionar") {
    toast.error("Escolha uma clínica");
    return true;
  } else return false;
};

const getDoctorErrors = (formValue: any) => {
  if (!formValue.crm) {
    toast.error("CRM é um dado obrgiatório!");
    return true;
  } else if (formValue.doctorSchedule.length === 0) {
    toast.error("Escolha pelo menos um horário de atuação");
    return true;
  } else if (!formValue.modality) {
    toast.error("Escolha a modalidade");
    return true;
  } else return false;
};
