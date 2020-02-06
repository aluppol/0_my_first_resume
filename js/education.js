(()=>{
    'use strict';
    
    let imgs = document.querySelectorAll('.poster__img');
    // console.log(imgs.length);
    imgs.forEach( function (img){
        let imgClass = ((img.naturalWidth / img.naturalHeight) < 1.375) ? 'poster__img--tall' : 'poster__img--wide';
        // console.log((img.naturalHeight / img.naturalWidth));
        img.classList.add(imgClass);
    });
})();