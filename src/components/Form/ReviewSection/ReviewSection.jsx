import checkMark from '../../../image/forReview/check-mark.svg'
import xMark from '../../../image/forReview/x-marks.svg'


export const ReviewSection = () => {
  return (
    <fieldset className="form__fieldset-review">
      <legend>Рекомендации к напитку</legend>
      <div className="form__fieldset-review__icon">
        <label
          className="form__fieldset-review__lable"
          data-tooltip="Выберешь снова?"
        >
          <input
            className="form__fieldset-review__input"
            name="select"
            type="radio"
            value="checkMark"
            required
          />
          <span className="form__fieldset-review__radio">
            <img src={checkMark} alt="icon check-mark" />
          </span>
          <span className="form__fieldset-review__span">Брать</span>
        </label>

        <label className="form__fieldset-review__lable" data-tooltip="Ну нах!!">
          <input
            className="form__fieldset-review__input"
            name="select"
            type="radio"
            value="xMark"
            required
          />
          <span className="form__fieldset-review__radio form__fieldset-review__radio--x-mark">
            <img src={xMark} alt="icon beer" />
          </span>
          <span className="form__fieldset-review__span form__fieldset-review__span--red">
            Не Брать
          </span>
        </label>
      </div>

      <div className="form__fieldset-review__comment">
        <label>Пару комментариев</label>
        <input
          className="form__fieldset-review__comment-input"
          type="text"
          placeholder="Пиво было без души и по цене как кв в Москве"
          name="comment"
          maxLength="250"
          title="Не более 150 символов"
          required
          autoComplete="off"
        />
        {/* <textarea
              className='form__fieldset-review__comment-input'
              id="comment" 
              name="comment" 
              maxLength="200" 
              placeholder="Пиво было без души и по цене как кв в Москве" 
              title="Максимум 200 символов">
                
              </textarea> */}
      </div>
    </fieldset>
  );
};
