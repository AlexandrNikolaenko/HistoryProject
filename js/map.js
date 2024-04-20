// import { Universities } from "./dbConnector.js";
import { elt, dataList } from "./modules.js";

let condition = {lastElem: null};

ymaps.ready(function() {
    let newMap = new ymaps.Map('map', {
        center: [59.963826, 30.306760],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Universities.findAll().then((list) => {
    //     list.forEach((vuz) => {
    //         let vuzPlacemark = new ymaps.Placemark(vuz.place, {
    //             hintContent: vuz.fullname,
    //             ballonContent: ''
    //         })
    //         vuzPlacemark.events.add('click', function() {
    //             Array.from(document.getElementsByClassName('be_remove')).forEach((text) => text.remove());
    //             let element = new ListandElements(document.getElementById('place_for_text'));
    //             element.createElement(vuz.university, vuz.fullname, vuz.shortText, true);
    //         })
    //         newMap.geoObjects.add(vuzPlacemark);
    //     })
    // })

    dataList.forEach((vuz) => {
                let vuzPlacemark = new ymaps.Placemark([vuz.place.x, vuz.place.y], {
                    hintContent: vuz.fullname,
                    ballonContent: ''
                })
                vuzPlacemark.events.add('click', function() {
                    Array.from(document.getElementsByClassName('be_remove')).forEach((text) => text.remove());
                    let element = new ListandElements(document.getElementById('place_for_text'));
                    element.createElement(vuz.university, vuz.fullname, vuz.shortText, vuz.imgLink, `./${vuz.pageLink}`, true);
                })
                newMap.geoObjects.add(vuzPlacemark);
            });
});

class ListandElements{
    constructor(container){
        this.place = container;
    }

    createElement(vuz, fullname, shortText, imgLink, pageLink, once){
        if (condition.lastElem != null){
            this.place.removeChild(condition.lastElem);
        }
        let block = elt('a', {class: 'vuz-block', href: pageLink},
            elt('div', {class: 'img-vuz-box'}, elt('img', {src: imgLink})),
            elt('div', {class: 'text-vuz-box'}, 
                elt('h3', null, vuz),
                elt('p', null, fullname),
                elt('p', null, shortText)));
        if (once){
            this.place.appendChild(block);
            condition.lastElem = block;
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