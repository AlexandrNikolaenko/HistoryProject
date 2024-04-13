import {Universities} from './db';
console.log(Universities);

Universities.findAll({
    where: {
        category: 'Технические'
    }
}).then((list) => {list.forEach((element) => console.log(element.university))});