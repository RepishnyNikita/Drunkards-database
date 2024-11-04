export const PhotoUpload = ({ handleImageChange, imagePreview }) =>{
    return(
        <fieldset className="form__fieldset-photo">
            <legend>Кликни по области или перетащи сюда фото:</legend>
            <div className="form__fieldset-photo__wrapper">
                <input type="file" accept="image/* "name="photo" onChange={handleImageChange} required/>
                {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ width: '200px', height: '200px' }} />}
            </div>
        
        </fieldset>
    )
}