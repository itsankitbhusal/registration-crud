$(document).ready(function () {
    if (auth.isAuthenticated()) {
        window.location.href = '/home.html';
    }

    $('#loginForm').on('submit', async function (e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.API_URL}/login`, {
                email: $('#loginEmail').val(),
                password: $('#loginPassword').val()
            });

            auth.setTokens(response.data.accessToken, response.data.refreshToken);
            window.location.href = '/home.html';
        } catch (error) {
            alert('Login failed: ' + error.response?.data?.message || 'Unknown error');
        }
    });
});