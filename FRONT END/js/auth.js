const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const toggleAuth = document.getElementById('toggle-auth');
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const logoutBtn = document.getElementById('logout-btn');
const registerUsernameInput = document.getElementById('register-username');
const registerFields = document.getElementById('register-fields');

// Update the backend URL for deployment on Render
const API_URL = 'https://mycontact-app-backend.onrender.com/api/users'; // Render API URL

window.onload = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        authSection.classList.remove('hidden');
        appSection.classList.add('hidden');
    } else {
        // Verify the token using the /current endpoint or other suitable endpoint
        fetch(`${API_URL}/current`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        .then(res => {
            if (res.ok) {
                authSection.classList.add('hidden');
                appSection.classList.remove('hidden');
            } else {
                localStorage.removeItem('accessToken');
                authSection.classList.remove('hidden');
                appSection.classList.add('hidden');
            }
        })
        .catch(() => {
            localStorage.removeItem('accessToken');
            authSection.classList.remove('hidden');
            appSection.classList.add('hidden');
        });
    }
};

function resetForm() {
    authForm.reset();
    if (authTitle.textContent === 'Login') {
        registerUsernameInput.required = false;
        registerFields.classList.add('hidden');
    }
}

toggleAuth.addEventListener('click', () => {
    if (registerFields.classList.contains('hidden')) {
        registerFields.classList.remove('hidden');
        authTitle.textContent = 'Register';
        toggleAuth.textContent = 'Already have an account? Login';
        registerUsernameInput.required = true;
    } else {
        resetForm();
        authTitle.textContent = 'Login';
        toggleAuth.textContent = "Don't have an account? Register";
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const username = document.getElementById('register-username')?.value;

    const isRegister = authTitle.textContent === 'Register';
    const url = isRegister ? `${API_URL}/register` : `${API_URL}/login`;

    const body = JSON.stringify({
        email,
        password,
        ...(isRegister && { username }), // Include username only for registration
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
        });

        if (response.ok) {
            const data = await response.json();

            if (isRegister) {
                // On successful registration, switch to the login form
                alert('Registration successful! Please log in to continue.');
                resetForm();
                authTitle.textContent = 'Login';
                toggleAuth.textContent = "Don't have an account? Register";
            } else {
                // On successful login, proceed to the app
                localStorage.setItem('accessToken', data.accessToken); // Store the token in localStorage
                authSection.classList.add('hidden');
                appSection.classList.remove('hidden');
            }
        } else {
            const error = await response.json();
            alert((isRegister ? 'Registration' : 'Login') + ' failed: ' + error.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('accessToken');
    authSection.classList.remove('hidden');
    appSection.classList.add('hidden');
});
