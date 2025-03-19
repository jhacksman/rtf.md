// AuthService.js - v2.0.0
// Authentication service with secure token storage and refresh capabilities

import { jwtDecode } from 'jwt-decode';
import SecureStorage from '../utils/SecureStorage';

class AuthService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.secureStorage = new SecureStorage();
    this.refreshPromise = null;
    
    // Initialize from secure storage
    this.loadTokens();
  }

  loadTokens() {
    this.accessToken = this.secureStorage.getItem('auth_access_token');
    this.refreshToken = this.secureStorage.getItem('auth_refresh_token');
  }

  saveTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    this.secureStorage.setItem('auth_access_token', accessToken);
    if (refreshToken) {
      this.secureStorage.setItem('auth_refresh_token', refreshToken);
    }
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    
    this.secureStorage.removeItem('auth_access_token');
    this.secureStorage.removeItem('auth_refresh_token');
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
      this.saveTokens(data.accessToken, data.refreshToken);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout() {
    if (this.accessToken) {
      try {
        // Notify server to invalidate the token
        await fetch(`${this.apiUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            ...this.getAuthHeader()
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
        // Continue with local logout even if server logout fails
      }
    }
    
    this.clearTokens();
  }

  isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      // Add 30 second buffer to prevent edge cases
      return decoded.exp < currentTime + 30;
    } catch (error) {
      console.error('Token decode error:', error);
      return true;
    }
  }

  async refreshAccessToken() {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    
    this.refreshPromise = (async () => {
      try {
        if (!this.refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const response = await fetch(`${this.apiUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken: this.refreshToken })
        });
        
        if (!response.ok) {
          throw new Error('Token refresh failed');
        }
        
        const data = await response.json();
        this.saveTokens(data.accessToken, data.refreshToken || this.refreshToken);
        
        return this.accessToken;
      } catch (error) {
        console.error('Token refresh error:', error);
        this.clearTokens();
        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();
    
    return this.refreshPromise;
  }

  async getValidToken() {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }
    
    if (this.isTokenExpired(this.accessToken)) {
      if (this.refreshToken && !this.isTokenExpired(this.refreshToken)) {
        return this.refreshAccessToken();
      } else {
        this.clearTokens();
        throw new Error('Session expired');
      }
    }
    
    return this.accessToken;
  }

  async isAuthenticated() {
    try {
      await this.getValidToken();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAuthHeader() {
    try {
      const token = await this.getValidToken();
      return { 'Authorization': `Bearer ${token}` };
    } catch (error) {
      return {};
    }
  }
  
  // Helper method to make authenticated API requests
  async fetchWithAuth(url, options = {}) {
    try {
      const authHeaders = await this.getAuthHeader();
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          ...authHeaders
        }
      });
      
      return response;
    } catch (error) {
      console.error('Fetch with auth error:', error);
      throw error;
    }
  }
}

export default AuthService;
