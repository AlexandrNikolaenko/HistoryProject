import { elt, sourses } from "./modules.js";

function createList(){
    let section = document.getElementsByClassName('links-block')[0];
    sourses.forEach(elem => {
        let block = elt('div', {class: 'sourse-block left-animate-onscroll'},
            elt('h5', null, elem.vuz),
            elt('ul', {class: 'lit-wrapper'}),
            elt('p', null, 'Ссылка на сайт университета:'),
            elt('div', {class: 'lit-wrapper'}, elt('a', {href: elem.vuzLink, }, elem.vuzLink))
        );
        for (let link of elem.links){
            block.childNodes[1].appendChild(
                elt('li', {class: 'lit-wrapper'}, elt('a', {href: link}, link)
            ));
        }
        section.appendChild(block);
    })
}

createList()