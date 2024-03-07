import compilers from '../images/images__books/Alfred_Axo__Compilers.jpg';
import roadside from '../images/images__books/Arkadiy_Boris_Strygackie__Roadside_picnic.jpg';
import allWorlds from '../images/images__books/Dennis_Tejlor__All_these_worlds.jpg';
import hitchhikers from '../images/images__books/Duglas_Adams__Hitchhikers_guide_to_galaxy.jpg';
import sod from '../images/images__books/Erik_Evans__SOD.jpg';
import oop from '../images/images__books/Erix_Gamma__OOP_techniques.jpg';
import duna from '../images/images__books/Frenk_Gerbert__Duna.jpg';
import robot from '../images/images__books/Isaac_Asimov__I_robot.jpeg';
import regular from '../images/images__books/Jeffri_Fridl__Regular_expressions.jpg';
import lord from '../images/images__books/Jon_Tolkin__Lord_of_Rings.jpg';
import extreme  from '../images/images__books/Kent_Back__Extreme_programming.jpg';
import templates from '../images/images__books/Martin_Fayler__Templates.jpg';
import effective from '../images/images__books/Martin_Fizers__Effective_work.jpg';
import anafem from '../images/images__books/Nil_Stivenson__Anafem.jpeg';
import chronicles from '../images/images__books/Rey_Bredberi__Martian_Chronicles.jpg';
import moon from '../images/images__books/Robert Heinlein__Moon_harsh_mistress.jpg';
import clean from '../images/images__books/Robert_Martin__Сlean_code.png';
import perfect from '../images/images__books/Stiv_Makkonnell__Perfect_code.jpg';
import confrontation from '../images/images__books/Stiven_King__Confrontation.jpg';
import algorithms from '../images/images__books/Tomas_Korman__Algorithms.jpg';

import flowers from '../images/images__books_new/floowers.jpg';
import strawberry from '../images/images__books_new/strawberry.jpg';
import cat from '../images/images__books_new/cat.jpg';
import dog from '../images/images__books_new/dog.jpg';
import rock from '../images/images__books_new/rock.jpg';
import sea from '../images/images__books_new/sea.jpg';
import plain from '../images/images__books_new/plain.jpg';
import river from '../images/images__books_new/river.jpg';
import duck from '../images/images__books_new/duck.jpg';
import car from '../images/images__books_new/car.jpg';


