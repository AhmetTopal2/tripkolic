'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { FilterValues } from './FilterPopup';

interface ProductGridProps {
  category: string;
  filters?: FilterValues;
}

interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

interface Gallery {
  id: number;
  url: string;
}

interface Product {
  id: number;
  productId: string;
  title: string;
  description: string;
  activityLocation: Location;
  galleries: Gallery[];
  price: {
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
  };
  routes: {
    startTime: string[];
    groupSize: number;
  }[];
  vehicle: {
    name: string;
  };
  productCategory: 'tour' | 'ticket' | 'rent' | 'transfer';
  tourCategory: {
    name: string;
  };
  foodAndDrinks: {
    name: string;
  }[];
}

interface ApiResponse {
  products: Product[];
}

const ProductGrid = ({ category, filters }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyFilters = useCallback(() => {
    if (!filters) return products;

    return products.filter(product => {
      if (!product.routes?.[0]) return false;
      const route = product.routes[0];
      
      // Price filter
      const price = product.price.adultPrice;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      // Group size filter
      if (route.groupSize < filters.groupSize[0] || route.groupSize > filters.groupSize[1]) {
        return false;
      }

      // Start time filter
      const startTimes = route.startTime;
      const hasValidTime = startTimes.some((time: string) => {
        return time >= filters.startTime[0] && time <= filters.startTime[1];
      });
      if (!hasValidTime) return false;

      // Vehicle filter
      if (filters.vehicle?.length && !filters.vehicle.includes(product.vehicle.name)) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>('https://beta.tripkolic.com/api/v1/product/task/tours');
        const filteredByCategory = response.data.products.filter(product => {
          switch (category) {
            case 'tours':
              return product.productCategory === 'tour';
            case 'tickets':
              return product.productCategory === 'ticket';
            case 'rent':
              return product.productCategory === 'rent';
            case 'transfer':
              return product.productCategory === 'transfer';
            default:
              return true;
          }
        });
        
        setProducts(filteredByCategory);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const filteredProducts = applyFilters();
    setProducts(filteredProducts);
  }, [filters, applyFilters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center text-gray-700 py-8 text-lg">
        No data found in the category you are looking for
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid; 