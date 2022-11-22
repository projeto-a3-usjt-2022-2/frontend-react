import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IParams, userLogin } from "../../../services/POST/userLogIn";
import { formatCpf } from "../../../utils/formatCpf";
import style from "./style.module.scss";

interface ILoginView {
  setIsSignView: any;
}

export const LoginView: React.FC<ILoginView> = ({ setIsSignView }) => {
  const [userInfo, setUserInfo] = useState<IParams>({
    credential: "",
    password: "",
  });
  const navigate = useNavigate();

  const submitInfo = async (event: any) => {
    event.preventDefault();

    toast.promise(
      async () => {
        let response = await userLogin(userInfo);

        sessionStorage.setItem(
          "@USER_CREDENTIALS",
          JSON.stringify(response.data)
        );

        return navigate("/");
      },
      {
        error: "Verifique suas credenciais e tente novamente",
        pending: "Enviando...",
        success: "Logado com sucesso",
      }
    );
  };

  return (
    <>
      <main className={style.loginView}>
        <header>
          <img src={""} />
          <h2>Guilhermina Clinicas</h2>
        </header>

        <form id="login-form" className={style.loginForm} onSubmit={submitInfo}>
          <section>
            <article>
              <label htmlFor="credential-login">Logar com CPF</label>
              <input
                type="text"
                id="credential-login"
                onChange={(event) => {
                  let formattedCpf = formatCpf(event.target.value);

                  setUserInfo({ ...userInfo, credential: formattedCpf });
                }}
                value={userInfo.credential}
                maxLength={14}
                required
              />
            </article>

            <article>
              <label htmlFor="password-login">Senha</label>
              <input
                id="password-login"
                type="password"
                onChange={(event) => {
                  setUserInfo({ ...userInfo, password: event.target.value });
                }}
                required
              />
            </article>
            <button type="submit">
              <p>Entrar</p>
              <AiOutlineLogin />
            </button>
          </section>
        </form>

        <footer className={style.footerLogin}>
          <p>Não possui conta? </p>
          <button onClick={() => setIsSignView(true)}>Cadastre-se</button>
        </footer>
      </main>
    </>
  );
};
