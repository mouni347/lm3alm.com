document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        const userData = { name, email, password, role };

        console.log('Sending registration data:', userData);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            console.log('Received response:', result);

            if (response.ok) {
                window.alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            } else {
                window.alert(`Registration failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            window.alert('An error occurred during registration. Please try again later.');
        }
    });
});
