import beer from "../../../image/forReview/beer.svg";
import wiskey from "../../../image/forReview/wiskey.svg";
import tincture from "../../../image/forReview/tincture.svg";

export const DrinkSelection = () => {
  
  return (
    <fieldset className="form__fieldset-drink">
      <legend>Определение напитка</legend>
      <div className="form__fieldset-drink__icon">
        <h4 className="title title--h4">Выбери иконку напитка</h4>

        <div className="form__fieldset-drink__wrapper">
          <label className="form__fieldset-drink__lable" data-tooltip="Пиво">
            <input
              className="form__fieldset-drink__input"
              name="drink"
              type="radio"
              value="beer"
              required
              data-drinktype="beer"
            />
            <span className="form__fieldset-drink__radio">
              <img src={beer} alt="icon beer" />
            </span>
          </label>

          <label className="form__fieldset-drink__lable" data-tooltip="Виски">
            <input
              className="form__fieldset-drink__input"
              name="drink"
              type="radio"
              value="wiskey"
              required
              data-drinktype="wiskey"
            />
            <span className="form__fieldset-drink__radio">
              <img src={wiskey} alt="icon wiskey" />
            </span>
          </label>

          <label
            className="form__fieldset-drink__lable"
            data-tooltip="Настойка"
          >
            <input
              className="form__fieldset-drink__input"
              name="drink"
              type="radio"
              value="tincture"
              data-drinktype="tincture"
              required
            />
            <span className="form__fieldset-drink__radio">
              <img src={tincture} alt="icon tincture" />
            </span>
          </label>
        </div>
      </div>

      <div className="form__fieldset-drink__name">
        <label>Напиток и его название:</label>
        <input
          className="form__fieldset-drink__name-input"
          type="drink"
          name="nameDrink"
          placeholder="Пиво Балтика 9"
          maxLength="27"
          title="Не более 27 символов"
          required
          autoComplete="off"
        />
      </div>
    </fieldset>
  );
};
