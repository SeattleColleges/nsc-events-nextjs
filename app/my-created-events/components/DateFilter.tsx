import React, { useState } from "react";
import styles from "./DateFilter.module.css";

const DateFilter: React.FC<{ onDateChange: (date: string) => void }> = ({
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    onDateChange(event.target.value);
  };

  return (
    <div className={styles.dateFilterContainer}>
      <input type="date" className={styles.dateInput} />
    </div>
  );
};

export default DateFilter;
