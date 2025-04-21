function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let recaptcha = '';
    if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse) {
        recaptcha = grecaptcha.getResponse();
    }

    if (!name || !email || !message) {
        alert("All fields are required.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email format.");
        return;
    }

    if (typeof grecaptcha !== 'undefined' && !recaptcha) {
        alert("Please complete the reCAPTCHA.");
        return;
    }

    alert('Form submitted successfully!');
}
