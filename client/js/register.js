$(document).ready(function () {
    if (auth.isAuthenticated()) {
        window.location.href = '/home.html';
    }

    $('#registerForm').on('submit', async function (e) {
        e.preventDefault();
        try {
            await axios.post(`${config.API_URL}/`, {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                password: $('#password').val()
            });

            alert('Registration successful! Please login.');
            window.location.href = '/login.html';
        } catch (error) {
            alert('Registration failed: ' + error.response?.data?.message || 'Unknown error');
        }
    });
});
