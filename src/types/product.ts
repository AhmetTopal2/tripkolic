export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Gallery {
  id: number;
  url: string;
}

export interface Product {
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
  routes: Array<{
    startTime: string[];
    groupSize: number;
  }>;
  vehicle: {
    name: string;
  };
  productCategory: 'tour' | 'ticket' | 'rent' | 'transfer';
  tourCategory: {
    name: string;
  };
  foodAndDrinks: Array<{
    name: string;
  }>;
}

export interface ApiResponse {
  products: Product[];
} 