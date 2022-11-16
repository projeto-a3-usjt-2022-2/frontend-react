import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckCircleFill, BsFillStopwatchFill } from "react-icons/bs";
import { Layout } from "../../components/FC/Layout";
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
  street: string;
  hours: string;
  status: keyof typeof statusConsult;
};
export const Home: React.FC = () => {
  const name = "Guilherme Coelho";

  const cards: ICard[] = [
    {
      modality: "Ortopedia",
      date: "21/03/2022",
      clinic: "Amil Tatuapé",
      street: "R. Visc de Itaboraí, 60 - Vila Azevedo",
      hours: "14:30",
      status: "waiting",
    },
    {
      modality: "Ortopedia",
      date: "21/03/2022",
      clinic: "Amil Tatuapé",
      street: "R. Visc de Itaboraí, 60 - Vila Azevedo",
      hours: "14:30",
      status: "done",
    },
    {
      modality: "Ortopedia",
      date: "21/03/2022",
      clinic: "Amil Tatuapé",
      street: "R. Visc de Itaboraí, 60 - Vila Azevedo",
      hours: "14:30",
      status: "cancelled",
    },
  ];

  const formatDate = (date: string, hours: string) => {
    return `${date.slice(0, 5)} - ${hours}`;
  };

  const getSvgClass = (type: string) => {
    return `${styles[type]}`;
  };
  return (
    <Layout title={`Bem vindo, ${name}`}>
      <div className={styles.container}>
        <section className={styles.bgSection} />
        <main className={styles.main}>
          <h3>Minhas consultas</h3>

          <ul>
            {cards.map((card) => (
              <li className={styles.cardConsult}>
                <h3>{card.modality}</h3>

                <span>{formatDate(card.date, card.hours)}</span>

                <h4>{card.clinic}</h4>
                <p>{card.street}</p>

                <aside className={getSvgClass(statusConsult[card.status].type)}>
                  {statusConsult[card.status].svg}
                </aside>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
};
