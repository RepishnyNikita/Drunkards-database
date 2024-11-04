import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { Timer } from "../components/Timer";
import {
  addMarker,
  getAllMarkers,
  deleteMarker,
  getMarker,
} from "./../utils/initDB.js";

export const Home = ({
  formDataArray,
  markedDates,
  setMarkedDates,
}) => {
  const lastThreeCards = formDataArray.slice(-4);
  const [value, setValue] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [countdownDate, setCountdownDate] = useState(null);
  const [countupDate, setCountupDate] = useState(null);

  useEffect(() => {
    const fetchMarkersAndDates = async () => {
      const storedMarkers = await getAllMarkers();
      const markersMap = storedMarkers.reduce((acc, marker) => {
        acc[marker.date] = marker.color;
        return acc;
      }, {});
      setMarkedDates(markersMap);

      const savedCountdownDate = await getMarker("countdownDate");
      const savedCountupDate = await getMarker("countupDate");
      if (savedCountdownDate) {
        if (savedCountdownDate.color)
          setCountdownDate(new Date(savedCountdownDate.color));
      }
      if (savedCountupDate) {
        if (savedCountupDate.color)
          setCountupDate(new Date(savedCountupDate.color));
      }
    };

    fetchMarkersAndDates();
  }, [setMarkedDates]);

  useEffect(() => {
    const saveDate = async (date, key) => {
      if (date) {
        const formattedDate = date.toISOString();
        await addMarker({ date: key, color: formattedDate });
      }
    };

    if (countdownDate) {
      saveDate(countdownDate, "countdownDate");
    }
  }, [countdownDate]);

  useEffect(() => {
    const saveDate = async (date, key) => {
      if (date) {
        const formattedDate = date.toISOString();
        await addMarker({ date: key, color: formattedDate });
      }
    };

    if (countupDate) {
      saveDate(countupDate, "countupDate");
    }
  }, [countupDate]);

  function onChange(nextValue) {
    setValue(nextValue);
    setSelectedDate(nextValue);
    setModalIsOpen(true);
  }

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOptionSelect = async (option) => {
    const dateString = selectedDate.toDateString();
    if (option === "option1") {
      setCountupDate(new Date(selectedDate));
      const newMarkedDates = {
        ...markedDates,
        [dateString]: "green",
      };
      setMarkedDates(newMarkedDates);
      await addMarker({ date: dateString, color: "green" });
    } else if (option === "option2") {
      setCountdownDate(new Date(selectedDate));
      const newMarkedDates = {
        ...markedDates,
        [dateString]: "red",
      };
      setMarkedDates(newMarkedDates);
      await addMarker({ date: dateString, color: "red" });
    }
    setModalIsOpen(false);
  };

  const handleRemoveMarker = async (date) => {
    const dateString = date.toDateString();
    const newMarkedDates = { ...markedDates };
    delete newMarkedDates[dateString];
    setMarkedDates(newMarkedDates);

    await deleteMarker(dateString);

    if (dateString === countdownDate?.toDateString()) {
      setCountdownDate(null);
      await deleteMarker("countdownDate");
    }
    if (dateString === countupDate?.toDateString()) {
      setCountupDate(null);
      await deleteMarker("countupDate");
    }
  };

  return (
    <>
      <section className="home">
        <div className="container home__container">
          <h2 className="title"> Главная</h2>
          <div className="home__wrapper">
            <div className="home__last">
            <h4 className="home__last-title__mobile">Последние отзывы</h4>
              {lastThreeCards.map((card, index) => (
                <ReviewCard
                  key={index}
                  id={formDataArray.length - 4 + index}
                  photo={card.photo}
                  drink={card.drink}
                  nameDrink={card.nameDrink}
                  iconMark={card.select}
                  review={card.comment}
                  additionalText={card.additionalText}
                  date={card.date}
                />
              ))}
            </div>
            <div className="home__calendar">
              <Calendar
                onChange={onChange}
                value={value}
                tileClassName={({ date, view }) => {
                  const dateString = date.toDateString();
                  return markedDates && markedDates[dateString]
                    ? `react-calendar__tile marked-${markedDates[dateString]}`
                    : null;
                }}
              />
              {modalIsOpen && (
                <div
                  onClick={handleCloseModal}
                  className="react-calendar__tile-modal"
                >
                  <div className="react-calendar__tile-modal__content">
                    <h4>В этот день:</h4>
                    <button onClick={() => handleOptionSelect("option2")}>
                      Было
                    </button>
                    <button onClick={() => handleOptionSelect("option1")}>
                      Будет
                    </button>
                    <button onClick={() => handleRemoveMarker(selectedDate)}>
                      Удалить метку
                    </button>
                  </div>
                </div>
              )}
              <div className="home__calendar-timer">
                {countdownDate && (
                  <Timer
                    targetDate={countdownDate}
                    label="Было"
                    isCountUp={false}
                  />
                )}
                {countupDate && (
                  <Timer
                    targetDate={countupDate}
                    label="Будет"
                    isCountUp={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
