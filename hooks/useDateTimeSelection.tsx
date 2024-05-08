import { useEffect, useState } from 'react';

const useDateTimeSelection = (initialStartTime: string, initialEndTime: string) => {
  const [startTime, setStartTime] = useState<string>(initialStartTime);
  const [endTime, setEndTime] = useState<string>(initialEndTime);
  const [timeError, setTimeError] = useState<string | null>(null);

  useEffect(() => {
    if(initialStartTime != "" && initialEndTime != "") {
      setStartTime(initialStartTime);
      setEndTime(initialEndTime)
    }
  }, [initialEndTime, initialStartTime]);

  // handling logic for time selection
  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    if (endTime && time >= endTime) {
      setTimeError("End time must be after start time");
    } else {
      // clearing any error msgs if time selection is valid
      setTimeError(null);
    }
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    if (startTime && time <= startTime) {
      setTimeError("End time must be after start time");
    } else {
      // clearing any error msgs if time selection is valid
      setTimeError(null);
    }
  };

  return {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    timeError,
    handleStartTimeChange,
    handleEndTimeChange,
  };
};

export default useDateTimeSelection;
