import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
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

  const submitInfo = async (event: any) => {
    event.preventDefault();

    toast.promise(
      async () => {
        let response = await userLogin(userInfo);

        console.log(response.data);

        return response;
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
              <label htmlFor="credential-login">CPF ou CRM</label>
              <input
                type="text"
                id="credential-login"
                onChange={(event) => {
                  let formattedCpf = formatCpf(event.target.value);

                  console.log(formattedCpf);

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
                type="text"
                id="password-login"
                onChange={(event) => {
                  setUserInfo({ ...userInfo, password: event.target.value });
                }}
                required
              />
            </article>
          </section>

          <button type="submit">
            <p>Entrar</p>
            <AiOutlineLogin />
          </button>
        </form>
      </main>
      <footer className={style.footerLogin}>
        <article>
          <p>Não possui conta? </p>
          <button onClick={() => setIsSignView(true)}>Cadastre-se</button>
        </article>

        <article>
          <button>Esqueci minha senha</button>
        </article>
      </footer>
    </>
  );
};
