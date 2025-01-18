const auth = {
    getTokens() {
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
        };
    },

    setTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    },

    clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    isAuthenticated() {
        return !!this.getTokens().accessToken;
    },

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            config => {
                const token = this.getTokens().accessToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        axios.interceptors.response.use(
            response => response,
            async error => {
                if (error.response?.status === 401) {
                    const refreshToken = this.getTokens().refreshToken;
                    if (refreshToken) {
                        try {
                            const response = await axios.post(`${config.API_URL}/token`, { refreshToken });
                            this.setTokens(response.data.accessToken, refreshToken);
                            error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                            return axios(error.config);
                        } catch (refreshError) {
                            this.clearTokens();
                            window.location.href = '/login.html';
                            return Promise.reject(refreshError);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
    }
};
