import { ref } from 'vue';
import axios from 'axios';
import type { Product } from '../types/product';

// Shared state
const products = ref<Product[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const hasLoaded = ref(false); // Track if we've already fetched

// Authentic Allbirds product imagery in 3-image sets
const allbirdsImageSets = [
    // 1. Trail Runner Set (Real Angles)
    [
        'https://www.allbirds.com/cdn/shop/files/A12506_26Q1_Trail-Runner-Deep-Red-Dark-Anthracite_PDP_LEFT_875428f9-f820-4a33-8cd5-01b830f99546.png',
        'https://www.allbirds.com/cdn/shop/files/A12506_26Q1_Trail-Runner-Deep-Red-Dark-Anthracite_PDP_PAIR_3Q_bf0e3177-0b1f-43f3-8913-96aa0a9c751e.png',
        'https://www.allbirds.com/cdn/shop/files/A12506_26Q1_Trail-Runner-Deep-Red-Dark-Anthracite_PDP_SOLE_95ddd79f-bb44-43bd-ab27-9e82bab07ccf.png'
    ],
    // 2. Cruiser Colors (Verdant Green, Deep Navy, Toasted Coconut)
    [
        'https://www.allbirds.com/cdn/shop/files/A12335_26Q1_Cruiser-Verdant-Green-Blizzard-Sole_PDP_LEFT_129905ba-94b9-4762-bfd9-68d58131ed07.png',
        'https://www.allbirds.com/cdn/shop/files/A12504_26Q1_Cruiser-Slip-On-Deep-Navy-Natural-White-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12310_26Q1_Cruiser-Terralux-Toasted-Coconut-Medium-Gum-Sole_PDP_LEFT.png'
    ],
    // 3. Dasher Colors (Blizzard/Anthracite, Deep Navy, Auburn)
    [
        'https://www.allbirds.com/cdn/shop/files/A12453_26Q1_Golf-Dasher-Blizzard-Anthra-Blizz_PDP_LEFT_c7fcb8a8-226a-4a78-9f5c-69b3c40ee3e4.png',
        'https://www.allbirds.com/cdn/shop/files/A12464_26Q1_Dasher-NZ-Blizzard-Deep-Navy-Blizzard_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12423_26Q1_Dasher-NZ-Relay-Auburn-Auburn_PDP_LEFT.png'
    ],
    // 4. Wool Runner Colors (Stony Cream, Dark Grey, Dapple Grey)
    [
        'https://www.allbirds.com/cdn/shop/files/A12061_25Q3_Wool-Runner-NZ-Mid-Waterproof-Stony-Cream-Rugged-Beige-Stony-Cream-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12007_25Q3_Wool-Runner-NZ-Waterproof-Dark-Grey-Light-Grey-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/WR3MDPG_SHOE_LEFT_GLOBAL_MENS_WOOL_RUNNER_DAPPLE_GREY_CREAM_a125cf03-f7cb-481e-af35-bdeecca29882.png'
    ],
    // 5. Varsity Colors (Light Grey, Mushroom, Parchment)
    [
        'https://www.allbirds.com/cdn/shop/files/A12526_26Q2_Varsity-Terralux-Light-Grey-Light-Grey-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12569_26Q1_Mens-Varsity-Airy-Mushroom-Blizzard-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12270_26Q1_Mens-Varsity-Parchment-Blizzard-Sole_PDP_LEFT.png'
    ],
    // 6. Tree Runner / Glider (Mushroom, Burnt Olive, Warm Red)
    [
        'https://www.allbirds.com/cdn/shop/files/A12587_26Q1_Tree-Glider-Mushroom-Light-Mushroom_PDP_LEFT_82f54d05-e967-45f0-9956-264c9bee1244.png',
        'https://www.allbirds.com/cdn/shop/files/A12485_26Q1_Tree-Runner-NZ-Burnt-Olive-Burnt-Olive-Sole_PDP_LEFT_9487ac29-5786-4fd4-8b61-1f9430bdd42b.png',
        'https://www.allbirds.com/cdn/shop/files/A12329_26Q1_Strider-Warm-Red-Mushroom_PDP_LEFT.png'
    ],
    // 7. Terralux / Slip Ons (Anthracite, Burnt Olive, Canvas White)
    [
        'https://www.allbirds.com/cdn/shop/files/A12422_26Q1_Runner-NZ-Terralux-Anthracite-Dark-Anthr_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12471_26Q1_Runner-NZ-Slip-On-Burnt-Olive-Burnt-Olive-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12344_26Q1_Cruiser-Canvas-Warm-White-Natural-White_PDP_LEFT_e95df9c3-e2cb-48df-b472-8c3edfb74fce.png'
    ],
    // 8. Clogs / Slippers / Mizzle (Dark Camel, Natural White, Medium Grey)
    [
        'https://www.allbirds.com/cdn/shop/files/A12147_25Q4_Kiwi-Clog-Dark-Camel-Stony-Cream-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A12034_25Q4_Wool-Slipper-Natural-White-Natural-White-Sole_PDP_LEFT.png',
        'https://www.allbirds.com/cdn/shop/files/A11092_24Q2_Wool-Dasher-2-Mizzle-Medium-Grey-Natural-Black_PDP_LEFT.png'
    ]
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
      const imageSet = allbirdsImageSets[index % allbirdsImageSets.length] || allbirdsImageSets[0] as string[];
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
        const cloneImageSet = allbirdsImageSets[(index + 5 + i) % allbirdsImageSets.length] || allbirdsImageSets[0] as string[];
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
