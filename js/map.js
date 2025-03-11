import { elt, dataList, categoryList } from "./modules.js";

let condition = {
    lastElem: null,
     scrollTop: false, 
     height: cropFunc((document.getElementsByClassName('change-box')[0].getBoundingClientRect().height - document.getElementById('place_for_text').getBoundingClientRect().height) * (window.innerWidth - 30) / 1240) + document.getElementById('place_for_text').getBoundingClientRect().height + 40};

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

function cropFunc(x){
    if (window.innerWidth < 435) return x**1.1;
    return x;
}

ymaps.ready(function() {
    let newMap = new ymaps.Map('map', {
        center: [59.963826, 30.306760],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    });

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
        let link = elt('a', {class: 'vuz-block', href: pageLink},
        elt('div', {class: 'img-vuz-box'}, elt('img', {src: imgLink})),
        elt('div', {class: 'text-vuz-box'}, 
            elt('h3', null, vuz),
            elt('p', null, fullname),
            elt('p', null, shortText)));
        if (window.innerWidth < 1300){
            link.style.width = `${(window,innerWidth - 30)}px`;
        }
        let block = elt('div', {class: 'show-vuz'}, link);
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
                document.getElementById('map').style.display = '';
            });
            if (window.innerWidth < 1000){
                document.getElementById('map').style.display = 'none';
                block.style.maxHeight = `${condition.height}px`;
                block.style.overflowY = 'scroll';
                block.style.width = 'max-content';
            }
            block.appendChild(close);
            console.log('done');
        }else{
            return block;
        }
    }

    createList(data = dataList){
        let filter = elt('div', {class: 'filter wrapper'});
        let list = elt('ul', {class: 'vuz-list'}, filter);
        data.forEach((vuz) => {
            list.appendChild(elt('li', {class: 'list-elem'}, this.createElement(vuz.university, vuz.fullname, vuz.shortText, vuz.imgLink, `./${vuz.pageLink}`, false)));
        });
        categoryList.forEach(category => {
            let button = elt('button', {class: 'filter-button'}, category);
            button.addEventListener('click', () => {
                this.createList(dataList.filter(vuz => vuz.category === category))
                this.place.removeChild(list);
            });
            filter.appendChild(button);
        });
        let allButton = elt('button', {class: 'filter-button'}, 'Сброс')
        allButton.addEventListener('click', () => {
            this.createList(dataList)
            this.place.removeChild(list);
        });
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
            condition.scrollTop = false;
        })
        this.place.addEventListener('scroll', () => {
            if (!condition.scrollTop) {
                this.place.parentNode.appendChild(up);
                condition.scrollTop = true;
            };
            if (this.place.scrollTop == 0){
                this.place.parentNode.removeChild(up);
                condition.scrollTop = false;
            }
        })
    }
}

function adaptive(){
    let win = window.innerWidth;
    let hei = (cropFunc(document.getElementsByClassName('change-box')[0].getBoundingClientRect().height - document.getElementById('place_for_text').getBoundingClientRect().height) * (win - 30) / 1240) + document.getElementById('place_for_text').getBoundingClientRect().height + 40;
    if (win < 1300){
        document.getElementsByClassName('map')[0].style.width = `${win - 30}px`;
        document.getElementById('map').style.width = `${win - 30}px`;
        document.getElementById('map').style.height = `${hei - document.getElementById('place_for_text').getBoundingClientRect().height - 40}px`;
        document.getElementById('list-box').style.width = `${win - 30}px`;
        document.getElementById('list').style.height = `${hei}px`;
        document.getElementsByClassName('change-box')[0].style.height = `${hei}px`;
        document.getElementsByClassName('filter')[0].style.maxWidth = `${win - 30}px`;
        Array.from(document.getElementsByClassName('vuz-block')).forEach(filter => {
                filter.style.width = `${(win - 30)}px`;
        });
    }
};

let list = new ListandElements(document.getElementById('list'));
list.createList();
list.createUpButton();

adaptive();

document.getElementById('byMap').addEventListener('click', () => scrollButtom('map'));
document.getElementById('byList').addEventListener('click', () => scrollButtom('list'));
