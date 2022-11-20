import React, { ReactNode } from "react";
import { Drawer } from "../Drawer";
import styles from "./style.module.scss";
import Logout from "../../../assets/img/logout.png";
import Vector from "../../../assets/img/Vector.png";

interface ILayout {
  children: ReactNode;
  title: string;
}
export const Layout: React.FC<ILayout> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{title}</h1>
        <div className={styles.homeButtons}>
          <a href="/login">
            <img src={Vector} alt="config" />
          </a>
          <button
            onClick={() => sessionStorage.removeItem("@USER_CREDENTIALS")}
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
