// ячейка хранения стостояний некоторых элементов
var conditions = {openElement: null};

// функция создания новых элементов
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
function wrap(element, width, height){
    let newDiv = elt('div', {style: `width: ${width}; height: ${height}; position: relative;`}, elem);
    element.before(newDiv);
    element.remove();
    return newDiv
}

// представляет собой весь функционал хедера
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


    // при загрузке страницы создаём меню с категориями универов
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
                        if (document.getElementsByTagName('body')[0].hasAttribute('index')){
                            univWrap.appendChild(elt('li', {class: 'vuz-name'},
                            elt('a', {'href': `./pages/${ever[i]}.html`}, elt('div', null, ever[i]))));
                        }else{
                            univWrap.appendChild(elt('li', {class: 'vuz-name'},
                            elt('a', {'href': `../${ever[i]}.html`}, elt('div', null, ever[i]))));
                        }
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
    // открываем меню по клику
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

    // изменяем фон хедера по скроллу
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
// представляет собой весь набор анимаций элементов задействованных на сайте
class newAnimation{
    constructor(animatedObject){
        this.animatedObject = animatedObject;
        this.endPlace = {left: this.animatedObject.getBoundingClientRect().left, right: this.animatedObject.getBoundingClientRect().right, top: this.animatedObject.getBoundingClientRect().top};
        this.size = {x: Number(getComputedStyle(animatedObject).width.slice(0, -2)), y: Number(getComputedStyle(animatedObject).height.slice(0, -2))};
        this.position = getComputedStyle(animatedObject).position;
        this.replace = elt('div', {style: `width: ${this.size.x}px; height: ${this.size.y}px`});
    }

    cropeStartPosition(dir){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.style.width = '0px';
        this.animatedObject.style.height = '0px';
        this.animatedObject.style.top = '0px';
        this.animatedObject.style[dir] = '0px';
    }

    opacityStartPosition(){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.before(this.replace);
        this.animatedObject.style.opacity = '0';
    }

    horizontalStartPosition(dir){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.before(this.replace);
        this.animatedObject.style.top = this.endPlace.top;
        if (dir == 'right'){
            this.animatedObject.style.right = `${-this.size.x}px`;
        }else{
            this.animatedObject.style.left = `${-this.size.x}px`;
        }
    }

    moveFunction(x){
        let y = x * x * x * x;
        return y;
    }

    process(condition, delta, isOpacity, dir){
        if (isOpacity && dir == 'left'){
            this.animatedObject.style.left = `${condition.x + delta.x}px`;
            this.animatedObject.style.opacity = `${this.moveFunction(condition.opacity + delta.opac)}`
            condition.x += delta.x;
            condition.opacity += delta.opac;
        }else if(!isOpacity && dir == 'left'){
            this.animatedObject.style.left = `${condition.x + delta.x}px`;
            condition.x += delta.x;
        }else if(isOpacity && dir == 'right'){
            // document.getElementsByTagName('body')[0].style['max-width'] = document.documentElement.clientWidth;
            // Array.from(document.getElementsByTagName('section')).forEach((element) => {element.style['max-width'] = document.documentElement.clientWidth;})
            // document.getElementsByTagName('header')[0].style['max-width'] = document.documentElement.clientWidth;
            this.animatedObject.style.right = `${condition.x + delta.x}px`;
            this.animatedObject.style.opacity = `${this.moveFunction(condition.opacity + delta.opac)}`;
            condition.x += delta.x;
            condition.opacity += delta.opac;
        }else if(!isOpacity && dir == 'right'){
            // document.getElementsByTagName('body')[0].style['max-width'] = document.documentElement.clientWidth;
            // document,getElementsByTagName('header')[0].style['max-width'] = document.documentElement.clientWidth;
            this.animatedObject.style.left = `${condition.x + delta.x}px`;
            condition.x += delta.x;            
        }else{
            throw new Error("Not correct animation");
        }
    }

