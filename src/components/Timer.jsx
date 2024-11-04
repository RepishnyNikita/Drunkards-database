import React, { useState, useEffect } from 'react';

export const Timer = ({ targetDate, label, isCountUp }) => {
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      let diff = isCountUp ? targetDate - now : now - targetDate; 

      if (diff < 0) diff = 0;

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const totalMonths = Math.floor(totalDays / 30); 
      const days = totalDays % 30;
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ months: totalMonths, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate, isCountUp]);

  return (
    <div className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}`}>
      <h6 className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-title`}>{label}:</h6>
      <div className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-item`}>
        <span className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-value`}>{timeLeft.months}</span>
        <span className="home__calendar-timer__countdown-unit">м</span>
      </div>
      <div className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-item`}>
        <span className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-value`}>{timeLeft.days}</span>
        <span className="home__calendar-timer__countdown-unit">д</span>
      </div>
      <div className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-item`}>
        <span className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-value`}>{timeLeft.hours}</span>
        <span className="home__calendar-timer__countdown-unit">ч</span>
      </div>
      <div className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-item`}>
        <span className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-value`}>{timeLeft.minutes}</span>
        <span className="home__calendar-timer__countdown-unit">м</span>
      </div>
      <div className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-item`}>
        <span className={`home__calendar-timer__${isCountUp ? 'countup' : 'countdown'}-value`}>{timeLeft.seconds}</span>
        <span className="home__calendar-timer__countdown-unit">с</span>
      </div>
    </div>
  );
};


