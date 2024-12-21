'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { FilterValues } from './FilterPopup';
import { Product, ApiResponse } from '@/types/product';

interface ProductGridProps {
  category: string;
  filters?: FilterValues;
}

const ProductGrid = ({ category, filters }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const applyFilters = useCallback((productsToFilter: Product[]) => {
    if (!filters) return productsToFilter;

    return productsToFilter.filter(product => {
      if (!product.route) return false;
      
      // Price filter
      const price = product.price.adultPrice;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      // Group size filter
      if (product.route.groupSize < filters.groupSize[0] || 
          product.route.groupSize > filters.groupSize[1]) {
        return false;
      }

      // Start time filter
      const startTimes = product.route.startTime;
      const hasValidTime = startTimes.some(time => {
        return time >= filters.startTime[0] && time <= filters.startTime[1];
      });
      if (!hasValidTime) return false;

      // Vehicle filter
      if (filters.vehicle?.length && !filters.vehicle.includes(product.vehicle.name)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Fetch products
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

  // Apply filters whenever products or filters change
  useEffect(() => {
    const filtered = applyFilters(products);
    setFilteredProducts(filtered);
  }, [products, applyFilters]);

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

  if (!filteredProducts.length) {
    return (
      <div className="text-center text-gray-700 py-8 text-lg">
        No data found in the category you are looking for
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid; 