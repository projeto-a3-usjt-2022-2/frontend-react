import React from "react";
import { Layout } from "../../components/FC/Layout";
import style from "./style.module.scss";
const nome = "Leonardo";
export const User: React.FC = () => {
  return (
    <Layout title={`Bem vindo,${nome}`}>
      <div className={style.container}>
        <section className={style.bgSection} />
        <section>s</section>
      </div>
    </Layout>
  );
};
