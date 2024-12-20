# TripKolic Proje Dokümantasyonu

## Proje Genel Bakış
Bu proje, turlar, biletler, kiralama ve transfer hizmetleri için mobil öncelikli bir rezervasyon platformudur. Next.js, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## Temel Bileşenler

### 1. Navbar (`src/components/Navbar.tsx`)
- Ana navigasyon bileşeni
- Giriş/kayıt butonu ve hamburger menü içerir
- Logo görüntüleme
- Kategori ve filtre menüsünü kontrol eder

### 2. FilterMenu (`src/components/FilterMenu.tsx`)
- Kategori seçimi için menü
- Filtre popup'ını tetikler
- Kategoriler: Turlar, Biletler, Kiralama, Transfer

### 3. FilterPopup (`src/components/FilterPopup.tsx`)
- Gelişmiş filtreleme arayüzü
- Fiyat aralığı seçimi
- Başlangıç zamanı filtresi
- Grup büyüklüğü filtresi
- Araç tipi ve özellik seçimi

### 4. ProductGrid (`src/components/ProductGrid.tsx`)
- Ürünleri grid yapısında gösterir
- API'den veri çeker
- Filtreleme mantığını uygular
- Yükleme ve hata durumlarını yönetir

### 5. ProductCard (`src/components/ProductCard.tsx`)
- Tek bir ürünü görüntüler
- Resim galerisi
- Ürün detayları
- Fiyat ve rezervasyon butonu

### 6. ImageCarousel (`src/components/ImageCarousel.tsx`)
- Ürün resimlerini slider olarak gösterir
- Gezinme kontrolleri
- Otomatik boyutlandırma

### 7. Login (`src/components/Login.tsx`)
- Giriş/Kayıt formu
- Form doğrulama
- Test kullanıcı girişi

## API Entegrasyonu

### Endpoint
```
https://beta.tripkolic.com/api/v1/product/task/tours
```

### Veri Yapısı
```typescript
// Ana ürün arayüzü
interface Product {
  id: number;
  productId: string;
  title: string;
  description: string;
  isPayLater: boolean;
  cutOffTime: number;
  resarvationDeadline: string | null;
  transferType: string;
  isTransfer: boolean;
  transferDescription: string;
  guideLanguage: string[] | null;
  operatingDays: string[] | null;
  
  // Konum bilgisi
  activityLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  
  // Araç bilgisi
  vehicle: {
    id: number;
    name: string;
  };
  
  // Yiyecek ve içecek seçenekleri
  foodAndDrinks: Array<{
    id: number;
    name: string;
    isActive: boolean;
  }>;
  
  // Tur kategorisi
  tourCategory: {
    id: number;
    name: string;
  };
  
  // Rota bilgileri
  routes: Array<{
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    operatingDays: string[];
    locations: Array<{
      id: number;
      lat: number;
      lng: number;
      name: string;
      stop: number | null;
      activities: Array<{ name: string }>;
      sightseeing: boolean;
    }>;
    groupSize: number;
    startTime: string[];
    duration: string;
    guideLanguage: string[];
  }>;
  
  // Fiyatlandırma
  price: {
    id: number;
    isShared: boolean;
    isPrivate: boolean;
    adultPrice: number;
    childPrice: number;
    infantPrice: number;
    addOns: any[];
    additionalPrices: {
      adultPrice: number;
      childPrice: number;
      infantPrice: number;
    };
    group: {
      size: number;
      retailPrice: number;
    };
  };
  
  // Fiyat bilgi detayları
  pricesInfo: {
    id: number;
    minAge: number | null;
    pricingBase: string;
    scale: {
      adult: {
        max: number;
        min: number;
      };
      child: {
        max: number;
        min: number;
      } | null;
      infant: {
        max: number;
        min: number;
      } | null;
    };
  };
  
  // Galeri resimleri
  galleries: Array<{
    id: number;
    url: string;
  }>;
  
  // Diğer alanlar
  isShared: boolean | null;
  locations: any | null;
  availability: any[];
  draft: boolean;
  transferStartTimeOffset: number | null;
  transferVehicleCapacity: number | null;
  step: number;
  stepChild: number;
  createdAt: string;
  productCategory: string;
}

// API Yanıt yapısı
interface ApiResponse {
  products: Product[];
}

// Filtre değerleri arayüzü
interface FilterValues {
  location?: string;
  priceRange: [number, number];
  startTime: [string, string];
  groupSize: [number, number];
  vehicle?: string[];
  features?: string[];
  theme?: string[];
  activities?: string[];
}
```

### Örnek API Yanıtı
```json
{
  "products": [
    {
      "id": 1,
      "productId": "111172024",
      "title": "Yeni Turu",
      "description": "Tur açıklaması",
      "price": {
        "adultPrice": 7000,
        "childPrice": 3500,
        "infantPrice": 0
      },
      "vehicle": {
        "id": 5,
        "name": "Catamaran"
      },
      "tourCategory": {
        "id": 2,
        "name": "Safari"
      },
      "routes": [
        {
          "groupSize": 4,
          "startTime": ["05:00", "08:00"],
          "duration": "3",
          "guideLanguage": ["English", "Spanish"]
        }
      ],
      "galleries": [
        {
          "id": 1,
          "url": "https://tripkolic-beta.s3.amazonaws.com/1731879985011.jpg"
        }
      ]
    }
  ]
}
```

## Durum Yönetimi

### Ana Sayfa Durumları
- selectedCategory: Seçili kategori
- isMenuOpen: Menü açık/kapalı durumu
- showLogin: Giriş formu görünürlüğü
- isLoggedIn: Kullanıcı giriş durumu
- filters: Aktif filtreler

### Filtre Durumları
- priceRange: Fiyat aralığı [min, max]
- startTime: Başlangıç zamanı aralığı
- groupSize: Grup büyüklüğü aralığı
- vehicle: Seçili araç tipleri
- features: Seçili özellikler

## Test Kullanıcı Bilgileri
```
Email: test@example.com
Şifre: password123
```

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleme:
```bash
npm install
```

2. Geliştirme sunucusunu başlatma:
```bash
npm run dev
```

3. Tarayıcıda açma:
```
http://localhost:3000
```

## Önemli Notlar

- Mobil öncelikli tasarım
- Responsive yapı
- TypeScript tip güvenliği
- Tailwind ile stil yönetimi
- Next.js görüntü optimizasyonu
- API veri önbelleği
