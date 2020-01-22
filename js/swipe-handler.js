// Swipe handler

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

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

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            document.querySelector('.nav').classList.remove('full-view');
        } else {
            /* right swipe */
            document.querySelector('.nav').classList.add('full-view');
        }                       
    } 
    else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            document.querySelector('.nav').classList.remove('full-view');
        } else { 
            /* down swipe */
            document.querySelector('.nav').classList.remove('full-view');
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

