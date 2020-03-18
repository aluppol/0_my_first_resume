class Animations{

    animate({timing, draw, duration}) {

        let start = performance.now();
      
        requestAnimationFrame(function animate(time) {
          // timeFraction goes from 0 to 1
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
      
          // calculate the current animation state
          let progress = timing(timeFraction);
      
          draw(progress); // draw it
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }
      
        });
    }
}


class Box {
    constructor(box){

        class Door extends Animations{
            constructor(door, left = true){
                super();
                this.left = left;
                this.dom = door;
                this.transform = {
                    translateZ: left ? 0 : -100,
                    rotateX: left ? 270 : 90 //- closed 270 / 90 (open = 60 / 300) 
                }

                this.rebuildDom();
            }
            
            _constructTransform(){
                return `translateZ(${this.transform.translateZ}px) rotateX(${this.transform.rotateX}deg)`;
            }

            rebuildDom(){
                this.dom.style.transform = `${this._constructTransform()}`;
            }

            open(){
                this.transform.rotateX = this.left ? 60 : 300;
                this.rebuildDom();
            }

            close(){
                this.transform.rotateX = this.left ? 270 : 90;
                this.rebuildDom();
            }
        }
        


        this.dom = box;
        this.opened = false;
        this.transform = {
            rotateX : -20,
            rotateY : -80,
            rotateZ :  0,
            scaleY :  1,
            translateX :  0,
            translateY :  0,
            translateZ :  0,
        };
        this.leftDoor = new Door(this.dom.querySelector('.box__side--top-left'));
        this.rightDoor = new Door(this.dom.querySelector('.box__side--top-right'), false);

        this.rebuildDom();
    }

    _constructTransform(){
        return `rotateX(${this.transform.rotateX}deg) rotateY(${this.transform.rotateY}deg) rotateZ(${this.transform.rotateZ}deg) scaleY(${this.transform.scaleY}) translateX(${this.transform.translateX}px) translateY(${this.transform.translateY}px) translateZ(${this.transform.translateZ}px)`;
    }

    rebuildDom(){
        this.dom.style.transform = `${this._constructTransform()}`;
    }

    open(){
        this.leftDoor.open();
        this.rightDoor.open();
    }

    close(){
        this.leftDoor.close();
        this.rightDoor.close();
    }
}

let box = new Box(document.getElementById('skillsBox'));


setTimeout(()=>{box.open()}, 2000);

setTimeout(()=>{box.close()}, 4000);

tempWrapFn(); // ----------------------temp--------------------------

let setFE, setJS, setOther, setPM, supersetFE, supersetJS, supersetOther, supersetPM, hover;

// box.rebuildDom();

// setUpAnimationElements();


// functions


function closingBoxAnimation(){
    alert('Closed!');
}


function openBoxAnimation(){
    alert('Open!');
}


function setBoxTransformation(){

}


function setUpAnimationElements(){

    setBoxTransformation();

    box.dom.addEventListener('click', ()=>{

        box.opened = !box.opened;
        if(box.opened) {
            openBoxAnimation();
            return;
        }

        closingBoxAnimation();

    });

    setUpBoxWaitingAnimations();
}


function animateInfinite({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;

        if (timeFraction >= 1) {
            start = time;
            timeFraction = 0;
        }
  
        // calculate the current animation state
        let progress = timing(timeFraction);
  
        draw(progress); // draw it
  
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
  
    });
}


function animate({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // calculate the current animation state
      let progress = timing(timeFraction);
  
      draw(progress); // draw it
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
}


function tempWrapFn(){

    box.dom.hidden = true;

    let skills = document.querySelectorAll('.superset__item'),
        stack = document.querySelector('.stack');

    skills.forEach(skill=>{
        skill.classList.add('temp-skill-item-styles');
        stack.append(skill);
    });

    let temp = document.createElement('span');

    temp.innerHTML = "Sorry! This section is in production!"
    temp.classList.add('temp');

    stack.append(temp);
}