
(()=>{
    'use strict';

    myCarosel();

    function myCarosel(){

        let box = document.getElementById('portfolio').querySelector('.portfolio-slider'),
        slides = box.querySelectorAll('.portfolio-slider>div');

        // slides.forEach(slide=>{
        //     slide.style.display = "inline-block";
        // });

        let width = slides[0].offsetWidth;

        let h = width/2 * Math.tan(180 / slides.length * Math.PI / 180);

        box.style.transform = `rotateY(0deg) translateZ(-${h}px)`;

        slides.forEach((slide, i)=>{
            slide.style.cssText = `
                transform: rotateY(${360 / slides.length * i}deg) translateZ(${h}px);
            `;
        });


        //left btn

        let left = document.getElementById('sliderRotateLeft'),
            right = document.getElementById('sliderRotateRight'),
            rotationAngle = 0,
            rotationStep = 360 / slides.length;


        left.onclick = ()=>{
            rotationAngle -= rotationStep;
            box.style.transform = "translateZ(-" + h + "px) rotateY(" + rotationAngle + "deg) ";
        };

        right.onclick = ()=>{
            rotationAngle += rotationStep;
            box.style.transform = "translateZ(-" + h + "px) rotateY(" + rotationAngle + "deg) ";
        };



        


        

    }
})();

