export type ProduceCategory = 
  | 'all' 
  | 'tubers' 
  | 'grains' 
  | 'vegetables' 
  | 'oils_staples' 
  | 'livestock';

export interface ProduceListing {
  id: string;
  title: string;
  category: ProduceCategory;
  price: number; // in Naira (NGN)
  unit: string; // e.g., '100kg Bag', '100 Tubers', '50kg Basket', '25L Keg', 'Crate (30 eggs)'
  quantity: number;
  moq: number; // Minimum Order Quantity
  isWholesale: boolean;
  state: string; // e.g. Benue, Kano, Plateau, Oyo
  marketLocation: string; // e.g. Zaki Biam Yam Market
  farmerName: string;
  farmerPhone: string;
  farmerType: 'Smallholder Farmer' | 'Commercial Farm' | 'Cooperative Union';
  harvestDate: string;
  image: string;
  description: string;
  rating: number;
  completedOrders: number;
  inStock: boolean;
}

export interface Order {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  buyerName: string;
  buyerPhone: string;
  deliveryState: string;
  deliveryAddress: string;
  paymentMethod: 'cod' | 'transfer' | 'escrow';
  status: 'Pending Confirmation' | 'Confirmed by Farmer' | 'Dispatched' | 'Delivered';
  createdAt: string;
}

export interface MarketPriceItem {
  id: string;
  crop: string;
  unit: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  market: string;
  state: string;
  lastUpdated: string;
}

export interface HaulageRate {
  fromState: string;
  toState: string;
  transitHours: number;
  costPer50kgBag: number;
  costPerTon: number;
  hubName: string;
}

export type UserRole = 'farmer' | 'buyer' | 'wholesaler';

export interface AppUser {
  id: string;
  fullName: string;
  identifier: string; // phone number or email
  identifierType: 'phone' | 'email';
  phone: string;
  email?: string;
  role: UserRole;
  state: string;
  lgaOrMarket: string;
  farmOrBusinessName?: string;
  isVerified: boolean;
  createdAt: string;
}
