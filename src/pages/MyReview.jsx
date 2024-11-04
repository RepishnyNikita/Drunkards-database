import React, { useState, useEffect } from 'react';
import { ReviewCard } from "../components/ReviewCard/ReviewCard";
import { Search } from '../components/Search';
import {getAllReviews,deleteReview } from '../utils/initDB';
import { ExportData } from '../components/ExportData';

export const MyReview = ({ formDataArray, setFormDataArray }) => {
  const [visibleCards, setVisibleCards] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBtnHidden, SetShowBtnHidden] = useState(false);

  const [drinkFilter, setDrinkFilter] = useState('all');
  const [recommendationFilter, setRecommendationFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('new');

  const LoadMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 8);
    SetShowBtnHidden(true);
  };

  const HiddenMore = () => {
    setVisibleCards(8);
    SetShowBtnHidden(false);
  };

  const handleRecommendationFilterChange = (event) => {
    setRecommendationFilter(event.target.value);
  }

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  }

  useEffect(() => {
    const fetchReviews = async () => {
      const storedData = await getAllReviews();
      setFormDataArray(storedData);
    };
    fetchReviews();
  }, [setFormDataArray]);


  const handleDelete = async (id) => {
    console.log("Удаление отзыва с id:",id) 
    if (typeof id !== 'number' || id <= 0) {
      console.error("Ошибка: Недопустимый ключ");
      return;
    }
    await deleteReview(id);

    const updatedArray = await getAllReviews(); 
    setFormDataArray(updatedArray);
  };
  

  const handleDrinkFilterChange = (event) => {
    setDrinkFilter(event.target.value);
  }
  
  const filteredReviews = formDataArray.filter(card => {
    const matchesSearch = card.nameDrink.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          card.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDrink = drinkFilter === 'all' || card.drinkType === drinkFilter;
    const matchesRecommendation = recommendationFilter === 'all' || card.additionalText === recommendationFilter;
    return matchesSearch && matchesDrink && matchesRecommendation;
  });

  const sortedReviews = filteredReviews.sort((a, b) => {
    if (sortOrder === 'new') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <section className="my-review">
        <div className="container">
          <h2 className="title my-review__title">Мои отзывы</h2>
          <div className="my-review__wrapper">
            
            <div className="my-review__filter">
              <span>Фильтр по :</span>
              <select onChange={handleDrinkFilterChange}>
                <option value="all">Все</option>
                <option value="beer">Пиво</option>
                <option value="wiskey">Виски</option>
                <option value="tincture">Настойка</option>
              </select>
              <select onChange={handleRecommendationFilterChange}>
                <option value="all">Все</option>
                <option value="Не брать">Не брать</option>
                <option value="Брать">Брать</option>
              </select>
              <select onChange={handleSortOrderChange}>
                <option value="new">Новые</option>
                <option value="old">Старые</option>
              </select>
              <ExportData/>
            </div>
            <div className="my-review__grid">
              {sortedReviews.slice(0, visibleCards).map((card, index) => (
                <ReviewCard
                  key={index}
                  id={card.id}
                  photo={card.photo}
                  drink={card.drink}
                  nameDrink={card.nameDrink}
                  iconMark={card.select}
                  review={card.comment}
                  additionalText={card.additionalText}
                  date={card.date}
                  handleDelete={handleDelete}
                  drinkType={card.drinkType}
                  showDeleteButton={true}
                />
              ))}
              {visibleCards < formDataArray.length && (<button className="my-review__more" onClick={LoadMore}>Ещё...</button>)}
              {showBtnHidden && (<button className="my-review__more my-review__more--hidden" onClick={HiddenMore}>Скрыть</button>)}
            </div>
          </div>
        </div>
      </section>
    </>

  );
};
