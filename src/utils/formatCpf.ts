export const formatCpf = (cpf: string) => {
  //retira os caracteres indesejados...
  cpf = cpf.trim();
  cpf = cpf.replace(/[^\d]/g, "");

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
