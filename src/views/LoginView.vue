<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref(''); // Default dummyjson user: emilys
const password = ref(''); // Default dummyjson pass: emilyspass
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    await authStore.login(username.value, password.value);
    router.push('/');
  } catch (e) {
    error.value = 'Invalid username or password';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="w-full max-w-md bg-white border border-gray-200 p-8 shadow-sm">
      <h2 class="text-2xl font-bold tracking-widest uppercase mb-6 text-center">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Username</label>
          <input 
            v-model="username"
            type="text" 
            placeholder="emilys"
            required
            class="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
          <input 
            v-model="password"
            type="password" 
            placeholder="emilyspass"
            required
            class="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div v-if="error" class="text-red-500 text-xs text-center">
          {{ error }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {{ isLoading ? 'Logging in...' : 'Sign In' }}
        </button>
      </form>
      
      <div class="mt-6 text-center text-xs text-gray-400">
          <p>Test Creds: emilys / emilyspass</p>
      </div>
    </div>
  </div>
</template>
