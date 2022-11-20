import React, { Dispatch, SetStateAction } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

interface ISuccessCreate {
  setIsSuccesCreate: Dispatch<SetStateAction<boolean>>;
}
export const SuccessCreate: React.FC<ISuccessCreate> = ({
  setIsSuccesCreate,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <section>
        <BsPatchCheckFill />
        <h2>Consulta criada com sucesso!</h2>

        <button className={styles.consultPage} onClick={() => navigate("/")}>
          Visualizar minhas consultas
        </button>
        <button
          className={styles.newConsult}
          onClick={() => setIsSuccesCreate((prev) => !prev)}
        >
          Adicionar nova consulta
        </button>
      </section>
    </div>
  );
};
