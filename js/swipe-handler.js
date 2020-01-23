// Swipe handler

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;
let alignmentToNav = true;

function getTouches(evt) {
return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;        
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    alignmentToNav = (xDown + xUp)*4/3 > window.innerWidth ? true : false;
    alignmentToNav = xUp < innerWidth/4 ? false : alignmentToNav;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if(!alignmentToNav) {
            if ( xDiff > 0 ) {
                /* left swipe */
                document.querySelector('#touch').checked = false;
            } else {
                /* right swipe */
                document.querySelector('#touch').checked = true;
            }  
        } else {
            if ( xDiff > 0 ) {
                /* left swipe */
                document.querySelector('#nav').checked = true;
            } else {
                /* right swipe */
                document.querySelector('#nav').checked = false;
            }  
        }                     
    } 
    else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            // document.querySelector('#touch').checked = false; classList.remove('full-view');
        } else { 
            /* down swipe */
            // document.querySelector('#touch').checked = false; classList.remove('full-view');
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

