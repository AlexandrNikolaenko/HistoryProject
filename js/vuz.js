var condition = {openFact: null}

function createFon(){
    let vuz = document.getElementsByTagName('body')[0].getAttribute('vuz');
    try{
        document.getElementsByTagName('section')[0].setAttribute('style', `background: url(../img/${vuz}-main.png) no-repeat top right`);
    }catch(e) {
        console.log(e);
    }
    try{
        document.getElementsByTagName('section')[1].setAttribute('style', `background: url(../img/${vuz}-second.png) no-repeat top left`);
    }catch(e) {
        console.log(e);
    }
}

function openFact(){
    let facts = document.getElementsByClassName('click-fact');
    console.log(facts);
    for (let i = 0; i < Array.from(facts).length; i++){
        facts[i].addEventListener('click', () => {
            document.getElementsByClassName('fact-active-block')[i].classList.add('full-fact');
            if (condition.openFact){
                condition.openFact.classList.remove('full-fact');
            }
            condition.openFact = document.getElementsByClassName('fact-active-block')[i];
            let func = function(){
                condition.openFact.classList.remove('full-fact');
                document.getElementsByClassName('close')[i].removeEventListener('click', func);
                condition.openFact = null;
            };
            document.getElementsByClassName('close')[i].addEventListener('click', func);
        });
    }
}

createFon();
openFact();