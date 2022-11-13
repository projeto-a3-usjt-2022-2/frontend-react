import React, { ReactNode } from "react";
import { Drawer } from "../Drawer";
import styles from "./style.module.scss";

interface ILayout {
  children: ReactNode;
  title: string;
}
export const Layout: React.FC<ILayout> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{title}</h1>
      </header>
      <aside className={styles.drawer}>
        <Drawer />
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
};
