class Animations{

    _animate({timing, draw, duration}, event) {

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
          } else if(event){
            document.dispatchEvent(event);
          }
      
        });
    }
}


class Box{
    constructor(box){

        class Door{
            constructor(door, left = true){
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
            rotateX : 0,    //-20
            rotateY : -80,
            rotateZ :  0,
            scaleY :  1,
            scaleX :  1,
            scaleZ :  1,
            translateX :  0,
            translateY :  window.innerHeight * 0.4,
            translateZ :  0,
        };
        this.leftDoor = new Door(this.dom.querySelector('.box__side--top-left'));
        this.rightDoor = new Door(this.dom.querySelector('.box__side--top-right'), false);

        this.rebuildDom();
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

    jump(){
        
        let speed = 20;

        this.dom.addEventListener('preparedToJump', function (e){
            // console.log('prepared to jump!');

            accelerate.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('accelerated', function (e){
            // console.log('accelerated!');
            flyUp.apply(this);
            this.dom.style.transformOrigin = "center center -50px";

        }.bind(this), {once: true});

        this.dom.addEventListener('flyedUp', function (e){
            // console.log('flyedUp!');

            this.dom.style.transformOrigin = "";
            fallDown.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('falledDown', function (e){
            // console.log('falledDown!');

            grounding.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('grounded', function (e){
            // console.log('grounded!');

            groundSwing.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('groundSwinged', function (e){
            // console.log('All Done!');

        }.bind(this), {once: true});

        
        prepareToJump.apply(this);


        // functions


        function groundSwing(){


            let timing  = function (timeFraction){

                    let x = 1.5;

                    timeFraction = 1 - timeFraction;
                    //linear
                    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
                },

                draw = (progress)=>{this._deformate(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 100 * speed,
            }, new Event('groundSwinged'));
        }


        function grounding(){

            
            let timing  = function (timeFraction){

                return 1-(--timeFraction)*timeFraction*timeFraction*timeFraction;
            },

            draw = (progress)=>{this._deformate(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 10 * speed,
            }, new Event('grounded'));
        }



        function fallDown(){

            let timing  = function (timeFraction){

                    return timeFraction*timeFraction*timeFraction;
                },

                draw = (progress)=>{this._translateY(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 50 * speed,
            }, new Event('falledDown'));
        }


        function flyUp(){

            let timing  = function (timeFraction){

                    return (--timeFraction)*timeFraction*timeFraction+1;
                },

                draw = (progress)=>{
                    this._translateY(progress);
                };


            this._animate({
                timing: timing,
                draw,
                duration: 70 * speed,
            }, new Event('flyedUp'));
        }


        function accelerate(){

            let max = -10;

            let timing  = function (timeFraction){

                    let x = 1.5;

                    timeFraction = 1 - timeFraction;
                    //linear
                    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
                },

                draw = (progress)=>{
                    this._deformate(1 - progress);
                   
                    if(1 - progress <= max || 1 - progress >= 1){
                        this.dom.dispatchEvent(new Event('accelerated'));
                    } else{
                        max = 1 - progress;
                    }
                };


            this._animate({
                timing: timing,
                draw,
                duration: 100 * speed,
            });
        }


        function prepareToJump(){

            let timing  = function (timeFraction){

                    return timeFraction*(2-timeFraction);
                },

                draw = (progress)=>{this._deformate(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 50 * speed,
            }, new Event('preparedToJump'));
        }
    }

    _constructTransform(){
        return `translateX(${this.transform.translateX}px) translateY(${this.transform.translateY}px) translateZ(${this.transform.translateZ}px) rotateX(${this.transform.rotateX}deg) rotateY(${this.transform.rotateY}deg) rotateZ(${this.transform.rotateZ}deg) scaleY(${this.transform.scaleY}) scaleX(${this.transform.scaleX}) scaleZ(${this.transform.scaleZ})`;
    }

    _deformate(sc){ //sc (scale) 1 - scale = 1; 0 - min deformation; 2 - max deformation

        let minDef  = 0.6;

            sc = minDef + (1 - minDef) * sc

        let scaleNew = {
            y: sc,
            x: 1 + (1 - sc)**2 * (sc > 1 ? -1 : 1),
            z: 1 + (1 - sc)**2 * (sc > 1 ? -1 : 1),
        }

        this.transform.scaleX = scaleNew.x;
        this.transform.scaleY = scaleNew.y;
        this.transform.scaleZ = scaleNew.z;

        this.rebuildDom();
    }

    _translateY(y){ // 0 - 1 amount

        let maxY = window.innerHeight * 0.2,
            minY = -window.innerHeight * 0.4;

        y = Math.abs(maxY - minY) * y + minY;

        this.transform.translateY = -y;

        this.rebuildDom();
    }

    _animate({timing, draw, duration}, event) {

        let start = performance.now();
      
        requestAnimationFrame(function animate(time) {
          // timeFraction goes from 0 to 1
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
      
          // calculate the current animation state
          let progress = timing(timeFraction);
      
          draw(progress); // draw it
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate.bind(this));
          } else if(event){
            this.dom.dispatchEvent(event);
          }
      
        }.bind(this));
    }
}

let box = new Box(document.getElementById('skillsBox'));

// setTimeout(()=>{box.open()}, 2000);

// setTimeout(()=>{box.close()}, 4000);

box.jump();

// box._deformate(1.2);


let interval = setInterval(()=>{

    box.jump();

}, 7000);

