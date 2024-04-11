// import { ourList } from "./main";

let universities = {
    ИТМО: [59.956363, 30.310029],
    ЛЭТИ: [59.9720000, 30.3237000],
    Политех: [60.007465, 30.373109],
    Горный: [59.930007, 30.268504],
    СПбГУ: [59.941633, 30.299293],
    Военмех: [59.916363, 30.315955],
    Можайка: [59.956251, 30.283498],
    Тряпка: [59.935015, 30.316422],
    Лесопилка: [59.992693, 30.343432],
    'Технологический университет': [59.917580, 30.318926],
    'Первый медицинский университет им. академика И.П. Павлова': [59.965205, 30.321884],
    'Северо-Западный государственный медицинский университет им. И. И. Мечникова': [59.983885, 30.429952],
    'СПбГМТУ (Корабелка)': [59.850593, 30.224049],
    'Военная академия связи им. Будённого': [60.011139, 30.374003],
    ГУАП: [59.930346, 30.295054],
    ГАСУ: [59.915063, 30.316433],
    ПГУПС: [59.924154, 30.317196],
    Гик: [59.988359, 30.302293],
    Репина: [59.937718, 30.289652],
    Герцена: [59.933661, 30.321726],
    Ваганова: [59.930628, 30.335050],
    Ргси: [59.940691, 30.345233],
    Лесгафта: [59.926299, 30.290014],
    Бонч: [59.903174, 30.489809]
};

function elt(tag, atributes, ...children){
    let elem = document.createElement(tag);
    if (atributes){
        for (let atribute of Object.keys(atributes)){
            elem.setAttribute(atribute, atributes[atribute]);
        }
    }
    for (let child of children){
        if (typeof child == 'string'){
            elem.textContent = child;
        } else{
            elem.appendChild(child);
        }
    }
    return elem;
}

ymaps.ready(function() {
    let newMap = new ymaps.Map('map', {
        center: [59.963826, 30.306760],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

    for (let vuz of Object.keys(universities)){
        let vuzPlacemark = new ymaps.Placemark(universities[vuz], {
            hintContent: vuz,
            ballonContent: ''
        })
        vuzPlacemark.events.add('click', function() {
            Array.from(document.getElementsByClassName('be_remove')).forEach((text) => text.remove());
            let element = new ListandElements(document.getElementById('place_for_text'));
            element.createElement(vuz, fullname, shortText, true);
        })
        newMap.geoObjects.add(vuzPlacemark);
    }
});

class ListandElements{
    constructor(container){
        this.place = container;
    }

    createElement(vuz, fullname, shortText, once){
        let block = elt('div', {class: 'vuz-block'},
            elt('div', {class: 'img-vuz-box'}, elt('img', null)),
            elt('div', {class: 'text-vuz-box'}, 
                elt('h3', null, vuz),
                elt('p', null, fullname),
                elt('p', null, shortText)));
        if (once){
            this.place.appendChild(block);
        }else{
            return block;
        }
    }

    createList(vuzList){
        let list = elt('ul', {class: 'vuz-list'});
        vuzList.forEach((vuz) => {
            list.appendChild(elt('li', {class: 'list-elem'}, this.createElement(vuz, fullname, shortText, false)));
        });
        this.place.appendChild(list)
    }
}