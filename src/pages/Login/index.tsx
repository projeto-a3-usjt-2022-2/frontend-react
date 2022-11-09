import { FC, useState } from "react";
import { LoginView } from "../../components/Login";
import "./style.scss";

export const LoginPage: FC = () => {
  //let loginName = "joao";

  const [isSignView, setIsSignView] = useState(false);

  return (
    <div className="login-page">
      <section className="background">{/* Background */}a</section>
      <section className="user-view">
        <LoginView />
      </section>
    </div>
  );
};
