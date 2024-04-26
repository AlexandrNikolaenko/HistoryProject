import { elt, dataList, categoryList } from "./modules.js";

let condition = {lastElem: null, scrollTop: false};

function scrollButtom(dir){
    let box = document.getElementsByClassName('change-box')[0];
    if (dir == 'map'){
        box.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"})
    }else if (dir == 'list'){
        box.scrollTo({
            top: 0,
            left: 1280,
            behavior: "smooth"})
    }else return;
}

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
            let def = Array.from(document.getElementsByClassName('be_remove'));
            def.forEach((text) => text.remove());
            let element = new ListandElements(document.getElementById('place_for_text'));
            element.createElement(vuz.university, vuz.fullname, vuz.shortText, vuz.imgLink, `./${vuz.pageLink}`, true, def);
        })
        newMap.geoObjects.add(vuzPlacemark);
    });
});

class ListandElements{
    constructor(container){
        this.place = container;
    }

    createElement(vuz, fullname, shortText, imgLink, pageLink, once, def){
        if (condition.lastElem != null && once){
            console.log(once);
            this.place.removeChild(condition.lastElem);
        }
        let block = elt('div', null, elt('a', {class: 'vuz-block', href: pageLink},
            elt('div', {class: 'img-vuz-box'}, elt('img', {src: imgLink})),
            elt('div', {class: 'text-vuz-box'}, 
                elt('h3', null, vuz),
                elt('p', null, fullname),
                elt('p', null, shortText))));
        if (once){
            block.style.position = 'relative';
            this.place.appendChild(block);
            condition.lastElem = block;
            let close = elt('div', {class: 'vuz-close'}, elt('img', {src: '../img/close.svg'}));
            close.addEventListener('click', () => {
                this.place.removeChild(block);
                console.log(def);
                def.forEach(child => this.place.appendChild(child));
                condition.lastElem = null;
            });
            block.appendChild(close);
        }else{
            return block;
        }
    }

    createList(data = dataList){
        let filter = elt('div', {class: 'filter  lit-wrapper'});
        let list = elt('ul', {class: 'vuz-list'}, filter);
        data.forEach((vuz) => {
            list.appendChild(elt('li', {class: 'list-elem'}, this.createElement(vuz.university, vuz.fullname, vuz.shortText, vuz.imgLink, `./${vuz.pageLink}`, false)));
        });
        categoryList.forEach(category => {
            let button = elt('button', {class: 'filter-button'}, category);
            button.addEventListener('click', () => {
                this.place.removeChild(list);
                this.createList(dataList.filter(vuz => vuz.category === category))});
            filter.appendChild(button);
        });
        let allButton = elt('button', {class: 'filter-button'}, 'Сброс')
        allButton.addEventListener('click', () => {
            this.place.removeChild(list);
            this.createList(dataList)});
        filter.appendChild(allButton);
        this.place.appendChild(list);
    }

    createUpButton(){
        let up = elt('div', {class: 'arrow-up'}, elt('img', {src: '../img/arrow-up.svg'}));
        up.addEventListener('click', (event) => {
            event.preventDefault();
            this.place.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
            this.place.parentNode.removeChild(up);
        })
        this.place.addEventListener('scroll', () => {
            if (!screenTop) {
                this.place.parentNode.appendChild(up);
                condition.scrollTop = true;
            };
            console.log(this.place.scrollHeight);
            if (this.place.scrollY == 0){
                this.place.parentNode.removeChild(up);
            }
        })
    }
}

let list = new ListandElements(document.getElementById('list'));
list.createList();
list.createUpButton();

document.getElementById('byMap').addEventListener('click', () => scrollButtom('map'));
document.getElementById('byList').addEventListener('click', () => scrollButtom('list'));
