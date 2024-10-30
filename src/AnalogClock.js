import React, { useEffect, useState } from 'react';
import './AnalogClock.css';

const AnalogClock = ({ timeZone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const localTime = new Date(time.toLocaleString("en-US", { timeZone }));

  const seconds = localTime.getSeconds();
  const minutes = localTime.getMinutes();
  const hours = localTime.getHours();

  const secondsDegrees = ((seconds / 60) * 360) + 90;
  const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
  const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

  return (
    <div className="clock">
      <div className="hand hour" style={{ transform: `rotate(${hoursDegrees}deg)` }} />
      <div className="hand minute" style={{ transform: `rotate(${minutesDegrees}deg)` }} />
      <div className="hand second" style={{ transform: `rotate(${secondsDegrees}deg)` }} />
      <div className="center" />
    </div>
  );
};

export default AnalogClock;
