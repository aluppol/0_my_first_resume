
let inputs = document.querySelectorAll('.message__input');
inputs.forEach(function(input) {
    input.addEventListener('input', function() {
        // console.log(input.value);
        // console.log(input.value.length);
        if (input.value.length) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    });
});

// let btn = document.querySelector('#contactsSubmit');
// let form = document.querySelector('.contacts');

// btn.addEventListener('click', function() {
//     form.classList.add('validated');
// });