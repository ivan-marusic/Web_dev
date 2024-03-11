document.querySelector("#show-register").addEventListener("click", function() {
    document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click", function() {
    document.querySelector(".popup").classList.remove("active");
});


let inputs = document.querySelectorAll('input');
let errors = {
    "ime_prezime": [], 
    "korisnicko_ime": [],
    "email": [],
    "lozinka": [],
    "ponovi_lozinku": []
}; //objekt za smještanje greški

inputs.forEach(element => {
    element.addEventListener('change', e => {
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

        if (inputValue.length > 4) {
            errors[inputName] = [];

            switch(inputName) {
                case 'ime_prezime':
                    let validation = inputValue.trim();
                    validation = validation.split(" ");
                    if(validation.length < 2){
                        errors[inputName].push('Write Name and Surname in Field')                        
                    }
                break;
                
                case 'email':
                    if(!validateEmail(inputValue)) {
                        errors[inputName].push('Email is not correct!');
                    } 
                break;

                case 'ponovi_lozinku':
                    let lozinka = document.querySelector(`input[name="lozinka"]`).value;
                    if(inputValue !==lozinka) {
                        errors[inputName].push('Password mismatch!');
                    }
                break;
            }
        } else {
            errors[inputName] = ['Must be at least 5 characters!!!'] 
        }

        populateErrors();
    });
});

const populateErrors = () => {

    for(let elem of document.querySelectorAll('.myClass')) {          //
        elem.remove();
    }

    for(let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`);
        let parentElement = input.parentElement;
        let errorsElement = document.createElement('ul');   //
        errorsElement.classList.add('myClass');
        parentElement.appendChild(errorsElement);
        console.log(parentElement);
        

        errors[key].forEach(error => {
            let li = document.createElement('li'); 
            li.classList.add('myClass');  //
            li.innerText = error;

            errorsElement.appendChild(li);
        });
    }
}

const validateEmail = email => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}
