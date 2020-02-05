(()=>{
    'use strict';

    addTimeToEmployments();


    // functions


    function addTimeToEmployments(){
        let jobs = document.querySelectorAll('.job'),
            rembud = jobs[0].querySelector('.job__time'),
            cpi = jobs[1].querySelector('.job__time'),
            boeing = jobs[2].querySelector('.job__time'),
            now = new Date(),
            rembudStartDate =  new Date(2018, 6),
            cpiStopDate = rembudStartDate,
            boeingStopDate = new Date(2017, 10);

        rembud.innerHTML = `working within ${getTimeStringFromTo(rembudStartDate, now)}`;    
        cpi.innerHTML = `worked ${getTimeStringFromTo(cpiStopDate, now)} ago`;  
        boeing.innerHTML = `worked ${getTimeStringFromTo(boeingStopDate, now)} ago`;     
    }


    function getTimeStringFromTo(dateObjFrom, dateObjTo = new Date()){

        let years = 0,
            months = 0,
            days = 0,
            from = new Date(dateObjFrom.getTime()),
            to = new Date(dateObjTo.getTime());

        while(from.getDate() != to.getDate()){
            to.setDate(to.getDate()-1);
            ++days;
        }
        while(from.getMonth() != to.getMonth()){
            to.setMonth(to.getMonth()-1);
            ++months;
        }
        while(from.getFullYear() != to.getFullYear()){
            to.setFullYear(to.getFullYear()-1);
            ++years;
        }
        return `${years > 0 ? years + ' year'+ (years == 1 ? " " : "s ") : ''}${months > 0 ?( months + ' month' + (months == 1 ? " " : "s ")) : ''}`;
    }
})();