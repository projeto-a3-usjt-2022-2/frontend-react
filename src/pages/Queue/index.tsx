import React, { useEffect, useState } from "react";
import { Layout } from "../../components/FC/Layout";
import { ConsultCard } from "../../components/Home/ConsultCard";
import { getCurrentConsult } from "../../services/GET/getCurrentConsult";
import styles from "./style.module.scss";

export const Queue: React.FC = () => {
  const [consult, setConsult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getConsultByQueue();
    setLoading(false);
  }, []);

  const getConsultByQueue = async () => {
    let data = await getCurrentConsult();

    data = JSON.parse(data);
    setConsult(data);
  };

  return (
    <Layout title={`Fila de consultas`}>
      <div className={styles.container}>
        <section className={styles.bgSection} />
        <main className={styles.main}>
          <h3>Consulta Atual</h3>
          {loading ? (
            <div>Procurando consulta atual...</div>
          ) : (
            <>
              {consult ? (
                <div className={styles.cardContainer}>
                  <ConsultCard {...consult} />
                </div>
              ) : (
                <h4>Carregando</h4>
              )}
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};
