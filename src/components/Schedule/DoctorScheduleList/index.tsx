import React from "react";
import styles from "./style.module.scss";

interface IDoctorSchedule {
  doctorSchedule: string[];
}
export const DoctorScheduleList: React.FC<IDoctorSchedule> = ({
  doctorSchedule,
}) => {
  return (
    <div className={styles.container}>
      {doctorSchedule?.map((item) => (
        <button>{item}</button>
      ))}
    </div>
  );
};
