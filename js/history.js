import { historyFacts } from "./modules";
import { elt } from "./modules";

var condition = {openElem: null};
const years = ['4554', '5564', '6574', '7584', '8591'];

class ChronoElement{
    constructor(text, url, id, arrow){
        this.text = text;
        this.imgUrl = url;
        this.number = id;
        if (arrow.startPoint) this.startPoint = arrow.startPoint;
        if (arrow.endPoint) this.endPoint = arrow.startPoint;
    }

    createOpenFact(){
        let close = elt('div', {class: 'close'}, elt('img', {src: '../img/close.svg'}));
        let element = elt('div', {class: 'open-fact'},
            elt('div', {class: 'full-img-block'}, elt('img', {src: this.imgUrl})),
            elt('div', {class:'full-text-block'}, this.text),
            close
        );
        condition.openElem = element;
        close.addEventListener('click', () => {
            element.remove(); 
            condition.openElem = null
        });
        return element;
    }

    eventElem(){
        
    }

    createElem(){
        element = elt('div', {class: 'fact-block', id: this.number}, 
            elt('div', {class: 'fact-img-block'}, elt('img', {src: this.imgUrl})),
            elt('div', {class: 'fact-short-text'}, text)
        )
        element.addEventListener('click', () => this.eventElem());
        return element;
    }
}

class Chronolent{
    constructor(startPoint){
        this.startPoint = startPoint;
    }

    lentFunc(x){
        return  -Math.cos(x);
    }

    createLent(){
        years.forEach(year => this.createBlock(year))
    }

    createBlock(year){
        
    }
}