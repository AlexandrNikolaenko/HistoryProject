import { historyFacts } from "./modules";
import { elt } from "./modules";

var condition = {openElem: null};
const years = ['4554', '5564', '6574', '7584', '8591'];

class ChronoElement{
    constructor(text, url, id){
        this.text = text;
        this.imgUrl = url;
        this.number = id
    }

    createOpenFact(){
        let element = elt('div', {class: 'open-fact'},
            elt('div', {class: 'full-img-block'}, elt('img', )),
            elt('div', {class:'full-text-block'}, this.text),
            elt('div', {class: 'close'}, elt('img', {src: '../img/close.svg'}))
        );
        condition.openElem = element;
        return element;
    }

    eventElem(){

    }

    createElem(){
        element = elt('div', {class: 'fact-block', id: this.number}, 
            elt('div', {class: 'fact-img-block'}, elt('img', {src: this.imgUrl})),
            elt('div', {class: 'fact-short-text'}, text)
        )
    }
}

class Chronolent{
    constructor(startPoint){
        this.startPoint = [];
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