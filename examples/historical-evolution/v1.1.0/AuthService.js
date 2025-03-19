// AuthService.js - v1.1.0
// Authentication service for JWT token handling with token validation

class AuthService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.token = localStorage.getItem('auth_token');
    this.tokenExpiry = localStorage.getItem('auth_token_expiry');
  }

  async login(username, password) {
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      this.token = data.token;
      this.tokenExpiry = data.expiresAt;
      
      localStorage.setItem('auth_token', this.token);
      localStorage.setItem('auth_token_expiry', this.tokenExpiry);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout() {
    this.token = null;
    this.tokenExpiry = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token_expiry');
  }

  isAuthenticated() {
    if (!this.token || !this.tokenExpiry) {
      return false;
    }
    
    // Check if token is expired
    const now = new Date();
    const expiry = new Date(this.tokenExpiry);
    return now < expiry;
  }

  getAuthHeader() {
    return this.isAuthenticated() ? { 'Authorization': `Bearer ${this.token}` } : {};
  }
}

export default AuthService;
