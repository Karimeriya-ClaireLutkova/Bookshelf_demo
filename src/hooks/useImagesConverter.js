import React from 'react';
import { errorDownloadImage, listImages } from '../utils/constants';

export default function useImagesConverter() {
  const [imagesListNew, setImagesListNew] = React.useState([]);
  const [list, setList] = React.useState([]);

  const handleChangeConverter = () => {
    iterateArray(listImages);
    /*const handleImagesNew = () => {
      
    };
    handleImagesNew();*/
  };

  /*Функция по созданию массива картинок в формате base64*/
  function iterateArray(array) {
    array.map((image, i) => createImage(image));
  }

    /*Функция обновления объекта картинки*/
  async function createImage(item) {
    let promise = new Promise((resolve) => {
      let img = loadImage(item.image);
      let url = handleDataUrl(img.src);
      resolve(url);
    })
    promise.then((data) => {
      let image = {name: item.name, id: item.id, image: data};
      list.push(image);
    });
      /*const handleImagesSrc = () => {
        
      };
      handleImagesSrc();*/ 
  }
  /* Функция для загрузки изображения */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(img)
      };
      img.onerror = () => {
        reject(new Error(errorDownloadImage))
      }
    })
  }
  
   /*Функция получени src в формате base64*/
   async function handleDataUrl(src) {
    let promise = new Promise((resolve) => {
      let data = toDataURL(src).then(dataUrl => dataUrl);
      resolve(data);
    })
    let url = await promise.then(item => item);
    return url;
  }

  /*Функция по преобразованию в формат base64*/
  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }))

  const decodeBase64Image = (dataString) => {
    const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
      response = {};
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
    console.log(response);
    return response;
  }

  const resetForm = React.useCallback(
    (newList = []) => {
      setList(newList);
    },
    [setList]
  );

  return { handleChangeConverter, list, decodeBase64Image, resetForm  };
};