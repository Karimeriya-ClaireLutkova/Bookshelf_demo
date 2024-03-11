import React from 'react';
import { placeNameAddBook,
         placeEditInfoBook,
         placeNameAddImageDropdown,
         warningNameRequired,
         warningNameShort,
         warningNameLong,
         warningNameSymbols,
         warningNameIdentical,
         warningAuthorRequired,
         warningAuthorShort,
         warningAuthorLong,
         warningAuthorSymbols,
         warningAuthorIdentical,
         warningImageRequired,
         warningImageIdentical,
         warningImageFormat
        } from '../utils/constants';

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
        setErrors({...errors, [name]: warningNameRequired});
        setValidNew(false);
      } else if (value.length > 0) {
        if (value.length <= 2) {
          setErrors({...errors, [name]: warningNameShort});
          setValidNew(false);
        } else if (value.length > 100) {
          setErrors({...errors, [name]: warningNameLong});
          setValidNew(false);
        } else if (value.length > 2 && value.length <= 100) {
          if (!new RegExp(/^[a-zA-Zа-яёА-ЯЁ0-9]+(?:[\s-][a-zA-Zа-яёА-ЯЁ0-9]+)*$/).test(value)) {
            setErrors({...errors, [name]: warningNameSymbols});
            setValidNew(false);
          } else if (new RegExp(/^[a-zA-Zа-яёА-ЯЁ0-9]+(?:[\s-][a-zA-Zа-яёА-ЯЁ0-9]+)*$/).test(value)) {
            if (placeName === placeNameAddBook) {
              setValidNew(true);
            } else if (placeName === placeEditInfoBook) {
              if (currentName === value) {
                setErrors({...errors, [name]: warningNameIdentical});
                setValidNew(false);
              } else if (currentName !== value) {
                setValidNew(true);
              }
            }
          }
        }
      }
    }
    if (name === "author") {
      if (value.length === 0) {
        setErrors({...errors, [name]: warningAuthorRequired});
        setValidNew(false);
      } else if (value.length > 0) {
        if (value.length <= 2) {
          setErrors({...errors, [name]: warningAuthorShort});
          setValidNew(false);
        } else if (value.length > 30) {
          setErrors({...errors, [name]: warningAuthorLong});
          setValidNew(false);
        } else if (value.length > 2 && value.length <= 30) {
          if (!new RegExp(/^[a-zA-Zа-яёА-ЯЁ]+(?:[\s-][a-zA-Zа-яёА-ЯЁ]+)*$/).test(value)) {
            setErrors({...errors, [name]: warningAuthorSymbols});
            setValidNew(false);
          } else if (new RegExp(/^[a-zA-Zа-яёА-ЯЁ]+(?:[\s-][a-zA-Zа-яёА-ЯЁ]+)*$/).test(value)) {
            if (placeName === placeNameAddBook) {
              setValidNew(true);
            } else if (placeName === placeEditInfoBook) {
              if (currentAuthor === value) {
                setErrors({...errors, [name]: warningAuthorIdentical});
                setValidNew(false);
              } else if (currentAuthor !== value) {
                setValidNew(true);
              }
            }
          }
        }
      }
    }
    if(name === "image") {
      if (value.length === 0) {
        setErrors({...errors, [name]: warningImageRequired});
        setValidNew(false);
      } else if (value.length > 0) {
        if (placeName === placeNameAddImageDropdown && checkImage === false) {
          setValidNew(true);
          console.log(6);
        } else if(placeName === placeEditInfoBook || placeName === placeNameAddBook || (placeName === placeNameAddImageDropdown && checkImage === true)) {
          console.log(7);
          if (placeName === placeEditInfoBook || (placeName === placeNameAddImageDropdown && checkImage === true)) {
            console.log(8);
            if (currentImage === value) {
              setErrors({...errors, [name]: warningImageIdentical});
              setValidNew(false);
              console.log(4);
            } else {
              if (placeName === placeNameAddImageDropdown) {
                setValidNew(true);
                console.log(5);
              }
            }
          }
          if (placeName === placeEditInfoBook || placeName === placeNameAddBook) {
            if (!new RegExp(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpeg|gif|png|bmp|webp)?$/).test(value)) {
              setErrors({...errors, [name]: warningImageFormat});
              setValidNew(false);
              console.log(1);
            } else if (new RegExp(/^https?:\/\/(www\.)?([0-9a-zA-Z.-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.?(?:jpeg|gif|png|bmp|webp)?$/).test(value)) {
              setValidNew(true);
              console.log(2);
            }
          }
        } else {
          setValidNew(true);
          console.log(3);
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