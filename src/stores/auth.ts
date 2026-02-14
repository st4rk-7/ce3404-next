import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

interface User {
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
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  // Initialize from localStorage
  const init = () => {
    const storedUser = localStorage.getItem('auth-user');
    const storedToken = localStorage.getItem('auth-token');
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      user.value = response.data;
      token.value = response.data.token;

      // Persist to localStorage
      localStorage.setItem('auth-user', JSON.stringify(user.value));
      localStorage.setItem('auth-token', token.value as string);

      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed. Please check your credentials.';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
  };

  const isAuthenticated = computed(() => !!token.value);
  const userFullName = computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : '');

  // Run init on store creation
  init();

  return {
    user,
    token,
    error,
    isLoading,
    isAuthenticated,
    userFullName,
    login,
    logout
  };
});
