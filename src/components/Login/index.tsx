import React, { useState } from "react";
import "./style.scss";

export const LoginView: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    credential: "",
    password: "",
  });

  const submitInfo = (event: any) => {
    event.preventDefault();
    console.log(userInfo);
  };
  return (
    <main className="container-loginview">
      <header>
        <img src={""} />
        <h2>Guilhermina Clinicas</h2>
      </header>

      <form id="login-form" className="login-form" onSubmit={submitInfo}>
        <section>
          <article>
            <label htmlFor="credential-login">CPF ou CRM</label>
            <input
              type="text"
              id="credential-login"
              onChange={(event) => {
                setUserInfo({ ...userInfo, credential: event.target.value });
              }}
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
            />
          </article>
        </section>

        <button type="submit">Entrar</button>
      </form>
    </main>
  );
};
