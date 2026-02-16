import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const token = ref<string | null>(null);

  // Auto-login: Load from localStorage on store init
  const storedUser = localStorage.getItem('auth_token') ? localStorage.getItem('user_data') : null;
  const storedToken = localStorage.getItem('auth_token');

  if (storedUser && storedToken) {
    try {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    } catch (e) {
      console.error('Failed to parse auth data from localStorage', e);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  const isAuthenticated = computed(() => !!token.value);

  async function login(username: string, password: string): Promise<boolean> {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid Credentials');
    }

    const data: LoginResponse = await response.json();

    // Update state
    user.value = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    };
    token.value = data.accessToken;

    // Persist to localStorage
    localStorage.setItem('auth_token', data.accessToken);
    localStorage.setItem('user_data', JSON.stringify(user.value));

    return true;
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  };
});
