export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags?: string[]; // For 'Edit' filters like 'Studs', 'Vintage', etc.
  colors: string[]; // ['black', 'white', 'grey', etc.]
  sizes: string[]; // ['8', '8.5', 'M', etc.]
  material: string; // 'Wool', 'Canvas', etc.
  productType: string; // 'Everyday Sneakers', 'Running Shoes', etc.
  createdAt?: string; // For 'DATE, NEW TO OLD' sorting
}
