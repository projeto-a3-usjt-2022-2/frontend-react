import axios from "axios";

export const getCepInfo = async (cep: string) => {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  return { street: data.logradouro, district: data.bairro, cep: data.cep };
};
