import { useState } from 'react';
import userIcon from '../../image/forReview/user.svg';

export const ReviewCard = ({
  id,
  photo,
  drink,
  nameDrink,
  iconMark,
  review,
  additionalText,
  date,
  handleDelete,
  drinkType,
  showDeleteButton
}) => {

  const[isModalActive, setIsModalActive] = useState(false)

  const toggleModal = () =>{
    setIsModalActive(!isModalActive)
  }

  const closeModal = ()=> {
    setIsModalActive(false)
  }

  const textClass = additionalText === 'Брать' ? 'rewiew-card__list-item__choice' : 'rewiew-card__list-item__choice--no-recomend'

  return (
    <div className="rewiew-card">
      <div className="rewiew-card__img active">
        <img src={photo} alt="photo"/>
      </div>
  
      
      <ul className="rewiew-card__list">
        <li className="rewiew-card__list-item">
          <img src={drink} data-drinktype={drinkType} alt="Drink Icon" />
          <h4 className="rewiew-card__list-item__title rewiew-card__list-item__title--wiskey">
            {nameDrink}
          </h4>
        </li>
        <li className="rewiew-card__list-item">
          <img src={iconMark} alt="icon select"/>
          <span className={textClass}>
            {additionalText}
          </span>
        </li>
        <li className="rewiew-card__list-item">
          <img src={userIcon} alt="" />

            <button className="rewiew-card__list-item__rewiew" onClick={toggleModal}>
              <span>Читать отзыв</span>
            </button>

            <div className= {`rewiew-card__list-item__rewiew-modal ${isModalActive ? 'rewiew-card__list-item__rewiew-modal--active' : ""} `} onClick={closeModal}>
              <span>{review}</span>
            </div>
          

        </li>
      </ul>

      <div className="rewiew-card__details">
        <span>{date}</span>
        {showDeleteButton && (
          <button onClick={() => handleDelete(id)}>
          Удалить
        </button>
      )}
      </div>
    </div>
  );
};
