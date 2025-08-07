document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const credentials = { email, password };

        console.log('Sending login data:', credentials);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const result = await response.json();
            console.log('Received response:', result);

            if (response.ok) {
                // In a real application, you would store the token from the response
                // e.g., localStorage.setItem('token', result.token);
                window.alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                window.alert(`Login failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            window.alert('An error occurred during login. Please try again later.');
        }
    });
});
