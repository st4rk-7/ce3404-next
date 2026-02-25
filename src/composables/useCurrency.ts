import { computed } from 'vue';

const EXCHANGE_RATE = 330; // 1 USD ≈ 330 LKR

export const useCurrency = () => {

  const formatPrice = (valueInUsd: number) => {
    const valueInLkr = valueInUsd * EXCHANGE_RATE;
    return `Rs ${new Intl.NumberFormat('en-LK', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valueInLkr)}`;
  };

  const currency = computed(() => 'LKR' as const);

  return {
    currency,
    formatPrice,
    EXCHANGE_RATE
  };
};
