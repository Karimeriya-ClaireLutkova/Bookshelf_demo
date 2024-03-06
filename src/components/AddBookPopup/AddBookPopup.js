import React from 'react';
import useFormValidator from '../../hooks/useFormValidator';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AddPlacePopup({ isOpen, onAddBook, onClose, isLoad }) {
  const [name, setName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [image, setImage] = React.useState('');
  const { errors, isValidCurrent, handleChange, resetForm } = useFormValidator();

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setAuthor('');
      setImage('');
    };
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddBook({name, author, image});
  }

  function handleCardName(evt) {
    setName(evt.target.value);
  }

  function handleCardAuthor(evt) {
    setAuthor(evt.target.value);
  }

  function handleCardImage(evt) {
    setImage(evt.target.value);
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
      <div className="popup__field">
        <input id="book-name-input" type="text" className="popup__input popup__input_type_book-name" name="name" value={name} onChange={handleCardName} placeholder="Название" required />
        <span className="book-name-input-error popup__input-error"></span>
      </div>
      <div className="popup__field">
        <input id="book-author" type="text" className="popup__input popup__input_type_book-author" name="author" value={author} onChange={handleCardAuthor} placeholder="Автор" required />
        <span className="book-author-error popup__input-error"></span>
      </div>
      <div className="popup__field">
        <input id="book-image" type="url" className="popup__input popup__input_type_book-image" name="image" value={image} onChange={handleCardImage} placeholder="Ссылка на картинку" required />
        <span className="book-image-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}