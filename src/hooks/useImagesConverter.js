import React from 'react';
import { errorDownloadImage, listImages } from '../utils/constants';

export default function useImagesConverter() {
  const [imagesListNew, setImagesListNew] = React.useState([]);

  const handleChangeConverter = () => {
    let promise = new Promise((resolve) => {
      let imagesArray = iterateArray(listImages);
      console.log(imagesArray);
      resolve(imagesArray);
    })
    let imagesNew = promise;
    setImagesListNew(imagesNew);
  };

  /*Функция по созданию массива картинок в формате base64*/
  async function iterateArray(array) {
    let promise = new Promise((resolve) => {
      let list = array.map((image, i) => createImage(image));
      console.log(list);
      resolve(list);
    })
    let listImagesNew = await promise;
    
    return listImagesNew;
  }

    /*Функция обновления объекта картинки*/
    function createImage(item) {
      let promise = new Promise((resolve) => {
        const img = loadImage(item.image);
        let data;
        data = handleDataUrl(img.src);
        resolve(data);
      })
      let src = promise;
      const image = {name: item.name, id: item.id, image: src};
      return image;
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
    let url;
    let promise = new Promise((resolve) => {
      let data = toDataURL(src).then(dataUrl => dataUrl);
      resolve(data);
    })
    url = await promise;
    return url;
  }

  /*Функция по преобразованию в формат base64*/
  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
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

  return { handleChangeConverter, imagesListNew, decodeBase64Image };
};