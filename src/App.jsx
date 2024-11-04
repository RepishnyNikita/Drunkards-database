import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { MyReview } from './pages/MyReview';
import { AddReview } from './pages/AddReview';
import 'normalize.css';
import 'react-calendar/dist/Calendar.css';
import './scss/main.scss';
import { getAllReviews, addReview, getAllMarkers, getMarker } from './utils/initDB.js'; 

function App() {
  const [formDataArray, setFormDataArray] = useState([]);
  const [markedDates, setMarkedDates] = useState({}); 
  const [navIsOpen, setNavIsOpen] = useState(false)

  useEffect(() => {
    const fetchReviewsAndMarkers = async () => {
      const storedData = await getAllReviews();
      setFormDataArray(storedData);
  
      const storedMarkers = await getAllMarkers();
      const markersMap = storedMarkers.reduce((acc, marker) => {
        acc[marker.date] = marker.color;
        return acc;
      }, {});
      setMarkedDates(markersMap);
    };
  
    fetchReviewsAndMarkers();
  }, []);

  const addNewCard = async (data) => {
    await addReview(data);
    const updatedArray = [...formDataArray, data];
    setFormDataArray(updatedArray);
  };

  return (
    <Router>
      <div className="App">
        <Navigation navIsOpen={navIsOpen} setNavIsOpen={setNavIsOpen} />
        <Routes>
          <Route path="/" element={<Home formDataArray={formDataArray} setFormDataArray={setFormDataArray} markedDates={markedDates} setMarkedDates={setMarkedDates} />} />
          <Route path="/my-review" element={<MyReview formDataArray={formDataArray} setFormDataArray={setFormDataArray} />} />
          <Route path="/add-review" element={<AddReview addNewCard={addNewCard} setFormDataArray={setFormDataArray} setMarkedDates={setMarkedDates} />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
