document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    if (password !== repeatPassword) {
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    const passwordPattern = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/;
    if (!passwordPattern.test(password)) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Password must be at least 8 characters long and contain at least one special character.';
        return;
    }

    const formData = {
        first_name: document.querySelector('input[name="first_name"]').value,
        last_name: document.querySelector('input[name="last_name"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        DOB: document.querySelector('input[name="DOB"]').value,
        gender: document.querySelector('input[name="gender"]').value,
        role: "buyer" // Assuming the role is fixed as "buyer"
    };

    axios.post('https://webexe.onrender.com/api/v1/users/signup', formData)
        .then(response => {
            const modal = document.getElementById('customModal');
            const modalMessage = document.getElementById('modalMessage');
            const redirectButton = document.getElementById('redirectButton');

            modal.style.display = 'block';

            if (response.data.status === 'success') {
                modalMessage.textContent = 'Signup successful!';
                redirectButton.style.display = 'block';
            } else {
                modalMessage.textContent = 'Signup successful: ' + response.data.message;
            }
        })
        .catch(error => {
            const modal = document.getElementById('customModal');
            const modalMessage = document.getElementById('modalMessage');

            modal.style.display = 'block';

            if (error.response) {
                modalMessage.textContent = 'Signup failed: ' + (error.response.data.message || 'Unknown error');
            } else {
                modalMessage.textContent = 'Signup failed: ' + error.message;
            }
        });
});

document.querySelector('.close').onclick = function() {
    document.getElementById('customModal').style.display = 'none';
};

document.getElementById('redirectButton').onclick = function() {
    window.location.href = './login.html';
};