// import { ourList } from "./main";
var ourList = [[ 'Технические', 'Бонч', 'Техноложка', 'ГУАП', 'ГАСУ', 'ПГУПС', 'ЛЭТИ', 'Горный', 'СПбГУ', 'ИТМО', 'Политех', 'Военмех', 'Лесопилка', 'Тряпка'],
['Военные', 'Буденова', 'Можайка', 'Корабелка'],
['Гуманитарные', 'ГИК', 'Репина', 'Герцена', 'Ваганова', 'РГИСИ', 'Лесгофта', 'Римского-Корсакова'],
['Медицинские', 'Первый мед', 'Мечникова']];

let universities = [];
ourList.forEach((group) => group.slice(1).forEach((vuz) => universities.push(vuz)))

ymaps.ready(function() {
    let newMap = new ymaps.Map('map', {
        center: [59.963826, 30.306760],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });
    
    universities.forEach((vuz) => {
        let vuzPlacemark = new ymaps.Placemark([59.963826, 30.306760], {
            hintContent: vuz,
            ballonContent: ''
        })
        newMap.geoObjects.add(vuzPlacemark);
    })
});
// ymaps.ready(function () {
//     var myMap = new ymaps.Map('map', {
//             center: [55.751574, 37.573856],
//             zoom: 9
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),

//         myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
//             hintContent: 'Собственный значок метки',
//             balloonContent: 'Это красивая метка'
//         }),

//         myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
//             hintContent: 'Собственный значок метки с контентом',
//             balloonContent: 'А эта — новогодняя',
//             iconContent: '12'
//         });

//     myMap.geoObjects
//         .add(myPlacemark)
//         .add(myPlacemarkWithContent);
// });