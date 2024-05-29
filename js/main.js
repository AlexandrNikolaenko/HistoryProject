import { dataList } from "./modules.js";
import { elt } from "./modules.js";
import { categoryList } from "./modules.js";

// ячейка хранения стостояний некоторых элементов
var conditions = {openElement: null, clickLink: null};

// представляет собой весь функционал хедера
class Header{
    constructor(){
        this.universities = categoryList;
        this.list = document.getElementById('menu-list');
        this.list.setAttribute('open', 'false');
        this.menu_item = document.getElementsByClassName('.menu_item');
    }

    createDesktopMenu(){
        for (let ever of this.universities){
            let groupName = ever;
            let elem = elt('li', {'class': 'menu_item'}, elt('h5', {class: 'menu-title'}, groupName));
            dataList.filter((vuz) => vuz.category == ever).forEach((vuz) => {
                if (document.getElementsByTagName("body")[0].hasAttribute('index')){
                    elem.appendChild(elt('a', {class: 'vuz', href: `./pages/${vuz.pageLink}`}, vuz.university));
                }else{
                    elem.appendChild(elt('a', {class: 'vuz', href: `./${vuz.pageLink}`}, vuz.university));
                }
            }) 
            this.list.appendChild(elem);
        }
    }

    desktopMenuAct(time){
        if (this.list.getAttribute('open') == "true"){
            document.getElementsByTagName('img')[0].style.rotate = '';
            this.closeDesktopMenu(time / 2);
            this.list.setAttribute('open', 'false');
        }else{
            document.getElementsByTagName('img')[0].style.rotate = '180deg';
            this.openDesktopMenu(time);
            this.list.setAttribute('open', 'true');
        }
    }

    closeDesktopMenu(time){
        this.list.setAttribute('open', 'false');
        let menu = document.getElementById('menu-block');
        let condition = {height: Number(menu.style.height.slice(0, -2)), opac: Number(this.list.style.opacity)}
        let delta = {height: 400 / (time * 120 / 2), opac: 1 / (time * 120/ 2)};
        let halfDone = false;
        let hide = setInterval(() => {
            this.list.style.opacity = `${condition.opac - delta.opac}`;
            condition.opac -= delta.opac;
            if (condition.opac <= 0 || this.list.getAttribute('open') == "true"){
                this.list.style.opacity = '0';
                halfDone = true;
                clearInterval(hide);
                return;
            }  
        }, 1000 /120);
        let close = setInterval(() => {
            if (halfDone){
                menu.style.height = `${condition.height - delta.height}px`;
                condition.height -= delta.height;
                if (condition.height <= 0 || this.list.getAttribute('open') == "true"){
                    menu.style.height = '0';
                    clearInterval(close);
                    return;
                }
            }
        }, 1000 / 120);
    }

    openDesktopMenu(time){
        this.list.setAttribute('open', "true");
        let menu = document.getElementById('menu-block');
        let condition = {height: Number(menu.style.height.slice(0, -2)), opac: Number(this.list.style.opacity)}
        let delta = {height: 400 / (time * 120 / 2), opac: 1 / (time * 120 / 2)};
        let halfDone = false;
        let open = setInterval(() => {
            menu.style.height = `${condition.height + delta.height}px`;
            condition.height += delta.height;
            if (condition.height > 400 || this.list.getAttribute('open') == "false"){
                menu.style.height = '400px';
                halfDone = true;
                clearInterval(open);
                return;
            }
        }, 1000 / 120);
        let show = setInterval(() => {
            if (halfDone){
                this.list.style.opacity = `${condition.opac + delta.opac}`;
                condition.opac += delta.opac;
                if (condition.opac >= 1 || this.list.getAttribute('open') == "false"){
                    this.list.style.opacity = '1';  
                    clearInterval(show);
                    return;
                }  
            }
        }, 1000 / 120);
    }
    
