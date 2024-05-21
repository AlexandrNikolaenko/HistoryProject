import { sourses, persons, elt } from "./modules.js";

function createLinks(){
    let sectionVuz = document.getElementsByClassName('vuzSection')[0];
    let sectionPersons = document.getElementsByClassName('personSection')[0];
    sourses.forEach(vuz => {
        sectionVuz.appendChild(elt('div', {class: 'vuzBlock lit-wrapper left-animate-onscroll'}, 
            elt('p', null, `${vuz.vuz}:`),
            elt('a', {href: vuz.vuzLink}, vuz.vuzLink)
        ));
    });
    persons.forEach(person => {
        sectionPersons.appendChild(elt('div', {class: 'personBlock lit-wrapper left-animate-onscroll'},
            elt('p', null, `${person.name}:`),
            elt('a', {href: person.link}, person.link)
        ));
    });
}

createLinks();