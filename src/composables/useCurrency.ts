import { ref, computed } from 'vue';

const currency = ref<'EUR' | 'LKR'>('LKR'); // Default to LKR
const EXCHANGE_RATE = 330; // 1 EUR = 330 LKR

export const useCurrency = () => {

  const setCurrency = (newCurrency: 'EUR' | 'LKR') => {
      currency.value = newCurrency;
  };

  const formatPrice = (valueInEur: number) => {
    if (currency.value === 'LKR') {
        const valueInLkr = valueInEur * EXCHANGE_RATE;
        return new Intl.NumberFormat('en-LK', { 
            style: 'currency', 
            currency: 'LKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(valueInLkr).replace('LKR', 'Rs');
    } else {
        return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(valueInEur);
    }
  };

  return {
    currency: computed(() => currency.value),
    setCurrency,
    formatPrice,
    EXCHANGE_RATE
  };
};
