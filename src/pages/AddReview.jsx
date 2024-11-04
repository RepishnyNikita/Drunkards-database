import { PhotoUpload } from "../components/Form/PhotoUpload/PhotoUpload";
import { DrinkSelection } from "../components/Form/DrinkSelection/DrinkSelection";
import { ReviewSection } from "../components/Form/ReviewSection/ReviewSection";

import { ImportData } from "../components/ImportData";

import beerIcon from "./../image/forReview/beer.svg";
import wiskeyIcon from "./../image/forReview/wiskey.svg";
import tinctureIcon from "./../image/forReview/tincture.svg";

import checkMark from "./../image/forReview/check-mark.svg";
import xMark from "./../image/forReview/x-marks.svg";
import { useState } from "react";

export const AddReview = ({ addNewCard, setFormDataArray, setMarkedDates }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const drinkRadio = event.target.querySelector(
      'input[name="drink"]:checked'
    );
    data.drinkType = drinkRadio ? drinkRadio.dataset.drinktype : "";

    switch (data.drink) {
      case "beer":
        data.drink = beerIcon;
        break;
      case "wiskey":
        data.drink = wiskeyIcon;
        break;
      case "tincture":
        data.drink = tinctureIcon;
        break;
      default:
        data.drink = "";
    }

    switch (data.select) {
      case "xMark":
        data.select = xMark;
        data.additionalText = "Не брать";
        break;
      case "checkMark":
        data.select = checkMark;
        data.additionalText = "Брать";
        break;
      default:
        data.select = "";
        data.additionalText = "";
    }

    data.date = new Date().toLocaleDateString();

    const photoFile = formData.get("photo");
    if (photoFile) {
      const reader = new FileReader();
      reader.onload = () => {
        data.photo = reader.result;
        addNewCard(data);
      };
      reader.readAsDataURL(photoFile);
    } else {
      addNewCard(data);
    }
    event.target.reset();
    setImagePreview(null);
  };

  return (
    <section className="add-review">
      <div className="container">
        <h2 className="title">Создать карточку отзыва</h2>
        <form
          onSubmit={handleSubmit}
          className="add-review__form form"
          action="/upload"
          method="post"
          encType="multipart/form-data"
        >
          <PhotoUpload
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
          />
          <DrinkSelection />
          <ReviewSection />
          <button className="form-btn__add" type="submit">
            Создать
          </button>

          <ImportData
            setFormDataArray={setFormDataArray}
            setMarkedDates={setMarkedDates}
          />
        </form>
      </div>
    </section>
  );
};
