class User {
    constructor(data) {
        this.email = data.email || '';
        this.token = data.token || '';
        this.type = data.type || '';
    }

    static fromLoginResponse(response) {
        return new User({
            email: response.email,
            token: response.token,
            type: response.type
        });
    }

    isAuthenticated() {
        return !!this.token;
    }

    getAuthHeader() {
        return {
            'Authorization': `${this.type} ${this.token}`
        };
    }
}

export default User;