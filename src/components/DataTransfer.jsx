import React from 'react';
import { getAllReviews, addReview, getAllMarkers, addMarker } from '../utils/initDB.js';

export const DataTransfer = ({ setFormDataArray, setMarkedDates }) => {
  const exportData = async () => {
    const reviews = await getAllReviews();
    const markers = await getAllMarkers();

    const data = {
      reviews,
      markers,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
  };

  const importData = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = JSON.parse(e.target.result);
      if (data.reviews) {
        for (const review of data.reviews) {
          await addReview(review);
        }
      }
      if (data.markers) {
        for (const marker of data.markers) {
          await addMarker(marker);
        }
      }

      const updatedReviews = await getAllReviews();
      setFormDataArray(updatedReviews);
      const updatedMarkers = await getAllMarkers();
      const markersMap = updatedMarkers.reduce((acc, marker) => {
        acc[marker.date] = marker.color;
        return acc;
      }, {});
      setMarkedDates(markersMap);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <button onClick={exportData}>Экспорт данных</button>
      <input type="file" onChange={importData} />
    </div>
  );
};
