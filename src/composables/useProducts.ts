import { ref } from 'vue';
import axios from 'axios';
import type { Product } from '../types/product';

// Shared state
const products = ref<Product[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);
const hasLoaded = ref(false); // Track if we've already fetched

// High-quality sneaker images
const sneakerImages = [
    // Nike
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-mens-shoes-jBrhbr.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-retro-mens-shoes-njPH0Q.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-max-270-mens-shoes-KkLcGR.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-981f-d2a84793a46b/waffle-debut-mens-shoes-hrfHXh.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5257f8a7-7e61-4da2-959c-722aadc7f10e/air-jordan-1-mid-mens-shoes-X5pM09.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0212f452-e56d-4deb-b7df-ec963167ba63/blazer-mid-77-vintage-mens-shoes-nw30B2.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8a317687-1b08-49c3-aec1-516486298aad/lebron-xx-basketball-shoes-zM0pQt.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c2084c8d-6997-425f-82fe-332d4ba7d800/air-max-90-mens-shoes-6n3vKB.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7d9620b7-44df-412e-9d29-655c654be621/pegasus-40-mens-road-running-shoes-MCvB5k.png',
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e4f7b9r8-4b7d-4c3e-9f5a-2e6b8c1d9e0f/air-jordan-1-low-mens-shoes-0L9v2v.png',

    // Adidas
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/Forum_Low_Shoes_White_FY7756_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/6a0d62124ea94dd016730a9181c7827e_9366/Gazelle_Shoes_Black_BB5476_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c2293e5af2dc457e841261a86842cb1e_9366/Samba_OG_Shoes_White_B75806_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/23a0590a36e949988f50ac8e00d832e0_9366/Superstar_Shoes_White_EG4958_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f5494dff9773418bafe6ac3e00be464a_9366/Ultraboost_Light_Running_Shoes_White_HQ6351_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849e49dd8279ac8e00d83637_9366/NMD_R1_Shoes_Black_GZ9258_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8b49b38031d24c04900fac3e00cf76d7_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg',
    
    // New Balance / Other
    'https://nb.scene7.com/is/image/NB/bb550www_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=880&hei=880',
    'https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=880&hei=880',
    'https://nb.scene7.com/is/image/NB/mr530sg_nb_02_i?$pdpflexf2$&qlt=80&fmt=webp&wid=880&hei=880'
];

export function useProducts() {
  const transformProducts = (originalProducts: Product[]): Product[] => {
    const transformed: Product[] = [];
    const suffixes = ['Midnight Edition', 'Volt', 'Red October', 'Cool Grey', 'Triple Black', 'Royal', 'Bred', 'Chicago', 'Panda'];

    originalProducts.forEach((product, index) => {
      // 1. Original
      const originalImage = sneakerImages[transformed.length % sneakerImages.length];
      const transformedOriginal = {
        ...product,
        thumbnail: originalImage,
        images: [originalImage]
      };
      transformed.push(transformedOriginal);

      // 2. Clones
      for (let i = 0; i < 3; i++) {
        const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const priceVariation = Math.floor(Math.random() * 41) - 20;
        
        // We need a deterministic but seemingly random ID for persistence during session if possible
        // But for mapped items, we'll just generate.
        const cloneId = parseInt(`${product.id}${i + 1}${Math.floor(Math.random() * 100)}`);
        
        const cloneImage = sneakerImages[transformed.length % sneakerImages.length];

        transformed.push({
          ...product,
          id: cloneId,
          title: `${product.title} - ${randomSuffix}`,
          price: Math.max(0, product.price + priceVariation),
          thumbnail: cloneImage, 
          images: [cloneImage, cloneImage] // Ensure images array has content
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
            axios.get('https://dummyjson.com/products/category/womens-shoes')
        ]);

        const originalProducts: Product[] = [...mensRes.data.products, ...womensRes.data.products];
        products.value = transformProducts(originalProducts);
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
