import React, { Dispatch, SetStateAction } from "react";
import healthGlobalOptions from "../../../global/healthOptions.json";

import style from "./style.module.scss";

interface IScheduleDoctorOptions {
  hoursSelected: [] | string[];
  setHoursSelected: Dispatch<SetStateAction<[] | string[]>>;
}

export const ScheduleDoctorOptions: React.FC<IScheduleDoctorOptions> = ({
  hoursSelected,
  setHoursSelected,
}) => {
  const handleTagValue = (value: string) => {
    let exist = hoursSelected.find((item) => item === value);

    if (exist) {
      let tmpHours = hoursSelected.filter((item) => item !== value);
      setHoursSelected(tmpHours);
    } else {
      return hoursSelected.length > 0
        ? setHoursSelected((prev) => [...prev, value])
        : setHoursSelected([value]);
    }
  };

  return (
    <div className={style.container}>
      <p>Horários Disponíveis</p>
      <section className={style.listHours}>
        {healthGlobalOptions.doctorSchedule.map((hour) => (
          <button
            value={hour}
            type="button"
            className={
              hoursSelected.find((item) => item === hour) && style.active
            }
            onClick={() => {
              handleTagValue(hour);
            }}
          >
            {hour}
          </button>
        ))}
      </section>
    </div>
  );
};
