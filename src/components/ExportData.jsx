import React from 'react';
import { getAllReviews, getAllMarkers } from '../utils/initDB.js';

export const ExportData = () => {
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

  return <button className="my-review__unloading-btn" onClick={exportData}>Экспорт данных</button>;
};
