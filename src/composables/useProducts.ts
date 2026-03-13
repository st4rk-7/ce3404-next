import { ref } from 'vue';
import axios from 'axios';
import type { Product } from '../types/product';

// Shared state
const products = ref<Product[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const hasLoaded = ref(false); // Track if we've already fetched

// Product imagery stored locally — each set has 3 angle variants
const shoeImageSets = [
    // 1. Red/Dark Runner
    ['/shoes/shoe-01a.webp', '/shoes/shoe-01b.webp', '/shoes/shoe-01c.webp'],
    // 2. Green / Navy / Coconut
    ['/shoes/shoe-02a.webp', '/shoes/shoe-02b.webp', '/shoes/shoe-02c.webp'],
    // 3. Blizzard / Deep Navy / Auburn
    ['/shoes/shoe-03a.webp', '/shoes/shoe-03b.webp', '/shoes/shoe-03c.webp'],
    // 4. Stony Cream / Dark Grey / Dapple Grey
    ['/shoes/shoe-04a.webp', '/shoes/shoe-04b.webp', '/shoes/shoe-04c.webp'],
    // 5. Light Grey / Mushroom / Parchment
    ['/shoes/shoe-05a.webp', '/shoes/shoe-05b.webp', '/shoes/shoe-05c.webp'],
    // 6. Mushroom / Burnt Olive / Warm Red
    ['/shoes/shoe-06a.webp', '/shoes/shoe-06b.webp', '/shoes/shoe-06c.webp'],
    // 7. Anthracite / Burnt Olive / Canvas White
    ['/shoes/shoe-07a.webp', '/shoes/shoe-07b.webp', '/shoes/shoe-07c.webp'],
    // 8. Camel / Natural White / Medium Grey
    ['/shoes/shoe-08a.webp', '/shoes/shoe-08b.webp', '/shoes/shoe-08c.webp']
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

    // Filter Mock Data Pools
    const allColors = ['#000000', '#ffffff', '#8B4513', '#FFC0CB', '#FFD700', '#0000FF', '#808080', '#F5F5DC', '#FF0000', '#FFA500', '#008000'];
    const allSizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'];
    const allMaterials = ['Alternative-Leather', 'Canvas', 'Tree-Fiber-Blend', 'Wool'];
    const allProductTypes = ['Everyday Sneakers', 'Fluffs', 'Golf', 'High Tops', 'Hiking Shoes', 'Running Shoes', 'Slip Ons', 'Water-Repellent Shoes'];

    originalProducts.forEach((product, index) => {
      // 1. Original (Augmented)
      // Cycle through our high-quality image list
      const imageSet = shoeImageSets[index % shoeImageSets.length] || shoeImageSets[0] as string[];
      const originalImage: string = imageSet[0] || '';
      
      const basePrice = product.price; // Use raw price for direct conversion
      const randomDiscount = Math.floor(seededRandom(product.id) * 30 + 10);
      
      // Mock Data Assignment for Original
      const numColors = Math.floor(seededRandom(product.id + 10) * 4) + 1; // 1 to 4 colors
      const productColors = [...allColors].sort(() => seededRandom(product.id) - 0.5).slice(0, numColors);
      
      const numSizes = Math.floor(seededRandom(product.id + 11) * 6) + 3; // 3 to 8 sizes available
      const productSizes = [...allSizes].sort(() => seededRandom(product.id + 1) - 0.5).slice(0, numSizes);
      
      const productMaterial: string = allMaterials[Math.floor(seededRandom(product.id + 12) * allMaterials.length)] || allMaterials[0] || 'Wool';
      const productType: string = allProductTypes[Math.floor(seededRandom(product.id + 13) * allProductTypes.length)] || allProductTypes[0] || 'Everyday Sneakers';
      
      // Generate a random date in the past year for sorting
      const daysAgo = Math.floor(seededRandom(product.id + 14) * 365);
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

      const transformedOriginal: Product = {
        ...product,
        price: basePrice,
        discountPercentage: product.discountPercentage || (seededRandom(product.id + 1) > 0.5 ? randomDiscount : 0),
        thumbnail: originalImage,
        images: imageSet, // The 3 images
        colors: productColors,
        sizes: productSizes,
        material: productMaterial,
        productType: productType,
        createdAt: createdAt
      };
      transformed.push(transformedOriginal);

      // 2. Clones (Always clone to ensure variety and volume)
      for (let i = 0; i < 2; i++) {
        const seed = product.id + (i + 1) * 1000;
        const randomSuffix = suffixes[Math.floor(seededRandom(seed) * suffixes.length)];
        const priceVariation = Math.floor(seededRandom(seed + 1) * 41) - 20; // -20 to +20
        
        const cloneId = parseInt(`${product.id}${i + 1}${Math.floor(seededRandom(seed + 2) * 100)}`);
        // Offset image index so clones don't look exactly like the original right next to it
        const cloneImageSet = shoeImageSets[(index + 5 + i) % shoeImageSets.length] || shoeImageSets[0] as string[];
        const cloneImage = cloneImageSet[0] || '';
        const cloneBasePrice = basePrice + (priceVariation);

        // Assign tags for 'Edit' filter
        const tags: string[] = [];
        if (randomSuffix === 'Midnight Edition' || randomSuffix === 'Triple Black') tags.push('black-white');
        if (randomSuffix === 'Volt' || randomSuffix === 'Red October') tags.push('colour-flash', 'fluo');
        if (randomSuffix === 'Royal' || randomSuffix === 'Chicago' || randomSuffix === 'Bred') tags.push('vintage');
        if (seededRandom(cloneId + 5) > 0.7) tags.push('studs'); // Randomly assign studs
        
        // Ensure at least one tag is present for testing some variety
        if (tags.length === 0) tags.push('vintage');

        // Mock Data Assignment for Clones
        const cloneColors = [...allColors].sort(() => seededRandom(cloneId + 10) - 0.5).slice(0, Math.floor(seededRandom(cloneId + 11) * 3) + 1);
        const cloneSizes = [...allSizes].sort(() => seededRandom(cloneId + 12) - 0.5).slice(0, Math.floor(seededRandom(cloneId + 13) * 5) + 4);
        const cloneMaterial: string = allMaterials[Math.floor(seededRandom(cloneId + 14) * allMaterials.length)] || allMaterials[0] || 'Wool';
        const cloneProductType: string = allProductTypes[Math.floor(seededRandom(cloneId + 15) * allProductTypes.length)] || allProductTypes[0] || 'Everyday Sneakers';
        
        const cloneDaysAgo = Math.floor(seededRandom(cloneId + 16) * 365);
        const cloneCreatedAt = new Date(Date.now() - cloneDaysAgo * 24 * 60 * 60 * 1000).toISOString();

        transformed.push({
          ...product,
          id: cloneId,
          title: `${product.title} ${randomSuffix}`,
          price: Math.max(0, cloneBasePrice),
          discountPercentage: seededRandom(cloneId) > 0.5 ? Math.floor(seededRandom(cloneId + 1) * 30 + 10) : 0,
          thumbnail: cloneImage, 
          images: cloneImageSet,
          tags: tags,
          colors: cloneColors,
          sizes: cloneSizes,
          material: cloneMaterial,
          productType: cloneProductType,
          createdAt: cloneCreatedAt
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
        
        products.value = transformProducts(combined);
        hasLoaded.value = true;
    } catch (err: unknown) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch products';
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
