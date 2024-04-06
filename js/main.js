var conditions = {openElement: null};

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


class Header{
    constructor(){
        this.universities = [[ 'Технические', 'Бонч', 'Техноложка', 'Корабелка', 'ГУАП', 'ГАСУ', 'ПГУПС', 'ЛЭТИ', 'Горный', 'СПбГУ', 'ИТМО', 'Политех', 'Военмех', 'Лесопилка', 'Тряпка'],
        ['Военные', 'Буденова', 'Можайка'],
        ['Гуманитарные', 'ГИК', 'Репина', 'Герцена', 'Ваганова', 'РГИСИ', 'Лесгофта', 'Римского-Корсакова'],
        ['Медицинские', 'Первый мед', 'Мечникова']];
        this.list = document.getElementById('menu-list');
        this.list.setAttribute('open', 'false');
        this.menu_item = document.getElementsByClassName('.menu_item');
    }

    createMenu(){
        for (let ever of this.universities){
            let group = ever[0];
            let elem = elt('li', {'class': 'menu_item'},
            elt('p', null, group));
            elem.addEventListener('click', function () {
                if (conditions.openElement && conditions.openElement != elem){
                    conditions.openElement.removeChild(conditions.openElement.childNodes[1]);
                    conditions.openElement = null;
                }
                if (elem.childNodes.length == 1){
                    let univWrap = document.createElement('ul');
                    univWrap.className = 'vuz-box';
                    univWrap.style.position = 'absolute';
                    for (let i = 1; i < ever.length; i++){
                        univWrap.appendChild(elt('li', {class: 'vuz-name'},
                        elt('a', {'href': `./pages/${ever[i]}.html`}, elt('div', null, ever[i]))));
                    }
                    elem.appendChild(univWrap);
                    conditions.openElement = elem;
                }else {
                    elem.removeChild(elem.childNodes[1]);
                    conditions.openElement = null;
                }
            });
            this.list.appendChild(elem);
        }
    }

    openMenu(){
        if (this.list.getAttribute('open') == "true") {
            this.list.style.display = 'none';
            this.list.setAttribute('open', "false");
            document.getElementById('menu-lines').style.transform = 'rotate(0)';
            return;
        }
        document.getElementById('menu-lines').style.transform = 'rotate(180deg)';
        this.list.style.display = 'block';
        this.list.setAttribute('open', "true");
    }

    backFon(){
        window.addEventListener('scroll', function(){
            let position = this.window.scrollY;
            let newVal;
            if (position < 248 && position > 124) newVal = 0.74 * (Math.cos((Math.PI / 2) * (( 248 - position) / 124)));
            else if (position >= 248) newVal = 0.74;
            else newVal = 0;
            document.documentElement.style.setProperty('--header-fon', `rgba(25, 25, 25, ${newVal})`);
        });
    }
}

class Animation{
    constructor(animatedObject){
        this.endPlace = {x: animatedObject.pageX, y: animatedObject.pageY};
        this.size = {x: animatedObject.style.width, y: animatedObject.style.height};
        this.position = animatedObject.style.position
    }

    process(startPosition, action, endPosition, direct){
        animatedObject.style.position = 'absolute';
        animatedObject.style.top = startPosition.y;
        animatedObject.style.left = startPosition.x;
        let go = setInterval(function() {
            if ({x: animatedObject.style.left, y: animatedObject.style.top} == endPosition){
                clearInterval(go);
            }
            action.x(animatedObject.style[direct]);
            action.y(animatedObject.style.top);
        }, 8.5);
    }

    leftMove(timer){
        let delta = 
        this.process({x: `-${this.size.x}`, y: `${this.endPlace.y}`}, {
            x: function(position){
                position = `${Number(position) + delta}px`;
            },
            y: function(position){
                position = position;
            }
        }, {x: this.endPlace.x, y: this.endPlace.y}, 'left')
        animatedObject.style.position = 'static';
    }

    rightMove(){

    }

    topMove(){

    }

    leftArc(){

    }

    rightArc(){

    }

    opacityLeftMove(){

    }

    opacityRightMove(){

    }
}
        

let header = new Header;
header.backFon();
document.getElementsByTagName('body')[0].onload = function() {header.createMenu();};
document.getElementById('menu-lines').addEventListener('click', function() {header.openMenu();});
console.log(document.getElementById('menu-lines').left);