export const currentUser = "CurrentUser";
export const userId = "154users";
export const close = "Закрыть форму ";
export const headingHeader = "За пределами Вселенной";
export const headingMain = "Все книги";
export const content = "Хотели бы Вы помочь людям открыть миры за пределами Вселенной? ";
export const contentAdditionally = "Читай вместе с Bookshelf - окунись в мир неизведанного..."
export const details = "Узнать подробнее ";
export const github = "Github Svetlana Lutkova";
export const resume = "HH.ru - посмотреть резюме"
export const headingFooter = "Демонстрационный проект Bookshelf.";
export const year = "2024";
export const headingAddendum = "Новые книги"
export const subtitleAddendum = "Как стать героем? ";
export const paragraphAddendum1 = "Шаг в будущее";
export const paragraphAddendum2 = "Сейчас информационные технологии развиваются очень быстро. Многие привычные вещи подвергаются цифровой трансформации. " +
"Но нужно и людям сейчас крайне необходимо развиваться и не забывать про чтение. Именно оно делает нас умнее. " + 
"И взрослые, и дети - все умеют пользоваться телефоном, много времени не выпускают его из рук. ";
export const textAddendum = " В современном мире это гораздо проще. " + 
"Читайте электронные книги, добавляйте новые, приобщайте друзей - Вы сделаете неоценимый вклад в будущее всего человечества.";
export const buttonAddendum = "Добавить новую книгу";
export const placeNameAddBook = "addBook";
export const placeNameAddImageDropdown = "dropdownAddBook";
export const placeEditInfoBook = 'placeNameAddBook';
export const listBooks = [
{
  name: 'Эффективная работа с унаследованным кодом',
  author: 'Майкл Физерс',
  image: effective,
  owner: {},
  id: 1,
},
{
  name: 'Приёмы объектно-ориентированного проектирования. Паттерны проектирования',
  author: 'Эрих Гамма',
  image: oop,
  owner: {},
  id: 2,
},
{
  name: 'Чистый код. Создание, анализ и рефакторинг',
  author: 'Роберт Мартин',
  image: clean,
  owner: {},
  id: 3,
},
{
  name: 'Предметно-ориентированное проектирование',
  author: 'Эрик Эванс',
  image: sod,
  owner: {},
  id: 4,
},
{
  name: 'Шаблоны корпоративных приложений',
  author: 'Мартин Фаулер',
  image: templates,
  owner: {},
  id: 5,
},
{
  name: 'Совершенный код. Мастер-класс',
  author: 'Стив Макконнелл',
  image: perfect,
  owner: {},
  id: 6,
},
{
  name: 'Экстремальное программирование: разработка через тестирование',
  author: 'Кент Бек',
  image: extreme,
  owner: {},
  id: 7,
},
{
  name: 'Алгоритмы. Построение и анализ',
  author: 'Томас Кормен',
  image: algorithms,
  owner: {},
  id: 8,
},
{
  name: 'Регулярные выражения',
  author: 'Джеффри Фридл',
  image: regular,
  owner: {},
  id: 9,
},
{
  name: 'Компиляторы. Принципы, технологии и инструментарий',
  author: 'Альфред Ахо',
  image: compilers,
  owner: {},
  id: 10,
},
{
  name: 'Властелин колец',
  author: 'Джон Толкин',
  image: lord,
  owner: {},
  id: 11,
},
{
  name: 'Дюна',
  author: 'Фрэнк Герберт',
  image: duna,
  owner: {},
  id: 12,
},
{
  name: 'Пикник на обочине',
  author: 'Аркадий и Борис Стругацкие',
  image: roadside,
  owner: {},
  id: 13,
},
{
  name: 'Марсианские хроники',
  author: 'Рэй Брэдбери',
  image: chronicles,
  owner: {},
  id: 14,
},
{
  name: 'Противостояние',
  author: 'Стивен Кинг',
  image: confrontation,
  owner: {},
  id: 15,
},
{
  name: 'Луна – суровая хозяйка',
  author: 'Роберт Хайнлайн',
  image: moon,
  owner: {},
  id: 16,
},
{
  name: 'Автостопом по Галактике',
  author: 'Дуглас Адамс',
  image: hitchhikers,
  owner: {},
  id: 17,
},
{
  name: 'Анафем',
  author: 'Нил Стивенсон',
  image: anafem,
  owner: {},
  id: 18,
},
{
  name: 'Я, робот',
  author: 'Айзек Азимов',
  image: robot,
  owner: {},
  id: 19,
},
{
  name: 'Все эти миры',
  author: 'Деннис Тейлор',
  image: allWorlds,
  owner: {},
  id: 20,
}
];
export const listImages = [
  {
    name: "Цветы",
    image: flowers,
    id: 1,
  },
  {
    name: "Клубника",
    image: strawberry,
    id: 2,
  },
  {
    name: "Кот",
    image: cat,
    id: 3,
  },
  {
    name: "Собака",
    image: dog,
    id: 4,
  },
  {
    name: "Скала",
    image: rock,
    id: 5,
  },
  {
    name: "Море",
    image: sea,
    id: 6,
  },
  {
    name: "Степь",
    image: plain,
    id: 7,
  },
  {
    name: "Река",
    image: river,
    id: 8,
  },
  {
    name: "Утка",
    image: duck,
    id: 9,
  },
  {
    name: "Машина",
    image: car,
    id: 10,
  }
  ];