    createMobileMenu(){
        for (let ever of this.universities){
            let groupName = ever;
            let elem = elt('li', {'class': 'menu_item'}, elt('p', null, groupName));
            elem.addEventListener('click', function (event) {
                if (conditions.clickLink){
                    conditions.clickLink = null;
                    console.log('none');
                    return;
                };
                event.preventDefault();
                if (conditions.openElement && conditions.openElement != elem){
                    conditions.openElement.removeChild(conditions.openElement.childNodes[1]);}
                if (elem.childNodes.length == 1){
                    let univWrap = document.createElement('ul');
                    univWrap.className = 'vuz-box';
                    univWrap.style.position = 'absolute';
                    dataList.filter((vuz) => vuz.category == ever).forEach((vuz) => {
                        if (document.getElementsByTagName('body')[0].hasAttribute('index')){
                            let link = elt('a', {'href': `./pages/${vuz.pageLink}`}, elt('div', null, vuz.university));
                            link.addEventListener('click', () => conditions.clickLink = true);
                            univWrap.appendChild(elt('li', {class: 'vuz-name'}, link));
                        }else{
                            let link = elt('a', {'href': `./${vuz.pageLink}`}, elt('div', null, vuz.university));
                            link.addEventListener('click', () => conditions.clickLink = true);
                            univWrap.appendChild(elt('li', {class: 'vuz-name'}, link));
                        }
                    });
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
    openMobileMenu(){
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
        this.size = {x: Number(getComputedStyle(animatedObject).width.slice(0, -2)), y: Number(getComputedStyle(animatedObject).height.slice(0, -2))};
        this.endPlace = {left: this.animatedObject.getBoundingClientRect().left, right: window.innerWidth - this.animatedObject.getBoundingClientRect().left - this.size.x, top: this.animatedObject.getBoundingClientRect().top};
        this.position = getComputedStyle(animatedObject).position;
        this.replace = elt('div', {style: `width: ${this.size.x}px; height: ${this.size.y}px`});
        if (animatedObject.hasAttribute('block')) this.scroll = 0;
        else this.scroll = window.scrollY;
    }

    cropeStartPosition(dir){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.before(this.replace);
        this.animatedObject.style.transform = 'scale(0)';
        this.animatedObject.style.top = `${this.endPlace.top + this.scroll - (this.size.y / 2)}px`;
        this.animatedObject.style[dir] = `${this.endPlace[dir] - (this.size.x / 2)}px`;
        this.animatedObject.style.width = `${this.size.x}px`;
        this.animatedObject.style.height = `${this.size.y}px`;
    }

    opacityStartPosition(){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.style.top = `${this.endPlace.top}px`;
        this.animatedObject.before(this.replace);
        this.animatedObject.style.opacity = '0';
        this.animatedObject.style.width = `${this.size.x}px`;
        this.animatedObject.style.height = `${this.size.y}px`;
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
            document.getElementsByTagName('body')[0].style['max-width'] = document.documentElement.clientWidth;
            Array.from(document.getElementsByTagName('section')).forEach((element) => element.style['max-width'] = document.documentElement.clientWidth);
            document.getElementsByTagName('header')[0].style['max-width'] = document.documentElement.clientWidth;
            this.animatedObject.style.right = `${condition.x + delta.x}px`;
            this.animatedObject.style.opacity = `${this.moveFunction(condition.opacity + delta.opac)}`;
            condition.x += delta.x;
            condition.opacity += delta.opac;
        }else if(!isOpacity && dir == 'right'){
            this.animatedObject.style.left = `${condition.x + delta.x}px`;
            condition.x += delta.x;            
        }else{
            throw new Error("Not correct animation");
        }
    }

    async cropMove(time, dir){
        // let wrapper = wrap(this.animatedObject);
        let condition = {scale: 0, y: this.endPlace.top + this.scroll - (this.size.y / 2), x: this.endPlace[dir] - (this.size.x / 2)};
        let delta = {scale: 1 / (120 * time), y: this.size.y / 2 / (120 * time), x: this.size.x / 2 / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(condition.scale - 1) <= delta.scale){
                this.animatedObject.style = "top: '', left: '', rigth: '', width: '', height: '', transform: ''";
                this.animatedObject.style.position = this.position;
                this.replace.remove();
                clearInterval(anim);
            }else{
                this.animatedObject.style.transform = `scale(${condition.scale + delta.scale})`;
                this.animatedObject.style.top = `${condition.y + delta.y}px`;
                this.animatedObject.style[dir] = `${condition.x + delta.x}px`;
                condition.x += delta.x;
                condition.y += delta.y;
                condition.scale += delta.scale;
            }
        }, 1000 / 120);
    }

    async leftMove(time){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.before(this.replace);
        let condition = {x: -this.size.x, y: this.endPlace.top + this.scroll};
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

    async rightMove(time){
        this.animatedObject.style.position = 'absolute';
        this.animatedObject.before(this.replace);
        let condition = {x: -this.size.x, y: this.endPlace.top + this.scroll};
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
    // Когда вызываем эту функцию необходимо обнулить положение при помощи opacityStartPosition()
    async opacityLeftMoveOnscroll(time){
        let condition = {opacity: 0, x: -this.size.x, y: this.endPlace.top + this.scroll};
        this.animatedObject.style.left = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        this.animatedObject.style.opacity = `${condition.opacity}`;
        let delta = {x: Math.abs(this.endPlace.left - condition.x) / (120 * time), opac: 1 / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(this.endPlace.left - condition.x) <= delta.x){
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
                condition.x = this.endPlace.left;
            }
            
        }, 1000 / 120);
    }
// Когда вызываем эту функцию необходимо обнулить положение при помощи opacityStartPosition()
    async opacityRightMoveOnscroll(time){
        let condition = {opacity: 0, x: -this.size.x, y: this.endPlace.top + this.scroll};
        this.animatedObject.style.right = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        this.animatedObject.style.opacity = `${condition.opacity}`;
        let delta = {x: Math.abs(this.endPlace.right - condition.x) / (120 * time), opac: 1 / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(this.endPlace.right - condition.x) <= delta.x){
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
                condition.x = this.endPlace.right;
            }
        }, 1000 / 120);
    }

// Когда вызываем эту функцию необходимо обнулить положение при помощи opacityStartPosition()
    async opacityLeftMoveOnload(time){
        let condition = {opacity: 0, x: -this.size.x, y: this.endPlace.top + this.scroll};
        this.animatedObject.style.left = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        this.animatedObject.style.opacity = `${condition.opacity}`;
        let delta = {x: Math.abs(this.endPlace.left - condition.x) / (120 * time), opac: 1 / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(this.endPlace.left - condition.x) <= delta.x){
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
                condition.x = this.endPlace.left;
            }
            
        }, 1000 / 120);
        console.log('done');
    }
