import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  // Load from localStorage
  const storedUser = localStorage.getItem('auth-user');
  const storedToken = localStorage.getItem('auth-token');

  if (storedUser && storedToken) {
    try {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    } catch (e) {
      console.error('Failed to parse auth data from localStorage', e);
      localStorage.removeItem('auth-user');
      localStorage.removeItem('auth-token');
    }
  }

  const isAuthenticated = computed(() => !!token.value);

  async function login(username: string, password: string): Promise<void> {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username, // 'emilys',
        password, // 'emilyspass',
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    // Update state
    user.value = data;
    token.value = data.token;

    // Persist to localStorage
    localStorage.setItem('auth-user', JSON.stringify(data));
    localStorage.setItem('auth-token', data.token);
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  };
});
