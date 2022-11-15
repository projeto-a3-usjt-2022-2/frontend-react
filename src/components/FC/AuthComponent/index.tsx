import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../../hooks/useAuthentication";

export const AuthComponent = ({ children }: { children: ReactNode }) => {
  const { userLogged } = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      return navigate("/login");
    }
  }, [userLogged]);

  return <>{children}</>;
};
