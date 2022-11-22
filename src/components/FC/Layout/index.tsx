import React, { ReactNode } from "react";
import { Drawer } from "../Drawer";
import styles from "./style.module.scss";
import Logout from "../../../assets/img/logout.png";
import Vector from "../../../assets/img/Vector.png";
import { redirect, useNavigate } from "react-router-dom";

interface ILayout {
  children: ReactNode;
  title: string;
}
export const Layout: React.FC<ILayout> = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{title}</h1>
        <div className={styles.homeButtons}>
          <button
            onClick={() => {
              sessionStorage.removeItem("@USER_CREDENTIALS");
              navigate("/login");
            }}
          >
            <img src={Logout} alt="logout" />
          </button>
        </div>
      </header>
      <aside className={styles.drawer}>
        <Drawer />
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
};
