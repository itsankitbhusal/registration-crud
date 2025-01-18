$(document).ready(function () {
    if (!auth.isAuthenticated()) {
        window.location.href = '/login.html';
        return;
    }

    auth.setupAxiosInterceptors();
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));

    // Load users list
    async function loadUsers() {
        try {
            const response = await axios.get(`${config.API_URL}/`);
            $('#usersTableBody').empty();

            response && response?.data.data.forEach(user => {
                const row = $('<tr class="user-row">')
                    .append($('<td>').text(user.firstName))
                    .append($('<td>').text(user.lastName))
                    .append($('<td>').text(user.email))
                    .data('user', user)
                    .click(function () {
                        showUserModal($(this).data('user'));
                    });

                $('#usersTableBody').append(row);
            });
        } catch (error) {
            alert('Failed to fetch users: ' + error.response?.data?.message || 'Unknown error');
            if (error.response?.status === 401) {
                window.location.href = '/login.html';
            }
        }
    }

    function showUserModal(user) {
        $('#modalFirstName').text(user.firstName);
        $('#modalLastName').text(user.lastName);
        $('#modalEmail').text(user.email);
        $('#modalCreatedAt').text(new Date(user.createdAt).toLocaleString());
        userModal.show();
    }

    // Load users on page load
    loadUsers();

    // Handle logout
    $('#logoutBtn').click(function () {
        auth.clearTokens();
        window.location.href = '/login.html';
    });
});