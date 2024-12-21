export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface Gallery {
  id: number;
  url: string;
}

export interface Route {
  startTime: string[];
  groupSize: number;
}

export interface Vehicle {
  name: string;
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
  route: Route;
  vehicle: Vehicle;
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