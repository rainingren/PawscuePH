document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form elements
    const signInForm = document.querySelector('.login.form'); // Assuming .login.form is used for both
    const usernameInput = document.getElementById('reg-user');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const agreeCheckbox = document.getElementById('Agree');
    const signInButton = document.getElementById('SignInBtn');

    // Get the login status from localStorage (mock)
    function setLoginStatus(status) {
        localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    }

    // Function to display messages (instead of alert)
    function showMessage(message, isError = false) {
        let messageBox = document.getElementById('signInMessageBox');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'signInMessageBox';
            messageBox.style.cssText = `
                margin-top: 15px;
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                font-size: 14px;
                color: #fff;
            `;
            signInForm.insertBefore(messageBox, signInButton.closest('.input-box').nextSibling);
        }

        messageBox.textContent = message;
        messageBox.style.backgroundColor = isError ? '#dc3545' : '#28a745'; // Red for error, green for success
        messageBox.style.display = 'block';

        // Automatically hide after a few seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    if (signInForm && usernameInput && emailInput && passwordInput && agreeCheckbox && signInButton) {
        signInForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const username = usernameInput.value;
            const email = emailInput.value;
            const password = passwordInput.value;

            // Basic client-side validation
            if (!username || !email || !password) {
                showMessage('All fields are required.', true);
                return;
            }
            if (!agreeCheckbox.checked) {
                showMessage('You must agree to the terms & conditions.', true);
                return;
            }
            if (password.length < 6) {
                showMessage('Password must be at least 6 characters long.', true);
                return;
            }

            // Mock registration logic
            // In a real application, you would send this data to a server
            // to create a new user account (with password hashing!).
            try {
                // Simulate saving user data
                localStorage.setItem('registeredUserEmail', email);
                localStorage.setItem('registeredUserPassword', password); // NOT SECURE IN REAL APP!
                localStorage.setItem('registeredUsername', username);

                setLoginStatus(true); // Simulate automatic login after registration
                showMessage('Registration successful! You are now logged in.', false);

                // Redirect based on the stored 'redirectAfterLogin' or to HomePage.html
                const redirectTo = localStorage.getItem('redirectAfterLogin') || 'HomePage.html';
                localStorage.removeItem('redirectAfterLogin'); // Clear the flag

                // Small delay to show message before redirecting
                setTimeout(() => {
                    window.location.href = redirectTo;
                }, 1000);

            } catch (error) {
                showMessage('Registration failed. Please try again later.', true);
                console.error('Registration error:', error);
                setLoginStatus(false);
            }
        });
    } else {
        console.error('Sign-in form elements not found.');
    }
});
