import React from "react";
import styles from "./style.module.scss";
import ErrorImage from "../../assets/img/page_not_found.png";
import { Link } from "react-router-dom";

export const PageError: React.FC = () => {
  return (
    <div className={styles.container}>
      <main>
        <h1>Página não encontrada</h1>
        <img
          src={ErrorImage}
          alt="image representando que a página não foi encontrada"
        />

        <Link className={styles.link} to="/">
          Voltar a página inicial
        </Link>
      </main>
    </div>
  );
};
