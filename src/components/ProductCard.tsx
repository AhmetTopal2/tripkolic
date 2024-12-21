import { useState } from 'react';
import ImageCarousel from './ImageCarousel';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    galleries: { id: number; url: string; }[];
    price: { 
      adultPrice: number;
      childPrice: number;
      infantPrice: number;
    };
    vehicle: { name: string; };
    tourCategory: { name: string; };
    routes: Array<{
      startTime: string[];
      groupSize: number;
      duration: string;
      guideLanguage: string[];
    }>;
    foodAndDrinks: { 
      name: string;
      isActive: boolean;
    }[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const route = product.routes[0];
  const [showAllItems, setShowAllItems] = useState(false);

  if (!route) return null;

  const displayItems = showAllItems ? product.foodAndDrinks : product.foodAndDrinks.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ImageCarousel images={product.galleries} title={product.title} />
      
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-black">{product.title}</h3>
            <p className="text-sm text-gray-700">{product.tourCategory.name}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary-500">
              ${product.price.adultPrice}
            </p>
            <p className="text-xs text-gray-700">per adult</p>
          </div>
        </div>

        <p className="text-gray-800 text-sm line-clamp-2">{product.description}</p>

        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-700">Duration</p>
              <p className="font-medium text-black">{route.duration} hours</p>
            </div>
            <div>
              <p className="text-gray-700">Group Size</p>
              <p className="font-medium text-black">Up to {route.groupSize} people</p>
            </div>
            <div>
              <p className="text-gray-700">Transport</p>
              <p className="font-medium text-black">{product.vehicle.name}</p>
            </div>
            <div>
              <p className="text-gray-700">Languages</p>
              <p className="font-medium text-black">{route.guideLanguage.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-black mb-2">Included:</p>
          <div className="flex flex-wrap gap-2">
            {displayItems.map(item => (
              <span
                key={item.name}
                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
              >
                {item.name}
              </span>
            ))}
            {!showAllItems && product.foodAndDrinks.length > 3 && (
              <button
                onClick={() => setShowAllItems(true)}
                className="text-xs text-primary-500 hover:text-primary-600"
              >
                +{product.foodAndDrinks.length - 3} more
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm">
            <p className="text-gray-700">Starting times:</p>
            <p className="font-medium text-black">{route.startTime.join(', ')}</p>
          </div>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 