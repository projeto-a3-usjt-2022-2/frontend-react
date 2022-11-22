import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillBook,
  AiFillCalendar,
  AiOutlineClose,
  AiOutlineUser,
} from "react-icons/ai";
import { BsFillGrid1X2Fill } from "react-icons/bs";

import styles from "./style.module.scss";
import { useAuthentication } from "../../../hooks/useAuthentication";

export const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { userLogged } = useAuthentication();

  const avaliableLinks = [
    {
      path: "/consults",
      name: "Minhas consultas",
      icon: <AiFillCalendar />,
    },
    {
      path: "/schedule",
      name: "Novo agendamento",
      icon: <AiFillBook />,
    },
    {
      path: "/queue",
      name: "Fila de consulta",
      icon: <AiOutlineUser />,
    },
  ];

  const getAvaliableLinks = (crm: string | null) => {
    let tmpLinks = [
      {
        path: "/consults",
        name: "Minhas consultas",
        icon: <AiFillCalendar />,
      },
      {
        path: "/schedule",
        name: "Novo agendamento",
        icon: <AiFillBook />,
      },
      {
        path: "/queue",
        name: "Fila de consulta",
        icon: <AiOutlineUser />,
      },
    ];

    if (crm) {
      tmpLinks = tmpLinks.filter((item) => item.path !== "/schedule");
    }

    return tmpLinks;
  };
  return (
    <div className={`${styles.container} ${open ? styles.active : ""}`}>
      {open ? (
        <section className={styles.open}>
          <header>
            <h2>Acesso Rápido</h2>

            <button
              className={styles.iconButton}
              onClick={() => setOpen((prev) => !prev)}
            >
              <AiOutlineClose />
            </button>
          </header>

          <ul>
            {getAvaliableLinks(userLogged.crm).map((link) => (
              <li key={link.name}>
                <Link to={link.path} className={styles.link}>
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className={styles.closed}>
          <button
            className={styles.iconButton}
            onClick={() => setOpen((prev) => !prev)}
          >
            <BsFillGrid1X2Fill />
          </button>
        </section>
      )}
    </div>
  );
};
