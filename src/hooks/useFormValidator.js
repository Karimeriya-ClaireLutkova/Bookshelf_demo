import React from 'react';
import { placeNameAddBook, placeEditInfoBook, placeNameAddImageDropdown } from '../utils/constants';

export default function useFormValidator() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isValidNew, setValidNew] = React.useState(false);
  const [currentName, setCurrentName] = React.useState('');
  const [currentAuthor, setCurrentAuthor] = React.useState('');
  const [currentImage, setCurrentImage] = React.useState('');
  const [isValidCurrent, setIsValidCurrent] = React.useState(false);
  const [placeNameCurrent, setPlaceNameCurrent] = React.useState('');
  const [isCheckImage, setCheckImage] = React.useState('');

  /* Проверяем данные в массиве ошибок, для определения валидности данных */
  React.useEffect(() => {
    if(placeNameCurrent === placeNameAddBook || placeNameCurrent === placeEditInfoBook || placeNameCurrent === placeNameAddImageDropdown) {
      const checkFormErrors = (errors) => {
        if(placeNameCurrent === placeNameAddBook || (placeNameCurrent === placeNameAddImageDropdown && isCheckImage === false)) {
          if(errors.name !== '' && errors.name === undefined) {
            setIsValid(false);
          } else if(errors.author !== '' || errors.author === undefined) {
          } else if(errors.image !== '' || errors.image === undefined) {
            setIsValid(false);
          } else if((errors.name === '') && (errors.author === '') && (errors.image === '')) {
            setIsValid(true);
          }
        } else if(placeNameCurrent === placeEditInfoBook || (placeNameCurrent === placeNameAddImageDropdown && isCheckImage === true)) {
          if(errors.name !== '' && errors.name !== undefined) {
            setIsValid(false);
          } else if(errors.author !== '' && errors.author !== undefined) {
            setIsValid(false);
          } else if(errors.image !== '' && errors.image !== undefined) {
            setIsValid(false);
          } else if(((errors.name === '') && (errors.author === '') && (errors.image === '')) ||
                   ((errors.name === undefined) && (errors.author === '') && (errors.image === '')) ||
                    ((errors.author === undefined) && (errors.name === '') && (errors.image === '')) || 
                    ((errors.author === undefined) && (errors.name === undefined) && (errors.image === '')) ||
                    ((errors.author === undefined) && (errors.name === '') && (errors.image === undefined)) ||
                    ((errors.image === undefined) && (errors.name === '') && (errors.author === '')) ||
                    ((errors.image === undefined) && (errors.name === undefined) && (errors.author === ''))) {
            setIsValid(true);
          } else if((errors.name === undefined) && (errors.author === undefined) && (errors.image === undefined)) {
            setIsValid(false);
          }
        }
      }
      checkFormErrors(errors);
    }
  }, [errors, placeNameCurrent, isCheckImage]);

    /* Принимаем решение о валидности всей формы */
  React.useEffect(() => {
    if(placeNameCurrent === placeNameAddBook || placeNameCurrent === placeEditInfoBook || placeNameCurrent === placeNameAddImageDropdown) {
      const checkFormValid = (isValid, isValidNew) => {
        if(isValid === true && isValidNew === true) {
          setIsValidCurrent(true);
        } else {
          setIsValidCurrent(false);
        }
      };
      checkFormValid(isValid, isValidNew);
    }
  }, [isValid, isValidNew, placeNameCurrent]);

    /* Функция принятия данных из форм */
  const handleChange = (data) => {
    setIsValid(false);
    const target = data.event.target;
    const name = target.name;
    const value = target.value;
    if(data.currentBook !== undefined) {
      setCurrentName(data.currentBook.name);
      setCurrentAuthor(data.currentBook.author);
      setCurrentImage(data.currentBook.image);
    }
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    if(data.placeName === undefined) {
      checkFieldsForm(name, value);
      setIsValid(true);
    } else {
      setPlaceNameCurrent(data.placeName);
      if(data.placeName === placeNameAddImageDropdown) {
        if(target.checkImage !== undefined) {
          const checkImage = target.checkImage;
          setCheckImage(checkImage);
          checkFieldsForm(name, value, data.placeName, checkImage);
        }
      }
      checkFieldsForm(name, value, data.placeName);
    }
  };

  /* Функция, устанавливающая условия валидности вводимых данных по категории полей и соответствующим компонентам*/
  function checkFieldsForm(name, value, placeName, checkImage) {
    if (name === "name") {
      if (value.length === 0) {
        setErrors({...errors, [name]: "Поле Название не может быть пустым."});
        setValidNew(false);
      } else if (value.length > 0) {
        if (value.length <= 2) {
          setErrors({...errors, [name]: "Поле Название не может быть меньше 2 символов."});
          setValidNew(false);
        } else if (value.length > 100) {
          setErrors({...errors, [name]: "Поле Название не может быть больше 100 символов."});
          setValidNew(false);
        } else if (value.length > 2 && value.length <= 100) {
          if (placeName === placeNameAddBook) {
            setValidNew(true);
          } else if (placeName === placeEditInfoBook) {
            if (currentName === value) {
              setErrors({...errors, [name]: "Введите Название, отличающееся от изначального."});
              setValidNew(false);
            } else if (currentName !== value) {
              setValidNew(true);
            }
          }
        }
      }
    }
    if (name === "author") {
      if (value.length === 0) {
        setErrors({...errors, [name]: "Поле Автор не может быть пустым."});
        setValidNew(false);
      } else if (value.length > 0) {
        if (value.length <= 2) {
          setErrors({...errors, [name]: "Поле Автор не может быть меньше 2 символов."});
          setValidNew(false);
        } else if (value.length > 30) {
          setErrors({...errors, [name]: "Поле Автор не может быть больше 30 символов."});
          setValidNew(false);
        } else if (value.length > 2 && value.length <= 30) {
          if (placeName === placeNameAddBook) {
            setValidNew(true);
          } else if (placeName === placeEditInfoBook) {
            if (currentAuthor === value) {
              setErrors({...errors, [name]: "Введите Автора, отличающегося от изначального."});
              setValidNew(false);
            } else if (currentAuthor !== value) {
              setValidNew(true);
            }
          }
        }
      }
    }
    if(name === "image") {
      if (value.length === 0) {
        setErrors({...errors, [name]: "Поле Картинка не может быть пустым."});
        setValidNew(false);
      } else if (value.length > 0) {
        if (placeName === placeNameAddImageDropdown && checkImage === false) {
          setValidNew(true);
        } else if(placeName === placeEditInfoBook || (placeName === placeNameAddImageDropdown && checkImage === true)) {
          if (currentImage === value) {
            setErrors({...errors, [name]: "Введите значение, отличающееся от изначального."});
            setValidNew(false);
          } else if (currentImage !== value) {
            if (placeName === placeNameAddImageDropdown) {
              setValidNew(true);
            } else {
              if (!new RegExp(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/).test(value)) {
                setErrors({...errors, [name]: "Неверный формат ссылки или изображения."});
                setValidNew(false);
              } else if (new RegExp(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpe?g|gif|png|bmp|webp)?$/).test(value)) {
                setValidNew(true);
              }
            }
          }
        } else {
          setValidNew(true);
        }
      }
    }
  }

    /* Функция возврата в компонент обработанных данных и очистки хука */
  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false, newValid = false, newIsValidCurrent = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setValidNew(newValid);
      setIsValidCurrent(newIsValidCurrent);
    },
    [setValues, setErrors, setIsValid, setValidNew, setIsValidCurrent]
  );

  return { values, handleChange, errors, isValidCurrent, resetForm };
};