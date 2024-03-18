import { errorDownloadImage, listImages, widthImages, heightImages } from '../utils/constants';

export default function useImagesConverter() {

  const handleChangeConverter = () => {
    iterateArray(listImages);
  };

  /*Функция по перебору массива картинок для изменения формата в base64*/
  function iterateArray(array) {
    array.map((image, i) => createImages(image));
  }

  /*Функция обновления объекта картинки*/
  function createImages(item) {
    let promise = new Promise((resolve) => {
      let img = loadImage(item.image); 
      resolve(img);
    })
    promise.then((data) => {
      handleDataUrl(data).then(elem => {
        let image = {name: item.name, id: item.id, image: elem.src};
        const imagesListStorage = localStorage.getItem("images");
        const imagesStorage = JSON.parse(imagesListStorage);
        if(imagesListStorage) {
          imagesStorage.push(image);
          localStorage.setItem("images", JSON.stringify(imagesStorage));
        } else {
          localStorage.setItem("images", JSON.stringify([]));
          const imagesStorage = JSON.parse(imagesListStorage);
          imagesStorage.push(image);
          localStorage.setItem("images", JSON.stringify(imagesStorage));
        }
      })
    })
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

  function handleDataUrl(item) {
    return new Promise((resolve) => {
      let url = getBase64Image(item);
      resolve(url);
    })
  }

   /*Функция получения src в формате base64*/
  function getBase64Image(img) {
    const canvas = document.createElement("canvas");
    canvas.width = widthImages;
    canvas.height = heightImages;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/jpeg");
    img.src = dataURL;
    return img;
  }

  return { handleChangeConverter };
};