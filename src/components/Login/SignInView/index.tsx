import React, { useEffect, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { createUser, IUserInfo } from "../../../services/POST/createUser";
import { toast } from "react-toastify";

import globalHealth from "../../../global/healthOptions.json";
import global from "../../../app/global.module.scss";
import style from "./style.module.scss";
import { ScheduleDoctorOptions } from "../../FC/ScheduleDoctorOptions";
import { Switch } from "evergreen-ui";
import { formatCpf } from "../../../utils/formatCpf";
import { getFormErrors } from "./preventError";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";

interface ISignInView {
  setSignView: any;
}

type IUserInfoOptions = {
  type: string;
  label: string;
  keyName: any;
  options?: string[];
}[];
export const SignInView: React.FC<ISignInView> = ({ setSignView }) => {
  const { userLogged, status } = useAuthentication();
  const [isDoctor, setIsDoctor] = useState(false);
  const [hoursSelected, setHoursSelected] = useState<[] | string[]>([]);
  const signInForm = document.getElementById(
    "register-form"
  ) as HTMLFormElement;

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: "",
    birthDate: "",
    clinic: "",
    cpf: "",
    crm: null,
    email: "",
    lastName: "",
    password: "",
    sex: "",
    doctorSchedule: [""],
    modality: "",
  });

  const userInfoOptions: IUserInfoOptions = [
    {
      type: "input",
      label: "Nome",
      keyName: "name",
    },
    {
      type: "input",
      label: "Sobrenome",
      keyName: "lastName",
    },
    {
      type: "input",
      label: "CPF",
      keyName: "cpf",
    },
    {
      type: "date",
      label: "Data de Nascimento",
      keyName: "birthDate",
    },
    {
      type: "select",
      label: "sexo",
      keyName: "sex",
      options: ["Selecionar", "Masculino", "Feminino"],
    },
    {
      type: "select",
      label: "Clínicas médicas",
      keyName: "clinic",
      options: ["Selecionar", "Albert Einstein Morumbi"],
    },
  ];

  const doctorOptions = [
    {
      type: "select",
      label: "Modalidade",
      keyName: "modality",
      options: globalHealth.modalities,
    },
    {
      type: "inpit",
      label: "CRM",
      keyName: "crm",
    },
  ];

  const logInfo = [
    {
      type: "email",
      label: "Email",
      keyName: "email",
    },
    {
      type: "password",
      label: "password",
      keyName: "password",
    },
    {
      type: "password",
      label: "Confirme sua senha",
      keyName: "confirmPassword",
    },
  ];

  const onSubmitUser = async (event: any) => {
    event.preventDefault();

    let tmpUserInfo = { ...userInfo, doctorSchedule: hoursSelected };

    let errors = getFormErrors(tmpUserInfo, isDoctor);

    if (!errors) {
      toast.promise(
        async () => {
          let { data } = await createUser({
            ...tmpUserInfo,
            birthDate: new Date(userInfo.birthDate).toISOString(),
          });

          sessionStorage.setItem("@USER_CREDENTIALS", JSON.stringify(data));
          return navigate("/");
        },
        {
          error: "Erro ao criar o usuário",
          pending: "Enviando informações para o servidor",
          success: "Sucesso ao criar o usuário",
        }
      );
    }
  };

  const toggleTypeUser = (checked: boolean) => {
    setIsDoctor(checked);
  };

  useEffect(() => {
    setUserInfo({
      name: "",
      birthDate: "",
      clinic: "",
      cpf: "",
      crm: null,
      email: "",
      lastName: "",
      password: "",
      sex: "",
      doctorSchedule: null,
      modality: "",
    });
    if (signInForm) {
      signInForm.reset();
    }
  }, [isDoctor]);

  console.log(userLogged, status);

  return (
    <div className={style.signIn}>
      <form onSubmit={(event) => onSubmitUser(event)} id="register-form">
        <section>
          <header>
            <h3>Cadastro de usuário</h3>

            <aside className={style.toggleSwitch}>
              <p>{isDoctor ? "Médico" : "Paciente"}</p>
              <Switch
                checked={isDoctor}
                onChange={(e) => toggleTypeUser(e.target.checked)}
              />
            </aside>
          </header>
          <ul>
            {userInfoOptions.map((item) => {
              let keyName = item.keyName as keyof typeof userInfo;
              if (item.type !== "select")
                return (
                  <article className={global.inputStyle}>
                    <label>{item.label}</label>
                    <input
                      type={item.type}
                      //@ts-ignore
                      value={userInfo[keyName]}
                      id={item.keyName + "signIn"}
                      onChange={(event: any) => {
                        let inputValue = event.target.value;

                        if (item.keyName === "cpf") {
                          inputValue = formatCpf(event.target.value);
                        }

                        setUserInfo({
                          ...userInfo,
                          [item.keyName]: inputValue,
                        });
                      }}
                      maxLength={item.keyName === "cpf" ? 14 : undefined}
                      required
                    />
                  </article>
                );
              else
                return (
                  <article className={global.selectStyle}>
                    <label>{item.label}</label>
                    <select
                      onChange={(event: any) => {
                        setUserInfo({
                          ...userInfo,
                          [item.keyName]: event.target.value,
                        });
                      }}
                    >
                      {item.options!.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                  </article>
                );
            })}
            {isDoctor && (
              <>
                {doctorOptions.map((item) => {
                  if (item.type !== "select")
                    return (
                      <article className={global.inputStyle}>
                        <label>{item.label}</label>
                        <input
                          type={item.type}
                          //@ts-ignore
                          value={userInfo.keyName}
                          id={item.keyName + "signIn"}
                          required
                          onChange={(event: any) => {
                            setUserInfo({
                              ...userInfo,
                              [item.keyName]: event.target.value,
                            });
                          }}
                        />
                      </article>
                    );
                  else
                    return (
                      <article className={global.selectStyle}>
                        <label>{item.label}</label>
                        <select
                          onChange={(event: any) => {
                            setUserInfo({
                              ...userInfo,
                              [item.keyName]: event.target.value,
                            });
                          }}
                        >
                          {item.options!.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </select>
                      </article>
                    );
                })}
              </>
            )}
            {isDoctor && (
              <div className={style.doctorSchedule}>
                <ScheduleDoctorOptions
                  hoursSelected={hoursSelected}
                  setHoursSelected={setHoursSelected}
                />
              </div>
            )}
          </ul>
        </section>

        <section>
          <h3>Dados de cadastro</h3>

          <ul className={style.signInSection}>
            {logInfo.map((item) => (
              <article className={global.inputStyle}>
                <label>{item.label}</label>
                <input
                  type={item.type}
                  //@ts-ignore
                  value={userInfo.keyName}
                  id={item.keyName + "signIn"}
                  onChange={(event: any) => {
                    setUserInfo({
                      ...userInfo,
                      [item.keyName]: event.target.value,
                    });
                  }}
                  required
                />
              </article>
            ))}
          </ul>
        </section>
        <button type="submit" className={style.signInButton}>
          <p>Cadastrar-se</p>
          <AiOutlineLogin />
        </button>

        <button className={style.backButton} onClick={() => setSignView(false)}>
          Voltar
        </button>
      </form>
    </div>
  );
};
