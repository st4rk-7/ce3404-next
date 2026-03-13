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

const isTokenExpired = (value: string) => {
  try {
    const payload = JSON.parse(atob(value.split('.')[1]!.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number };
    return typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const token = ref<string | null>(null);

  // Auto-login: Load from localStorage on store init
  const storedUser = localStorage.getItem('auth_token') ? localStorage.getItem('user_data') : null;
  const storedToken = localStorage.getItem('auth_token');

  if (storedUser && storedToken && !isTokenExpired(storedToken)) {
    try {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    } catch (e) {
      console.error('Failed to parse auth data from localStorage', e);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  } else if (storedUser || storedToken) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  const isAuthenticated = computed(() => !!token.value);

  async function login(username: string, password: string): Promise<boolean> {
    let response: Response;
    try {
      response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
      });
    } catch {
      throw new Error('Unable to reach the login service. Check your connection and try again.');
    }

    if (!response.ok) {
      if (response.status === 400 || response.status === 401) {
        throw new Error('Invalid username or password.');
      }
      throw new Error('The login service is temporarily unavailable.');
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
