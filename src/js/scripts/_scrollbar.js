let sections = document.querySelectorAll('section');

let hui = document.styleSheets[0].rules || document.styleSheets[0].cssRules;

let styleBySelector = {};
for (let i=0; i<hui.length; i++)
    styleBySelector[hui[i].selectorText] = hui[i].style;


let scrollTimeout;

window.addEventListener('scroll', (e)=>{

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(changeScrollbarColor, 1000);
}, {passive: true});


function changeScrollbarColor(){


    let height = document.documentElement.clientHeight;

    let scrollHeight = window.pageYOffset;

    let sectionCounter = 0;

    while(scrollHeight >= 0){
        scrollHeight -= sections[sectionCounter].scrollHeight;
        sectionCounter++;
    }

    if(sections[sectionCounter - 1].getBoundingClientRect().bottom > height * 0.4){
        styleBySelector["body::-webkit-scrollbar-thumb"].backgroundColor = sections[sectionCounter - 1].dataset.scrollbar;
    } else {
        styleBySelector["body::-webkit-scrollbar-thumb"].backgroundColor = sections[sectionCounter].dataset.scrollbar;
    }

}