// Contact form
let form = document.getElementById('contactme');
let form_status = document.getElementById('form_status');

// Double-check valid email and phone... only used if HTML form modified
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phone_regex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

// Form submit event handler
document.getElementById("submit").addEventListener("click", function (event) {
    // If HTML form is invalid
    if (form.checkValidity() == false) {
        return
    }

    event.preventDefault();

    // Get form fields
    let user_fname = document.getElementById("user_fname").value.trim();
    let user_lname = document.getElementById("user_lname").value.trim();
    let user_email = document.getElementById("user_email").value.trim();
    let user_phone = document.getElementById("user_phone").value.trim();
    let user_message = document.getElementById("user_message").value.trim();

    // Validate fields one last time
    const inputsFilled = user_fname.length > 0 && user_lname.length > 0 && user_message.length > 0;
    const validRegex = email_regex.test(user_email) && phone_regex.test(user_phone)
    const isValid = inputsFilled && validRegex

    // Invalid form: refresh page to ensure HTML checks are in place
    if (!isValid) {
        form_status.innerHTML = `<div class="error">There was an issue submitting the form. Please refresh the page and try again.</div>`
        return
    }

    form_status.innerHTML = `<div class="lds-hourglass"></div>` //show loading spinner

    // Send email with EmailJS
    emailjs.sendForm('service_hxzli5u', 'template_73y548g', '#contactme')
        .then(function (response) {
            console.log('EmailJS Success:', response.status, response.text);
            form_status.innerText = "Message sent!"
            form.reset(); //clear form inputs
        }, function (error) {
            console.log('EmailJS Error:', error);
            form_status.innerHTML = `<div class="error">There was an issue sending the message. Please try again later.</div>`
        });
});

// Format phone input
// returns ###-###-####
function phoneFormat(input) {
    /*
        modified from:
        https://stackoverflow.com/a/68822305
    */

    input = input.replace(/\D/g, '');
    var size = input.length;
    if (size > 0) { input }
    if (size > 3) { input = input.slice(0, 3) + "-" + input.slice(3, 10) }
    if (size > 6) { input = input.slice(0, 7) + "-" + input.slice(7) }
    return input;
}

(function () {
    // Init EmailJS
    emailjs.init("WNTE2ZgnlNkqN1_Kb");
})();