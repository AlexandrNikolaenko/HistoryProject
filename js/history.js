import { historyFacts } from "./modules.js";
import { elt } from "./modules.js";

var condition = {openElem: null};
const years = ['4554', '5564', '6574', '7584', '8591'];

class ChronoElement{
    constructor(text, url, id, section, position){
        this.position = {top: position.top, left: position.left};
        this.text = text;
        this.imgUrl = url;
        this.number = id;
        this.parent = section;
    }

    createOpenFact(){
        let close = elt('div', {class: 'close'}, elt('img', {src: '../img/close.svg'}));
        let element = elt('div', {class: 'open-fact'},
            elt('div', {class: 'fact-wrap'}, 
                elt('div', {class: 'full-img-block'}, elt('img', {src: this.imgUrl})),
                elt('p', {class:'full-text-block'}, this.text),
                close
            )
        );
        condition.openElem = element;
        close.addEventListener('click', () => {
            element.remove(); 
            condition.openElem = null
        });
        document.getElementsByTagName('body')[0].appendChild(element);
        return element;
    }

    createElem(){
        let element = elt('div', {class: 'fact-block', id: this.number}, 
            elt('div', {class: 'fact-img-block'}, elt('img', {src: this.imgUrl})),
            elt('p', {class: 'fact-short-text'}, this.text.slice(0, 99).concat('...'))
        );
        element.addEventListener('click', () => {
            if (condition.openElem) condition.openElem.remove();
            this.createOpenFact();
        });
        element.style = `top: ${this.position.top}px; left: ${this.position.left}px`;
        this.parent.appendChild(element);
        return element;
    }
}

class Chronolent{
    constructor(startPoint, width, largeDelta, littleDelta){
        this.storageValue = 0;
        this.startPoint = startPoint;
        this.windowWidth = width;
        this.largeDelta = largeDelta;
        this.littleDelta = littleDelta;
    }

    lentFunc(x){
        return  (this.windowWidth / 2) * (1 - Math.cos(2*(x - 60)));
    }

    createLent(){
        years.forEach(year => this.createBlock(year))
    }

    createBlock(year){
        let parent = document.getElementById(year);
        let padding = 0;
        parent.style['padding-bottom'] = `${padding}px`;
        historyFacts.forEach(fact => {
            if (fact.year == year){
                console.log(this.startPoint, this.lentFunc(this.startPoint));
                let element = new ChronoElement(fact.fulltext, fact.imgLink, historyFacts.indexOf(fact), parent, {top: this.startPoint - this.storageValue + this.largeDelta, left: this.lentFunc(this.startPoint)});
                padding += 200 + this.littleDelta;
                this.startPoint += element.createElem().getBoundingClientRect().height + this.littleDelta;
            }
        });
        this.startPoint += this.largeDelta;
        parent.style['padding-bottom'] = `${padding - this.littleDelta}px`;
        this.storageValue = this.startPoint;
    }
}

let lenta = new Chronolent(0, document.getElementsByClassName('wrapper')[0].getBoundingClientRect().width - 427, 85, 10);
lenta.createLent();