    async cropMove(time){
        let wrapper = wrap(this.animatedObject);
        let condition = {x: 0, y: 0};
        let delta = {x: this.size.x / (120 * time), y: this.size.y / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(condition.x - this.size.x) >= delta.x && Math.abs(condition.y - this.size.y) >= delta.y){
                this.animatedObject.style = "width: ''; height: '';"
                wrapper.before(this.animatedObject);
                this.animatedObject.style.position = this.position;
                wrapper.remove();
                clearInterval(anim);
            }else{
                this.animatedObject.style.width = `${condition.x + delta.x}px`;
                condition.x += delta.x;
                this.animatedObject.style.height = `${condition.y + delta.y}px`;
                condition.y += delta.y;
            }
        }, 1000 / 120);
    }

    async leftMove(time){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.before(this.replace);
        let condition = {x: -this.size.x, y: this.endPlace.top};
        let result = this.endPlace.left
        this.animatedObject.style.left = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        let delta = {x: Math.abs(this.endPlace.left - condition.x) / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(result - condition.x) <= delta.x){
                clearInterval(anim);
                this.animatedObject.style = "left: ''; top: '';"
                this.replace.remove();
                this.animatedObject.style.position = this.position;
                return;
            };
            this.process(condition, delta, false, 'left');
        }, 1000 / 120); 
    }

    async rightMove(){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.before(this.replace);
        let condition = {x: -this.size.x, y: this.endPlace.top};
        let result = this.endPlace.right
        this.animatedObject.style.right = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        let delta = {x: Math.abs(this.endPlace.right - condition.x) / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(result - condition.x) <= delta.x){
                clearInterval(anim);
                this.animatedObject.style = "right: ''; top: '';"
                this.replace.remove();
                this.animatedObject.style.position = this.position;
                return;
            };
            this.process(condition, delta, false, 'left');
        }, 1000 / 120); 

    }

    verticalMove(){
    }

    leftArc(){

    }

    rightArc(){

    }

// Когда вызываем эту функцию необходимо обнулить положение при помощи opacityStartPosition()
    async opacityLeftMoveOnload(time){
        let condition = {opacity: 0, x: -this.size.x, y: this.endPlace.top};
        let result = this.endPlace.left;
        this.animatedObject.style.left = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        this.animatedObject.style.opacity = `${condition.opacity}`;
        let delta = {x: Math.abs(this.endPlace.left - condition.x) / (120 * time), opac: 1 / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(result - condition.x) <= delta.x){
                clearInterval(anim);
                this.animatedObject.style = "left: ''; top: ''; opacity: '';"
                this.replace.remove();
                this.animatedObject.style.position = this.position;
                return;
            };
            try{
                this.process(condition, delta, true, 'left');
            }catch (e){
                console.log(e);
                condition.x = result;
            }
            
        }, 1000 / 120); 
    }
// Когда вызываем эту функцию необходимо обнулить положение при помощи opacityStartPosition()
    async opacityRightMoveOnload(time){
        let condition = {opacity: 0, x: -this.size.x, y: this.endPlace.top};
        let result = this.endPlace.right;
        this.animatedObject.style.right = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        this.animatedObject.style.opacity = `${condition.opacity}`;
        let delta = {x: Math.abs(this.endPlace.right - condition.x) / (120 * time), opac: 1 / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(result - condition.x) <= delta.x){
                clearInterval(anim);
                this.animatedObject.style = "right: ''; top: ''; opacity: '';"
                this.replace.remove();
                this.animatedObject.style.position = this.position;
                document.getElementsByTagName('body')[0].removeAttribute('style');
                return;
            };
            try{
                this.process(condition, delta, true, 'right');
            }catch (e){
                console.log(e);
                condition.x = result;
            }
        }, 1000 / 120); 
    }
}
 
async function createAnimate(){
    let animationsElems = [];
    for (let animElem of document.getElementsByClassName('left-animate-onload')){
        animation = new newAnimation(animElem);
        animation.opacityStartPosition('left', true);
        animationsElems.push(animation);
    }
    for (let animation of animationsElems){
        await animation.opacityLeftMoveOnload(1);
    };
}
 createAnimate();

let header = new Header;
header.backFon();
document.getElementsByTagName('body')[0].onload = function() {header.createMenu();};
document.getElementById('menu-lines').addEventListener('click', function() {header.openMenu();});