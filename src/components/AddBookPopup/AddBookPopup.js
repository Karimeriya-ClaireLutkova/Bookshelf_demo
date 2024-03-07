import React from 'react';
import { placeNameAddBook, close } from '../../utils/constants'
import useFormValidator from '../../hooks/useFormValidator';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AddPlacePopup({ isOpen, onAddBook, onClose, isLoad }) {
  const imagesListStorage = localStorage.getItem("base64");
  const imagesNew = JSON.parse(imagesListStorage);
  const [name, setName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [image, setImage] = React.useState('');
  const { errors, isValidCurrent, handleChange, resetForm } = useFormValidator();
  const [isOpenDropdown, setOpenDropdown] = React.useState(false);
  const className = `popup popup__list-example ${isOpenDropdown? "popup_opened" : ""}`;

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setAuthor('');
      setImage('');
    };
  }, [isOpen]);

  function handleChangeInput(evt) {
    handleChange({event: evt, placeName: placeNameAddBook});
    if(evt.target.name === 'name') {
      setName(evt.target.value);
    } else if(evt.target.name === 'author') {
      setAuthor(evt.target.value);
    } else if(evt.target.name === 'image') {
      setImage(evt.target.value);
      console.log(evt.target)
    }
  }

  function handleClickDropdown() {
    setOpenDropdown(true);
  }

  function handleDropdown() {

  }

  function handleCloseDropdown() {
    setOpenDropdown(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
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
          <input id="book-name-input" type="text" className="popup__input popup__input_type_book-name" name="name" value={name} onChange={handleChangeInput} placeholder="Название" required />
          <span className="book-name-input-error popup__input-error"></span>
        </div>
        <div className={`popup__data-input ${errors.author ? "popup__data-input_error" : ""}`}>
          <input id="book-author" type="text" className="popup__input popup__input_type_book-author" name="author" value={author} onChange={handleChangeInput} placeholder="Автор" required />
          <span className="book-author-error popup__input-error"></span>
        </div>
        <div className={`popup__data-input ${errors.author ? "popup__data-input_error" : ""}`}>
          <input id="book-image" type="fail" className="popup__input popup__input_type_book-image" name="image" value={image} onChange={handleChangeInput} list="exampleList" placeholder="Добавить картинку" required />
          <button type="button" className="popup__button popup__button_card-new popup__button_card-new_show" onClick={handleClickDropdown}></button>
            {isOpenDropdown ?
              (<div className={className}>
                <div className="popup__container popup__container_image-dropdown">
                <button id="image-dropdown" type="button" onClick={handleCloseDropdown} className="popup__button popup__button_close popup__button_close_image-dropdown" aria-label={close + "image-dropdown"} />
                  <div className="popup__list">
                    {imagesListStorage ? imagesNew.map((image, i) =>
                      <div>
                        <label htmlFor={i + image.name}><img id={image.id} className="popup__image" src={image.image} alt={image.name} /></label>
                        <input className="popup__input popup__input_type_image-dropdown" type="radio" id={i + image.name} value={image.name} name="line-style" />
                      </div>
                    ) : ''}
                  </div>
                  <button type="button" className="popup__button popup__button_image-dropdown" onClick={handleDropdown}>Добавить</button>
                </div>
              </div>
              ) : ''
            }
          <span className="book-image-error popup__input-error"></span>
        </div>
      </div>
    </PopupWithForm>
  )
}