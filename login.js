document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form elements
    const loginForm = document.querySelector('.login.form'); // Select the form with class 'login form'
    const emailInput = document.getElementById('log-email');
    const passwordInput = document.getElementById('log-password');
    const loginButton = document.getElementById('LogInBtn');

    // Get the login status from localStorage (mock)
    function setLoginStatus(status) {
        localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
    }

    // Function to display messages (instead of alert)
    function showMessage(message, isError = false) {
        let messageBox = document.getElementById('loginMessageBox');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'loginMessageBox';
            messageBox.style.cssText = `
                margin-top: 15px;
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                font-size: 14px;
                color: #fff;
            `;
            loginForm.insertBefore(messageBox, loginButton.closest('.input-box').nextSibling);
        }

        messageBox.textContent = message;
        messageBox.style.backgroundColor = isError ? '#dc3545' : '#28a745'; // Red for error, green for success
        messageBox.style.display = 'block';

        // Automatically hide after a few seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    if (loginForm && emailInput && passwordInput && loginButton) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const email = emailInput.value;
            const password = passwordInput.value;

            // Mock login validation
            // In a real application, you would send these credentials to a server
            // and validate them securely.
            if (email === 'user@example.com' && password === 'password123') {
                setLoginStatus(true); // Simulate successful login
                showMessage('Login successful!', false);

                // Redirect based on the stored 'redirectAfterLogin' or to HomePage.html
                const redirectTo = localStorage.getItem('redirectAfterLogin') || 'HomePage.html';
                localStorage.removeItem('redirectAfterLogin'); // Clear the flag

                // Small delay to show message before redirecting
                setTimeout(() => {
                    window.location.href = redirectTo;
                }, 1000);

            } else {
                setLoginStatus(false); // Ensure login status is false on failure
                showMessage('Invalid email or password. Please try again.', true);
            }
        });
    } else {
        console.error('Login form elements not found.');
    }
});
