import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckCircleFill, BsFillStopwatchFill } from "react-icons/bs";
import { sendConsultToQueue } from "../../../services/POST/sendConsultToQueue";
import { getCepInfo } from "../../../utils/getCepInfo";
import styles from "./style.module.scss";
// import { Container } from './styles';

type ICard = {
  modality: string;
  date: string;
  clinic: string;
  cep: string;
  hour: string;
  status: keyof typeof statusConsult;
};

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

export const ConsultCard: React.FC<ICard> = (card) => {
  const [street, setStreet] = useState("");

  const getSvgClass = (type: string) => {
    return `${styles[type]}`;
  };

  useEffect(() => {
    if (card.cep) {
      const getStreetName = async () => {
        let res = await getCepInfo(card.cep);

        setStreet(res.street);
      };

      getStreetName();
    }
  }, [card.cep]);

  const formatContent = (dateISO: string, hour: string) => {
    let date = [new Date(dateISO).getDate(), new Date(dateISO).getMonth()];

    return `${date.join("/")} - ${hour.slice(0, 6)}`;
  };

  formatContent(card.date, card.hour);
  return (
    <li className={styles.cardConsult}>
      <h3>{card.modality}</h3>

      <span>{formatContent(card.date, card.hour)}</span>

      <h4>{card.clinic}</h4>
      <p>{street}</p>
      <button
        onClick={async () => await sendConsultToQueue(card)}
        className={getSvgClass(statusConsult[card.status].type)}
      >
        {statusConsult[card.status].svg}
      </button>
    </li>
  );
};
