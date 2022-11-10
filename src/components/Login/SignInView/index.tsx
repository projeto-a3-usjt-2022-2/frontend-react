import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { createUser, IUserInfo } from "../../../services/POST/createUser";
import { toast } from "react-toastify";
import style from "./style.module.scss";

interface ISignInView {
  setSignView: any;
}

export const SignInView: React.FC<ISignInView> = ({ setSignView }) => {
  const [userInfo, setUserInfo] = useState<{} | IUserInfo>({});

  const userInfoOptions = [
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
      type: "input",
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

  const logInfo = [
    {
      type: "input",
      label: "Email",
      keyName: "email",
    },
    {
      type: "input",
      label: "password",
      keyName: "password",
    },
    {
      type: "input",
      label: "Confirme sua senha",
      keyName: "confirmPassword",
    },
  ];

  const onSubmitUser = async (event: any) => {
    event.preventDefault();

    if (verifyPassword()) {
      toast.promise(
        async () => {
          let response = await createUser(userInfo as IUserInfo);
        },
        {
          error: "Erro ao criar o usuário",
          pending: "Enviando informações para o servidor",
          success: "Sucesso ao criar o usuário",
        }
      );
    } else {
      toast.error("As senhas não conferem");
    }
  };

  const verifyPassword = () => {
    //@ts-ignore
    return userInfo.password === userInfo.confirmPassword;
  };

  return (
    <div className={style.signIn}>
      <form onSubmit={(event) => onSubmitUser(event)}>
        <section>
          <h3>Dados de usuário</h3>
          <ul>
            {userInfoOptions.map((item) => {
              if (item.type === "input")
                return (
                  <article className={style.inputStyle}>
                    <label>{item.label}</label>
                    <input
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
                  <article className={style.inputStyle}>
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
          </ul>
        </section>

        <section>
          <h3>Dados de cadastro</h3>

          <ul className={style.signInSection}>
            {logInfo.map((item) => (
              <article className={style.inputStyle}>
                <label>{item.label}</label>
                <input
                  type={item.keyName === "email" ? "email" : "text"}
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
          <p>Entrar</p>
          <AiOutlineLogin />
        </button>
      </form>
      {/* <button onClick={() => setSignView(false)}>Voltar</button> */}
    </div>
  );
};
