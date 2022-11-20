import React, { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";

interface IDoctorSchedule {
  currentHour: string;
  setCurrentHour: Dispatch<
    SetStateAction<{
      date: string;
      hour: string;
    }>
  >;
  doctorSchedule: string[];
}
export const DoctorScheduleList: React.FC<IDoctorSchedule> = ({
  doctorSchedule,
  currentHour,
  setCurrentHour,
}) => {
  return (
    <div className={styles.container}>
      {doctorSchedule?.map((item) => (
        <button
          className={`${currentHour === item ? styles.active : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentHour((prev) => ({ ...prev, hour: item }));
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
