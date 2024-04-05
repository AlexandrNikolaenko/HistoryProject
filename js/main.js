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
    console.log('elem has created');
    return elem;
}


class Header{
    constructor(){
        this.universities = {'технические': ['Бонч', 'Техноложка', 'Корабелка', 'ГУАП', 'ГАСУ', 'Путей сообщения', 'ЛЭТИ', 'Горный', 'СПбГУ', 'ИТМО', 'Политех', 'Военмех', 'Лесопилка', 'Тряпка'],
        'военные': ['Буденова', 'Можайка'],
        'гуманитарные': ['ГИК', 'Репина', 'Герцена', 'Ваганова', 'РГИСИ', 'Лесгофта', 'Римского-Корсакова'],
        'медицинские': ['Первый мед', 'Мечникова']};
        this.list = document.getElementById('menu-list');
        this.list.setAttribute('open', 'false');
        this.menu_item = document.getElementsByClassName('.menu_item');
    }

    createMenu(){
        for (let group of Object.keys(this.universities)){
            let elem = elt('li', {'class': 'menu_item'},
            elt('p', {'open': 'false'}, group));
            elem.addEventListener('click', function () {
                if (elem.childNode.length == 1){
                    let univWrap = document.createElement('ul');
                    univWrap.className = 'vuz-box';
                    univWrap.style.position = 'absolute';
                    for (let vuz of this.universities[group]){
                        univWrap.appendChild(elt('li', {class: '.vuz-name'},
                        elt('p', null, vuz)));
                    }
                }else {

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
        

let header = new Header;
header.backFon();
document.getElementsByTagName('body')[0].onload = function() {header.createMenu(); console.log('load')};
document.getElementById('menu-lines').addEventListener('click', function() {header.openMenu()});

