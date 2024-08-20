function showPopupMessage(message) {
    console.log('Popup message triggered:', message);  // Debug log
    const popup = document.getElementById('response-popup');
    const overlay = document.getElementById('overlay');
    document.getElementById('response-message').textContent = message;
    popup.classList.add('active');
    overlay.classList.add('active');
  
    setTimeout(() => {
        popup.classList.remove('active');
        overlay.classList.remove('active');
    }, 3000);
  }
  
  // Function to show loader
  function showLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'block' : 'none';
  }
  
  // Handle OTP request form submission
  document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;
    showLoader(true);
  
    axios.post('https://webexe.onrender.com/api/v1/users/password', { email })
        .then(response => {
            console.log('OTP request response:', response);  // Debug log
            showLoader(false);
            document.getElementById('forgot-password-form').style.display = 'none';
            document.getElementById('otp-form').style.display = 'block';
            showPopupMessage('OTP request successful! Check your email.');
        })
        .catch(error => {
            console.log('Error requesting OTP:', error);  // Debug log
            showLoader(false);
            showPopupMessage('Error requesting OTP. Please try again.');
            document.getElementById('forgot-password-popup').style.display = 'none';
        });
  });
  
  // Handle OTP verification form submission
  document.getElementById('verifyOtpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const otp = document.getElementById('otp').value;
    const email = document.getElementById('forgot-email').value;
    showLoader(true);
  
    axios.post(`https://webexe.onrender.com/api/v1/users/password/confirm?email=${email}`, { otp })
        .then(response => {
            console.log('OTP verification response:', response);  // Debug log
            showLoader(false);
            document.getElementById('otp-form').style.display = 'none';
            document.getElementById('reset-password-form').style.display = 'block';
            showPopupMessage('OTP verified successfully! Please reset your password.');

        })
        .catch(error => {
            console.log('Error verifying OTP:', error);  // Debug log
            showLoader(false);
            showPopupMessage('Error verifying OTP. Please try again.');
            document.getElementById('forgot-password-popup').style.display = 'none';
        });
  });
  
  // Handle password reset form submission
  document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const email = document.getElementById('forgot-email').value; 
    showLoader(true);

    axios.post(`https://webexe.onrender.com/api/v1/users/password/reset?email=${email}`, { email, password: newPassword })
        .then(response => {
            console.log('Password reset response:', response);  // Debug log
            showLoader(false);
            showPopupMessage('Password reset successful! You can now log in with your new password.');
            document.getElementById('forgot-password-popup').style.display = 'none';
        })
        .catch(error => {
            console.log('Error resetting password:', error);  // Debug log
            showLoader(false);
            showPopupMessage('Error resetting password. Please try again.');
            document.getElementById('forgot-password-popup').style.display = 'none';

        });
});

  
  // Handle login form submission
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value
    };
    showLoader(true);
  
    axios.post('https://webexe.onrender.com/api/v1/users/login', formData)
        .then(response => {
            console.log('Login response:', response);  // Debug log
            showLoader(false);
            if (response.data.status === 'success') {
                showResponsePopup('Login successful!');
                window.location.href = 'dashboard.html'; // Update this URL to your dashboard page
            } else {
                showResponsePopup('Login successful: ' + response.data.message);
            }
        })
        .catch(error => {
            console.log('Login error:', error);  // Debug log
            showLoader(false);
            if (error.response) {
                showResponsePopup('Login failed: ' + (error.response.data.message || 'Unknown error'));
            } else {
                showResponsePopup('Login failed: ' + error.message);
            }
        });
  });
  
  // Function to show the response popup
  function showResponsePopup(message) {
    console.log('Response popup message:', message);  // Debug log
    document.getElementById('response-message').innerText = message;
    document.getElementById('response-popup').style.display = 'flex';
  }
  
  // Close the response popup
  document.getElementById('close-response-popup').addEventListener('click', function() {
    document.getElementById('response-popup').style.display = 'none';
  });