import React from 'react';
import { close } from '../../utils/constants';
import './PopupWithForm.css';

function PopupWithForm({ isOpen, 
                         onClose, 
                         name, 
                         title, 
                         onSubmit, 
                         children, 
                         buttonText, 
                         isActive, 
                         isValid}) {
  const className = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className = {className}>
      <div className={`popup__container popup__container_${name}`}>
      <button id={name} type="button" onClick={onClose} className="popup__button popup__button_close" aria-label={close + name} />
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <div className="popup__form-info">
            {children}
          </div>
          <button id="profile-button-submit" type="submit" className={`popup__button popup__button_save ${isActive ? `popup__button_show popup__button_show_${name}` : "popup__button_hide"} ${!isValid ? "popup__button_inactive" : ""}`} disabled={!isValid ? true : ''}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;