// Когда вызываем эту функцию необходимо обнулить положение при помощи opacityStartPosition()
    async opacityRightMoveOnload(time){
        let condition = {opacity: 0, x: -this.size.x, y: this.endPlace.top + this.scroll};
        this.animatedObject.style.right = `${condition.x}px`;
        this.animatedObject.style.top = `${condition.y}px`;
        this.animatedObject.style.opacity = `${condition.opacity}`;
        let delta = {x: Math.abs(this.endPlace.right - condition.x) / (120 * time), opac: 1 / (120 * time)};
        let anim = setInterval(() => {
            if (Math.abs(this.endPlace.right - condition.x) <= delta.x){
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
                condition.x = this.endPlace.right;
            }
        }, 1000 / 120); 
        console.log('done');
    }
}

let menu = document.getElementById('menu');
let body = document.getElementsByTagName('body')[0];
if (document.documentElement.clientWidth <= 768){
    if (body.hasAttribute('index')){
        menu.appendChild(elt('img', {src: "./img/menu.svg", alt: "menu", id: "menu-lines", style: "cursor: pointer;"}));
    }else{
        menu.appendChild(elt('img', {src: "../img/menu.svg", alt: "menu", id: "menu-lines", style: "cursor: pointer;"}));
    }
    menu.appendChild(elt('ul', {id: "menu-list", style: "display: none; cursor: pointer;"}));
}else{
    menu.appendChild(elt('p', null, 'Университеты'));
    if (body.hasAttribute('index')){
        menu.appendChild(elt('img', {src: "./img/menu-sparrow.svg", alt: "menu-sparrow", id: "menu-sparrow"}));
    }else{
        menu.appendChild(elt('img', {src: "../img/menu-sparrow.svg", alt: "menu-sparrow", id: "menu-sparrow"}));
    }
    document.getElementsByTagName('header')[0].before(elt('div', {id: 'menu-block', style: 'height: 0'}, elt('ul', {id: "menu-list", class: 'wrapper', style: 'opcity: 0'})));
}
let header = new Header;
header.backFon();
if (document.documentElement.clientWidth <= 768){
    body.onload = function() {header.createMobileMenu();};
    document.getElementById('menu-lines').addEventListener('click', function() {header.openMobileMenu();});
}else{
    body.onload = function() {header.createDesktopMenu();};
    document.getElementById('menu').addEventListener('click', function() {header.desktopMenuAct(1);})
}

