import React from 'react';
import { placeNameAddBook, placeNameAddImageDropdown, close } from '../../utils/constants'
import useFormValidator from '../../hooks/useFormValidator';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AddPlacePopup({ isOpen, onAddBook, onClose, isLoad }) {
  const imagesListStorage = localStorage.getItem("base64");
  const imagesNew = JSON.parse(imagesListStorage);
  const [name, setName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [image, setImage] = React.useState('');
  const [imageCurrent, setImageCurrent] = React.useState('');
  const { errors, isValidCurrent, handleChange, resetForm } = useFormValidator();
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);
  const className = `popup popup__list-example ${isOpenDropdown? "popup_opened" : ""}`;
  const element = document.querySelector("#book-image");

  console.log(isValidCurrent, errors);
  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setAuthor('');
      setImage('');
      resetForm();
    };
  }, [isOpen]);

  function handleChangeInput(evt, isImageDropdown) {
    console.log(isImageDropdown, evt);
    handleChange({event: evt, placeName: isImageDropdown ? placeNameAddImageDropdown : placeNameAddBook});
    if(evt.target.name === 'name') {
      setName(evt.target.value);
    } else if(evt.target.name === 'author') {
      setAuthor(evt.target.value);
    } else if(evt.target.name === 'image') {
      setImage(evt.target.value);
    }
  }

  function handleClickDropdown() {
    setImage('');
    setImageCurrent('');
    setOpenDropdown(true);
  }

  function handleChangeDropdown(evt) {
    setImageCurrent(evt.target.value);
    handleChange({event: evt, placeName: placeNameAddImageDropdown});
  }
  
  function handleDropdown() {
    setImage(imageCurrent);
    handleCloseDropdown();
  }

  function handleCloseDropdown() {
    setOpenDropdown(false);
    const isImageDropdown = true;
    const event = new CustomEvent('change', {
      cancelable: true});
    let e = {target: {name: element.name, value: imageCurrent, validationMessage: ""}}
    element.addEventListener(
      'change', handleChangeInput(e, isImageDropdown), false,
    );
    element.dispatchEvent(event);
    setImageCurrent('');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log({name, author, image});
    onAddBook({name, author, image});
    resetForm();
  }

  return (
    <PopupWithForm id="1" 
                   name="card-new" 
                   title="Новая книга"
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit ={handleSubmit}
                   buttonText={"Создать"}
                   isLoad={isLoad}
                   isValid={isValidCurrent}
                   textLoad={"Создание..."}>
      <div className="popup__field popup__field_card-new">
        <div className={`popup__data-input ${errors.name ? "popup__data-input_error" : ""}`}>
          <input id="book-name-input" type="text" className="popup__input popup__input_type_card-name" name="name" value={name} onChange={handleChangeInput} placeholder="Название" required />
          <span className={`book-name-input-error popup__input-error ${errors.name ? "popup__input-error_active" : ""}`}>{errors.name}</span>
        </div>
        <div className={`popup__data-input ${errors.author ? "popup__data-input_error" : ""}`}>
          <input id="book-author" type="text" className="popup__input popup__input_type_card-name" name="author" value={author} onChange={handleChangeInput} placeholder="Автор" required />
          <span className={`book-author-error popup__input-error ${errors.author ? "popup__input-error_active" : ""}`}>{errors.author}</span>
        </div>
        <div className={`popup__data-input ${errors.image ? "popup__data-input_error" : ""}`}>
          <input id="book-image" type="text" className="popup__input popup__input_type_card-name" name="image" value={image} onChange={handleChangeInput} placeholder="Добавить картинку" required />
          <div className="popup-span-group">
            <span className={`book-image-error popup__input-error ${errors.image ? "popup__input-error_active" : ""}`}>{errors.image}</span>
            <button type="button" className="popup__button popup__button_card-new popup__button_card-new_show" onClick={handleClickDropdown}></button>
          </div>
            {isOpenDropdown ?
              (<div className={className}>
                <div className="popup__container popup__container_image-dropdown">
                <button type="button" onClick={handleCloseDropdown} className="popup__button popup__button_close popup__button_close_image-dropdown" aria-label={close + "image-dropdown"} />
                  <div id="image-dropdown-list" className="popup__list">
                    {imagesListStorage ? imagesNew.map((image, i) =>
                      <div>
                        <label htmlFor={image.id + "-image"}><img id={image.id} className="popup__image" src={image.image} alt={image.name} /></label>
                        <input className="popup__input popup__input_type_image-dropdown" type="radio" id={image.id + "-image"} value={image.image} name="image" onChange={handleChangeDropdown} />
                      </div>
                    ) : ''}
                  </div>
                  <button type="button" className="popup__button popup__button_image-dropdown" onClick={handleDropdown}>Добавить</button>
                </div>
              </div>
              ) : ''
            }
        </div>
      </div>
    </PopupWithForm>
  )
}