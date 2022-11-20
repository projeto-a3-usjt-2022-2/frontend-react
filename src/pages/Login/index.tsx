import { FC, useState } from "react";
import { LoginView } from "../../components/Login/LogInView";
import { SignInView } from "../../components/Login/SignInView";
import style from "./style.module.scss";

export const LoginPage: FC = () => {
  const [isSignView, setIsSignView] = useState(false);

  return (
    <div className={style.loginPage}>
      <section className={style.background}>{/* Background */}</section>
      <section className={style.userView}>
        {isSignView ? (
          <SignInView setSignView={setIsSignView} />
        ) : (
          <LoginView setIsSignView={setIsSignView} />
        )}
      </section>
    </div>
  );
};
