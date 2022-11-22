import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckCircleFill, BsFillStopwatchFill } from "react-icons/bs";
import { Layout } from "../../components/FC/Layout";
import { ConsultCard } from "../../components/Home/ConsultCard";
import { useAuthentication } from "../../hooks/useAuthentication";
import { allConsultsById } from "../../services/POST/allConsultsById";

import styles from "./style.module.scss";

const statusConsult = {
  cancelled: {
    svg: <AiFillCloseCircle />,
    type: "cancelled",
  },
  waiting: {
    svg: <BsFillStopwatchFill />,
    type: "waiting",
  },
  done: {
    svg: <BsFillCheckCircleFill />,
    type: "done",
  },
};

type ICard = {
  modality: string;
  date: string;
  clinic: string;
  cep: string;
  hour: string;
  status: keyof typeof statusConsult;
};
export const Home: React.FC = () => {
  const [consults, setConsults] = useState<[] | ICard[]>([]);
  const [loading, setLoading] = useState(false);

  const { userLogged } = useAuthentication();

  const getConsults = async () => {
    let { data } = await allConsultsById({
      clinic: userLogged.clinic,
      crm: userLogged.crm,
      userId: userLogged.id,
    });

    setConsults(data);
  };

  useEffect(() => {
    setLoading(true);
    getConsults();
    setLoading(false);
  }, []);
  console.log(userLogged);

  return (
    <Layout title={`Bem vindo, ${userLogged?.name}`}>
      <div className={styles.container}>
        <section className={styles.bgSection} />
        <main className={styles.main}>
          <h3>Minhas consultas</h3>

          {loading ? (
            <div>Procurando consultas do usuário</div>
          ) : (
            <>
              {consults.length > 0 ? (
                <ul>
                  {consults.map((card) => (
                    <ConsultCard {...card} />
                  ))}
                </ul>
              ) : (
                <div>Sem consultas até o momento :(</div>
              )}
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};
