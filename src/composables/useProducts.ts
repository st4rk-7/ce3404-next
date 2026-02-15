import { ref } from 'vue';
import axios from 'axios';
import type { Product } from '../types/product';

// Shared state
const products = ref<Product[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const hasLoaded = ref(false); // Track if we've already fetched

// High-quality sneaker images (Unsplash - Reliable Public Access)
const sneakerImages = [
    // Nike / Jordan / Sporty
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', // Red Nike
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80', // Green Nike
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80', // Converse High Top
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80', // White/Pattern
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80', // White/Blue Sport
    'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80', // Red/White
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80', // Nike White/Orange
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80', // Vans
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', // Grey Sport
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80', // Puma
    'https://images.unsplash.com/photo-1605348532760-6753d5c4365c?auto=format&fit=crop&w=800&q=80', // Black Nike
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80', // Nike Multi

    // Lifestyle / Clean
    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=800&q=80', // New Balance
    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', // Black/White generic
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80', // Yellow boot/shoe
    'https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=800&q=80', // White sleek
    'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=80', // NB Grey
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80', // Orange Nike
    'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80', // Red High Top
    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'  // White Converse
];

export function useProducts() {
  const transformProducts = (originalProducts: Product[]): Product[] => {
    const transformed: Product[] = [];
    const suffixes = ['Midnight Edition', 'Volt', 'Red October', 'Cool Grey', 'Triple Black', 'Royal', 'Bred', 'Chicago', 'Panda'];

    // Deterministic random for consistency
    const seededRandom = (seed: number) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    originalProducts.forEach((product, index) => {
      // 1. Original (Augmented)
      // Cycle through our high-quality image list
      const originalImage = sneakerImages[index % sneakerImages.length] || '';
      
      const basePrice = product.price; // Use raw price for direct conversion
      const randomDiscount = Math.floor(seededRandom(product.id) * 30 + 10);
      
      const transformedOriginal = {
        ...product,
        price: basePrice,
        discountPercentage: product.discountPercentage || (seededRandom(product.id + 1) > 0.5 ? randomDiscount : 0),
        thumbnail: originalImage,
        images: [originalImage, originalImage, originalImage] // Ensure gallery has images
      };
      transformed.push(transformedOriginal);

      // 2. Clones (Always clone to ensure variety and volume)
      for (let i = 0; i < 2; i++) {
        const seed = product.id + (i + 1) * 1000;
        const randomSuffix = suffixes[Math.floor(seededRandom(seed) * suffixes.length)];
        const priceVariation = Math.floor(seededRandom(seed + 1) * 41) - 20; // -20 to +20
        
        const cloneId = parseInt(`${product.id}${i + 1}${Math.floor(seededRandom(seed + 2) * 100)}`);
        // Offset image index so clones don't look exactly like the original right next to it
        const cloneImage = sneakerImages[(index + 5 + i) % sneakerImages.length] || '';
        const cloneBasePrice = basePrice + (priceVariation);

        // Assign tags for 'Edit' filter
        const tags: string[] = [];
        if (randomSuffix === 'Midnight Edition' || randomSuffix === 'Triple Black') tags.push('black-white');
        if (randomSuffix === 'Volt' || randomSuffix === 'Red October') tags.push('colour-flash', 'fluo');
        if (randomSuffix === 'Royal' || randomSuffix === 'Chicago' || randomSuffix === 'Bred') tags.push('vintage');
        if (seededRandom(cloneId + 5) > 0.7) tags.push('studs'); // Randomly assign studs
        
        // Ensure at least one tag is present for testing some variety
        if (tags.length === 0) tags.push('vintage');

        transformed.push({
          ...product,
          id: cloneId,
          title: `${product.title} ${randomSuffix}`,
          price: Math.max(0, cloneBasePrice),
          discountPercentage: seededRandom(cloneId) > 0.5 ? Math.floor(seededRandom(cloneId + 1) * 30 + 10) : 0,
          thumbnail: cloneImage, 
          images: [cloneImage, cloneImage, cloneImage],
          tags: tags
        });
      }
    });

    return transformed;
  };

  const fetchProducts = async () => {
    // If we already have data, don't refetch to preserve the random augments
    if (hasLoaded.value && products.value.length > 0) return;

    isLoading.value = true;
    error.value = null;
    try {
        const [mensRes, womensRes] = await Promise.all([
            axios.get('https://dummyjson.com/products/category/mens-shoes'),
            axios.get('https://dummyjson.com/products/category/womens-shoes'),
        ]);

        // Combine categories
        let combined = [...mensRes.data.products, ...womensRes.data.products];
        
        // Remove non-shoe items if any sneaked in (unlikely with specific categories)
        
        products.value = transformProducts(combined);
        hasLoaded.value = true;
    } catch (err: any) {
        error.value = err.message || 'Failed to fetch products';
        console.error(err);
    } finally {
        isLoading.value = false;
    }
  };

  const getProductById = (id: number): Product | undefined => {
    return products.value.find(p => p.id === id);
  };

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    getProductById
  };
}
