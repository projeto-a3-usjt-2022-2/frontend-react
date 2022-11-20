import React, { useEffect, useState } from "react";
import { Layout } from "../../components/FC/Layout";
import { ConsultCard } from "../../components/Home/ConsultCard";
import { getCurrentConsult } from "../../services/GET/getCurrentConsult";
import styles from "./style.module.scss";

export const Queue: React.FC = () => {
  const [consult, setConsult] = useState<any>(null);

  useEffect(() => {
    getConsultByQueue();
  }, []);

  const getConsultByQueue = async () => {
    let data = await getCurrentConsult();

    data = JSON.parse(data);
    setConsult(data);
  };

  console.log(consult);

  return (
    <Layout title={`Fila de consultas`}>
      <div className={styles.container}>
        <section className={styles.bgSection} />
        <main className={styles.main}>
          <h3>Consulta Atual</h3>

          {consult ? (
            <div className={styles.cardContainer}>
              <ConsultCard {...consult} />
            </div>
          ) : (
            <h4>Sem consultas na fila</h4>
          )}

          {/* {consults.length > 0 ? (
            <ul>
              {consults.map((card) => (
              ))}
            </ul>
          ) : (
            <div>Sem consultas até o momento :(</div>
          )} */}
        </main>
      </div>
    </Layout>
  );
};
