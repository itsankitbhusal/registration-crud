$(document).ready(function () {
    if (auth.isAuthenticated()) {
        window.location.href = '/home.html';
    }

    $('#forgotPasswordForm').on('submit', async function (e) {
        e.preventDefault();
        try {
            await axios.post(`${config.API_URL}/password-reset-request`, {
                email: $('#email').val()
            });

            alert('Password reset link has been sent to your email.');
            window.location.href = '/login.html';
        } catch (error) {
            alert('Failed to send reset link: ' + error.response?.data?.message || 'Unknown error');
        }
    });
});