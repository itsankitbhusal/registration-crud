$(document).ready(function () {
    if (auth.isAuthenticated()) {
        window.location.href = '/home.html';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (!token || !email) {
        alert('Invalid password reset link');
        window.location.href = '/login.html';
        return;
    }

    $('#resetPasswordForm').on('submit', async function (e) {
        e.preventDefault();

        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            await axios.post(`${config.API_URL}/password-reset`, {
                token,
                email,
                newPassword
            });

            alert('Password has been reset successfully');
            window.location.href = '/login.html';
        } catch (error) {
            alert('Failed to reset password: ' + error.response?.data?.message || 'Unknown error');
            if (error.response?.status === 400) {
                window.location.href = '/login.html';
            }
        }
    });
});