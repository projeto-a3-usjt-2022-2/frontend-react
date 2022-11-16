import React, { useEffect, useState } from "react";
import { Layout } from "../../components/FC/Layout";
import healthData from "../../global/healthOptions.json";

import global from "../../app/global.module.scss";

import styles from "./style.module.scss";
import { API } from "../../services/api";
import { getDoctors } from "../../services/GET/getDoctors";
import { DoctorScheduleList } from "../../components/Schedule/DoctorScheduleList";

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

  console.log(currentDoctor);

  useEffect(() => {
    getAvaliableDoctors();
  }, [formData]);

  const getAvaliableDoctors = async () => {
    let { data } = await getDoctors(formData);

    setDoctorOptions([{ name: "Selecionar", value: null }, ...data]);
  };

  console.log(currentDoctor);

  return (
    <Layout title={`Agendamento de consultas`}>
      <div className={styles.container}>
        <section className={styles.bgSection} />
        <main className={styles.main}>
          <h4>
            Para agendar uma nova consulta é simples. Basta preencher os
            seguintes dados
          </h4>

          <form className={styles.scheduleForm}>
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
              <label htmlFor="schedule-clinic">Selecione uma modalidade</label>
              <select
                name="schedule-clinic"
                id="schedule-clinic"
                onChange={({ target }) =>
                  setFormData((prev) => ({ ...prev, modality: target.value }))
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
            {currentDoctor && (
              <DoctorScheduleList
                doctorSchedule={currentDoctor.doctorSchedule!}
              />
            )}
          </form>
        </main>
      </div>
    </Layout>
  );
};