async function createAnimate(timer){
    // делаем анимацию текста
    for (let animElem of document.getElementsByClassName('left-animate-onload')){
        let animation = new newAnimation(animElem);
        animation.opacityStartPosition();
        await animation.opacityLeftMoveOnload(timer);
    }
    for (let animElem of document.getElementsByClassName('right-animate-onload')){
        let animation = new newAnimation(animElem);
        animation.opacityStartPosition();
        await animation.opacityRightMoveOnload(timer);
    }
    for (let animElem of document.getElementsByClassName('left-animate-onscroll')){
        let animation = new newAnimation(animElem);
        animation.opacityStartPosition();
        let func = async function () {
            if (window.innerHeight >= animElem.getBoundingClientRect().y){
                await animation.opacityLeftMoveOnscroll(timer);
                window.removeEventListener('scroll', func);
            }
        }
        window.addEventListener('scroll', func);
    }
    for (let animElem of document.getElementsByClassName('right-animate-onscroll')){
        let animation = new newAnimation(animElem);
        animation.opacityStartPosition();
        let func = async function () {
            if (window.innerHeight >= animElem.getBoundingClientRect().y){
                await animation.opacityRightMoveOnscroll(timer);
                window.removeEventListener('scroll', func);
            }
        }
        window.addEventListener('scroll', func);
    }  
    // делаем анимацию фактов
    if (document.getElementsByTagName('body')[0].hasAttribute('vuz')){
        let crops = {
            leftOnload: document.getElementsByClassName('left-crop-animate-onload'),
            rightOnload: document.getElementsByClassName('right-crop-animate-onload'),
            leftOnscroll: document.getElementsByClassName('left-crop-animate-onscroll'),
            rightOnscroll: document.getElementsByClassName('right-crop-animate-onscroll')
        }
        if(crops.leftOnload){
            for (let animElem of crops.leftOnload){
                let animation = new newAnimation(animElem);
                animation.cropeStartPosition('left');
                await animation.cropMove(timer, 'left');
            }
        }if(crops.rightOnload){
            for (let animElem of crops.rightOnload){
                let animation = new newAnimation(animElem);
                animation.cropeStartPosition('right');
                await animation.cropMove(timer, 'right');
            }
        }if(crops.leftOnscroll){
            for (let animElem of crops.leftOnscroll){
                let animation = new newAnimation(animElem);
                animation.cropeStartPosition('left');
                let func = async function () {
                    if (document.documentElement.clientHeight >= animElem.getBoundingClientRect().top){
                        await animation.cropMove(timer, 'left');
                        window.removeEventListener('scroll', func);
                    }
                }
                window.addEventListener('scroll', func);
            }    
        }if(crops.rightOnscroll){
            for (let animElem of crops.rightOnscroll){
                let animation = new newAnimation(animElem);
                animation.cropeStartPosition('right');
                let func = async function () {
                    if (document.documentElement.clientHeight >= animElem.getBoundingClientRect().top){
                        await animation.cropMove(timer,'right');
                        window.removeEventListener('scroll', func);
                    }
                }
                window.addEventListener('scroll', func);
            } 
        }
    }
}
createAnimate(0.8);