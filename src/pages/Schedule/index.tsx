import React, { FormEvent, useEffect, useState } from "react";
import { Layout } from "../../components/FC/Layout";
import healthData from "../../global/healthOptions.json";

import global from "../../app/global.module.scss";

import styles from "./style.module.scss";
import { API } from "../../services/api";
import { getDoctors } from "../../services/GET/getDoctors";
import { DoctorScheduleList } from "../../components/Schedule/DoctorScheduleList";
import { createConsult } from "../../services/POST/createConsult";
import { toast } from "react-toastify";
import { serialize } from "v8";
import { avaliableSchedule } from "../../services/POST/avaliableSchedule";
import { SuccessCreate } from "../../components/Schedule/SuccessCreate";

type IDoctor = {
  crm: string;
  doctorSchedule: string[];
  modality: string;
  name: string;
  id: string;
};
export const Schedule: React.FC = () => {
  const [formData, setFormData] = useState({
    clinic: "",
    modality: "",
  });

  const [doctorOptions, setDoctorOptions] = useState<[] | IDoctor[]>([]);
  const [currentDoctor, setCurrentDoctor] = useState<null | IDoctor>(null);
  const [doctorFreeHours, setDoctorFreeHours] = useState<[] | string[]>([]);
  const [isSuccessCreate, setIsSuccessCreate] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    hour: "",
    date: "",
  });

  useEffect(() => {
    getAvaliableDoctors();
  }, [formData]);

  const getAvaliableDoctors = async () => {
    let { data } = await getDoctors(formData);

    setDoctorOptions([{ name: "Selecionar", value: null }, ...data]);
  };

  let user = JSON.parse(sessionStorage.getItem("@USER_CREDENTIALS")!);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    toast.promise(
      async () => {
        let response = await createConsult({
          clinic: user.clinic,
          date: currentTime.date,
          doctorId: currentDoctor!.id,
          userId: user.id,
          modality: currentDoctor?.modality!,
          hour: currentTime.hour,
        });

        if (response.status === 200) {
          setIsSuccessCreate(true);
        }
      },
      {
        error: "Erro ao criar a consulta",
        pending: "Criando consulta",
        success: "Sucesso ao criar a consulta",
      }
    );
  };

  useEffect(() => {
    (async () => {
      let { data } = await avaliableSchedule({
        clinic: user.clinic,
        doctorId: currentDoctor!.id,
        doctorSchedule: currentDoctor!.doctorSchedule,
        date: new Date(currentTime.date).toISOString(),
      });

      setDoctorFreeHours(data);
    })();
  }, [currentDoctor, currentTime]);

  return (
    <Layout title={`Agendamento de consultas`}>
      <div className={styles.container}>
        <section className={styles.bgSection} />

        <main className={styles.main}>
          {isSuccessCreate ? (
            <SuccessCreate setIsSuccesCreate={setIsSuccessCreate} />
          ) : (
            <>
              <h4>
                Para agendar uma nova consulta é simples. Basta preencher os
                seguintes dados
              </h4>

              <form
                className={styles.scheduleForm}
                onSubmit={(e) => onSubmit(e)}
              >
                <article className={global.selectStyle}>
                  <label htmlFor="schedule-clinic">Selecione uma clínica</label>
                  <select
                    name="schedule-clinic"
                    id="schedule-clinic"
                    onChange={({ target }) =>
                      setFormData((prev) => ({ ...prev, clinic: target.value }))
                    }
                  >
                    {healthData.clinics.map((clinic) => (
                      <option value={clinic}>{clinic}</option>
                    ))}
                  </select>
                </article>

                <article className={global.selectStyle}>
                  <label htmlFor="schedule-clinic">
                    Selecione uma modalidade
                  </label>
                  <select
                    name="schedule-clinic"
                    id="schedule-clinic"
                    onChange={({ target }) =>
                      setFormData((prev) => ({
                        ...prev,
                        modality: target.value,
                      }))
                    }
                  >
                    {healthData.modalities.map((clinic) => (
                      <option value={clinic}>{clinic}</option>
                    ))}
                  </select>
                </article>

                {doctorOptions.length > 0 && formData.modality.length > 0 && (
                  <article className={global.selectStyle}>
                    <label htmlFor="schedule-clinic">Selecione um médico</label>
                    <select
                      name="schedule-clinic"
                      id="schedule-clinic"
                      onChange={({ target }) => {
                        let doctor = doctorOptions.find(
                          (doctor) => doctor.id === target.value
                        )!;
                        setCurrentDoctor(doctor);
                      }}
                    >
                      {doctorOptions.map((clinic) => (
                        <option value={clinic.id}>{clinic.name}</option>
                      ))}
                    </select>
                  </article>
                )}
                <article className={styles.dateTime}>
                  <label htmlFor="date-consult">
                    Selecione o dia da consulta
                  </label>
                  <input
                    type={"date"}
                    id="date-consult"
                    onChange={({ target }) => {
                      setCurrentTime((prev) => ({
                        ...prev,
                        date: new Date(target.value).toISOString(),
                      }));
                    }}
                  />
                </article>
                {doctorFreeHours.length > 0 && (
                  <DoctorScheduleList
                    doctorSchedule={doctorFreeHours}
                    currentHour={currentTime.hour}
                    setCurrentHour={setCurrentTime}
                  />
                )}

                <button type="submit" className={styles.button}>
                  Enviar
                </button>
              </form>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};
