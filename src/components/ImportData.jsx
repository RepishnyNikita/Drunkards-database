import React, { useState } from 'react';
import { getAllReviews, addReview, getAllMarkers, addMarker } from '../utils/initDB.js';

export const ImportData = ({ setFormDataArray, setMarkedDates }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== 'application/json') {
      setError('Формат файла не поддерживается. Пожалуйста, загрузите файл формата JSON.');
      setSelectedFile(null);
    } else {
      setError('');
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
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

    reader.readAsText(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="form__file-upload">
      <p>Загрузить карточки других пользователей</p>
      <input 
        type="file" 
        id="file" 
        className="form__file-upload-inputfile" 
        onChange={handleFileChange} 
      />
      <label htmlFor="file">Выбрать файл</label>
      {selectedFile && (
        <div className="form__file-upload__ok">
          <p>Выбран файл: <span>{selectedFile.name}</span></p>
          <button onClick={handleImport}>Загрузить</button>
        </div>
      )}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}
    </div>
  );
};
