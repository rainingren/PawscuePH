// document.addEventListener('DOMContentLoaded', function() {
//     // Get references to the form elements
//     const signInForm = document.querySelector('.login.form'); // Assuming .login.form is used for both
//     const usernameInput = document.getElementById('reg-user');
//     const emailInput = document.getElementById('reg-email');
//     const passwordInput = document.getElementById('reg-password');
//     const agreeCheckbox = document.getElementById('Agree');
//     const signInButton = document.getElementById('SignInBtn');

//     // Get the login status from localStorage (mock)
//     function setLoginStatus(status) {
//         localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
//     }

//     // Function to display messages (instead of alert)
//     function showMessage(message, isError = false) {
//         let messageBox = document.getElementById('signInMessageBox');
//         if (!messageBox) {
//             messageBox = document.createElement('div');
//             messageBox.id = 'signInMessageBox';
//             messageBox.style.cssText = `
//                 margin-top: 15px;
//                 padding: 10px;
//                 border-radius: 5px;
//                 text-align: center;
//                 font-size: 14px;
//                 color: #fff;
//             `;
//             signInForm.insertBefore(messageBox, signInButton.closest('.input-box').nextSibling);
//         }

//         messageBox.textContent = message;
//         messageBox.style.backgroundColor = isError ? '#dc3545' : '#28a745'; // Red for error, green for success
//         messageBox.style.display = 'block';

//         // Automatically hide after a few seconds
//         setTimeout(() => {
//             messageBox.style.display = 'none';
//         }, 3000);
//     }

//     if (signInForm && usernameInput && emailInput && passwordInput && agreeCheckbox && signInButton) {
//         signInForm.addEventListener('submit', function(event) {
//             event.preventDefault(); // Prevent default form submission

//             const username = usernameInput.value;
//             const email = emailInput.value;
//             const password = passwordInput.value;

//             // Basic client-side validation
//             if (!username || !email || !password) {
//                 showMessage('All fields are required.', true);
//                 return;
//             }
//             if (!agreeCheckbox.checked) {
//                 showMessage('You must agree to the terms & conditions.', true);
//                 return;
//             }
//             if (password.length < 6) {
//                 showMessage('Password must be at least 6 characters long.', true);
//                 return;
//             }

//             // Mock registration logic
//             // In a real application, you would send this data to a server
//             // to create a new user account (with password hashing!).
//             try {
//                 // Simulate saving user data
//                 localStorage.setItem('registeredUserEmail', email);
//                 localStorage.setItem('registeredUserPassword', password); // NOT SECURE IN REAL APP!
//                 localStorage.setItem('registeredUsername', username);

//                 setLoginStatus(true); // Simulate automatic login after registration
//                 showMessage('Registration successful! You are now logged in.', false);

//                 // Redirect based on the stored 'redirectAfterLogin' or to HomePage.html
//                 const redirectTo = localStorage.getItem('redirectAfterLogin') || 'HomePage.html';
//                 localStorage.removeItem('redirectAfterLogin'); // Clear the flag

//                 // Small delay to show message before redirecting
//                 setTimeout(() => {
//                     window.location.href = redirectTo;
//                 }, 1000);

//             } catch (error) {
//                 showMessage('Registration failed. Please try again later.', true);
//                 console.error('Registration error:', error);
//                 setLoginStatus(false);
//             }
//         });
//     } else {
//         console.error('Sign-in form elements not found.');
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form elements
    const signInForm = document.querySelector('.login.form');
    const usernameInput = document.getElementById('reg-user');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const agreeCheckbox = document.getElementById('Agree');
    const signInButton = document.getElementById('SignInBtn');

    // Function to initialize or retrieve app data from localStorage
    function getAppData() {
        const defaultData = {
            users: [],
            login_attempts: [],
            application_submissions: []
        };
        try {
            const data = localStorage.getItem('pawscueAppData');
            return data ? JSON.parse(data) : defaultData;
        } catch (e) {
            console.error("Error parsing app data from localStorage:", e);
            return defaultData;
        }
    }

    // Function to save app data to localStorage
    function saveAppData(data) {
        try {
            localStorage.setItem('pawscueAppData', JSON.stringify(data));
        } catch (e) {
            console.error("Error saving app data to localStorage:", e);
        }
    }

    // Function to set login status in localStorage
    function setLoginStatus(status, userId = null) {
        localStorage.setItem('isLoggedIn', status ? 'true' : 'false');
        localStorage.setItem('loggedInUserId', userId || '');
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
            // Insert message box after the form for better visibility
            signInForm.parentNode.insertBefore(messageBox, signInForm.nextSibling);
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

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value; // In real app, password should be hashed

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

            const appData = getAppData();

            // Check if email already exists
            if (appData.users.some(user => user.email === email)) {
                showMessage('This email is already registered. Please login instead.', true);
                return;
            }

            try {
                // Simulate saving user data
                const newUserId = `user_${Date.now()}`; // Generate a unique ID
                const newUser = {
                    userId: newUserId,
                    username: username,
                    email: email,
                    passwordHash: password, // Store as plain text for mock, hash in real app
                    registrationDate: new Date().toISOString()
                };
                appData.users.push(newUser);
                saveAppData(appData);

                setLoginStatus(true, newUserId); // Simulate automatic login after registration
                showMessage('Registration successful! You are now logged in.', false);

                const redirectTo = localStorage.getItem('redirectAfterLogin') || 'HomePage.html';
                localStorage.removeItem('redirectAfterLogin');

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
