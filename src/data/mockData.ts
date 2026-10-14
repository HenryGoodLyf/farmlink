import { ProduceListing, MarketPriceItem, HaulageRate, Order, AppUser } from '../types';

export const INITIAL_LISTINGS: ProduceListing[] = [
  {
    id: 'fl-prod-001',
    title: 'Grade-A Fresh White Yams (Zaki Biam Harvest)',
    category: 'tubers',
    price: 220000,
    unit: '100 Large Tubers',
    quantity: 45,
    moq: 1,
    isWholesale: true,
    state: 'Benue',
    marketLocation: 'Zaki Biam Yam Market, Ukum',
    farmerName: 'Torkwase Agber (Mbakor Farmers Union)',
    farmerPhone: '08034918234',
    farmerType: 'Cooperative Union',
    harvestDate: 'Harvested 3 days ago',
    image: '/src/assets/images/produce_yam_tubers_1791974042374.jpg',
    description: 'Dry, mature, pest-free white yams harvested from fertile Benue river basin soils. Excellent starch content, ideal for poundo or wholesale retail distribution.',
    rating: 4.9,
    completedOrders: 142,
    inStock: true,
  },
  {
    id: 'fl-prod-002',
    title: 'Farmgate Fresh Plum Tomatoes & Scotch Bonnet Peppers',
    category: 'vegetables',
    price: 36000,
    unit: '50kg Raffia Basket',
    quantity: 120,
    moq: 2,
    isWholesale: true,
    state: 'Plateau',
    marketLocation: 'Jos Central Agricultural Depot, Jos',
    farmerName: 'Gyang Pam',
    farmerPhone: '08023419082',
    farmerType: 'Smallholder Farmer',
    harvestDate: 'Freshly harvested today',
    image: '/src/assets/images/produce_fresh_tomatoes_1791974042845.jpg',
    description: 'Firm, sun-ripened Jos tomatoes packed with extra scotch bonnet (ata rodo) peppers in sturdy woven baskets. Cooled and shaded for immediate interstate transit.',
    rating: 4.8,
    completedOrders: 89,
    inStock: true,
  },
  {
    id: 'fl-prod-003',
    title: 'Unadulterated Nsukka Pure Red Palm Oil (First Press)',
    category: 'oils_staples',
    price: 44000,
    unit: '25-Litre Yellow Keg',
    quantity: 60,
    moq: 1,
    isWholesale: false,
    state: 'Enugu',
    marketLocation: 'Obollo-Afor Palm Oil Hub, Nsukka',
    farmerName: 'Mazi Chukwuemeka Eze',
    farmerPhone: '08138761290',
    farmerType: 'Commercial Farm',
    harvestDate: 'Pressed this week',
    image: '/src/assets/images/produce_grains_staples_1791974043244.jpg',
    description: '100% thick, unblended red palm oil processed with zero additives or water dilution. Rich natural carotene aroma and deep red hue from ripe palm bunches.',
    rating: 5.0,
    completedOrders: 210,
    inStock: true,
  },
  {
    id: 'fl-prod-004',
    title: 'Clean Sun-Dried White Maize (100kg Jute Bag)',
    category: 'grains',
    price: 72000,
    unit: '100kg Bag',
    quantity: 350,
    moq: 5,
    isWholesale: true,
    state: 'Kano',
    marketLocation: 'Dawanau International Grain Market, Kano',
    farmerName: 'Alhaji Bashir Umar & Sons',
    farmerPhone: '08065549012',
    farmerType: 'Cooperative Union',
    harvestDate: 'Harvested October 2026',
    image: '/src/assets/images/hero_nigerian_harvest_1791974041593.jpg',
    description: 'Triple-sieved white maize grain with moisture content strictly below 12%. No weevils or stone contaminants. Ready for feed mills, pap/ogi processors, and brewery flouring.',
    rating: 4.9,
    completedOrders: 540,
    inStock: true,
  },
  {
    id: 'fl-prod-005',
    title: 'Sweet Brown Honey Beans (Oloyin - Direct Zaria Sacks)',
    category: 'grains',
    price: 115000,
    unit: '50kg Bag',
    quantity: 80,
    moq: 1,
    isWholesale: true,
    state: 'Kaduna',
    marketLocation: 'Giwa Central Grain Depot, Zaria',
    farmerName: 'Mallam Haruna Danladi',
    farmerPhone: '07038901243',
    farmerType: 'Smallholder Farmer',
    harvestDate: 'Sun-cured 5 days ago',
    image: '/src/assets/images/produce_grains_staples_1791974043244.jpg',
    description: 'Genuine fast-cooking Oloyin brown beans, naturally sweet taste, thoroughly hand-picked and preserved using neem-leaf traditional bio-methods without hazardous chemical powders.',
    rating: 4.7,
    completedOrders: 167,
    inStock: true,
  },
  {
    id: 'fl-prod-006',
    title: 'Abakaliki Premium Parboiled Rice (Stone-Free Sortexed)',
    category: 'grains',
    price: 88000,
    unit: '50kg Bag',
    quantity: 140,
    moq: 2,
    isWholesale: true,
    state: 'Ebonyi',
    marketLocation: 'Abakaliki Rice Mill Complex, Ebonyi',
    farmerName: 'Ebonyi Rice Growers Cluster',
    farmerPhone: '08051239845',
    farmerType: 'Cooperative Union',
    harvestDate: 'Milled October 2026',
    image: '/src/assets/images/produce_grains_staples_1791974043244.jpg',
    description: 'Locally grown long grain parboiled rice from fertile swamp paddies. Highly nutritious with intact vitamins, Sortex machine destoned, no unpleasant odor.',
    rating: 4.9,
    completedOrders: 312,
    inStock: true,
  },
  {
    id: 'fl-prod-007',
    title: 'Live Commercial Broiler Chickens (2.8kg - 3.2kg Average)',
    category: 'livestock',
    price: 9500,
    unit: 'Live Bird',
    quantity: 400,
    moq: 5,
    isWholesale: true,
    state: 'Oyo',
    marketLocation: 'Akinyele Agro Hub, Ibadan',
    farmerName: 'Dr. Segun Adeleke',
    farmerPhone: '08149023412',
    farmerType: 'Commercial Farm',
    harvestDate: '8-week mature birds',
    image: '/src/assets/images/hero_nigerian_harvest_1791974041593.jpg',
    description: 'Fully vaccinated, heavy commercial broilers reared on biosecure automated deep litter. Well-fleshed breasts, high meat yield for catering, hotels, and cold room operators.',
    rating: 4.8,
    completedOrders: 94,
    inStock: true,
  },
  {
    id: 'fl-prod-008',
    title: 'Crispy Fermented Yellow Ijebu Garri (Fine Grain)',
    category: 'tubers',
    price: 48000,
    unit: '50kg Bag',
    quantity: 90,
    moq: 1,
    isWholesale: false,
    state: 'Ogun',
    marketLocation: 'Ijebu-Ode Garri Processing Depot',
    farmerName: 'Iya Morayo Cassava Millers',
    farmerPhone: '08091245678',
    farmerType: 'Smallholder Farmer',
    harvestDate: 'Fried yesterday',
    image: '/src/assets/images/produce_grains_staples_1791974043244.jpg',
    description: 'Traditional 4-day fermented cassava mash, dry roasted with palm oil touch. Sour, crunchy, floats on cold water, zero residue or sand particles.',
    rating: 4.9,
    completedOrders: 280,
    inStock: true,
  }
];

export const INITIAL_MARKET_INDEX: MarketPriceItem[] = [
  {
    id: 'mpi-01',
    crop: 'White Maize (Dry)',
    unit: '100kg Bag',
    currentPrice: 72000,
    previousPrice: 76000,
    trend: 'down',
    changePercent: -5.2,
    market: 'Dawanau Grain Market',
    state: 'Kano',
    lastUpdated: 'Today, 08:30 AM',
  },
  {
    id: 'mpi-02',
    crop: 'Benue White Yam',
    unit: '100 Large Tubers',
    currentPrice: 220000,
    previousPrice: 210000,
    trend: 'up',
    changePercent: 4.7,
    market: 'Zaki Biam Yam Market',
    state: 'Benue',
    lastUpdated: 'Today, 07:15 AM',
  },
  {
    id: 'mpi-03',
    crop: 'Brown Honey Beans',
    unit: '50kg Bag',
    currentPrice: 115000,
    previousPrice: 115000,
    trend: 'stable',
    changePercent: 0.0,
    market: 'Giwa Market, Zaria',
    state: 'Kaduna',
    lastUpdated: 'Yesterday',
  },
  {
    id: 'mpi-04',
    crop: 'Fresh Red Tomatoes',
    unit: '50kg Raffia Basket',
    currentPrice: 36000,
    previousPrice: 42000,
    trend: 'down',
    changePercent: -14.3,
    market: 'Jos Central / Mile 12',
    state: 'Plateau / Lagos',
    lastUpdated: 'Today, 09:00 AM',
  },
  {
    id: 'mpi-05',
    crop: 'Unadulterated Palm Oil',
    unit: '25-Litre Keg',
    currentPrice: 44000,
    previousPrice: 41000,
    trend: 'up',
    changePercent: 7.3,
    market: 'Obollo-Afor Market',
    state: 'Enugu',
    lastUpdated: '2 days ago',
  },
  {
    id: 'mpi-06',
    crop: 'Local Parboiled Rice',
    unit: '50kg Bag',
    currentPrice: 88000,
    previousPrice: 90000,
    trend: 'down',
    changePercent: -2.2,
    market: 'Abakaliki Rice Mill',
    state: 'Ebonyi',
    lastUpdated: 'Today, 08:00 AM',
  }
];

export const HAULAGE_ROUTES: HaulageRate[] = [
  {
    fromState: 'Benue (Makurdi/Zaki Biam)',
    toState: 'Lagos (Mile 12 / Iddo)',
    transitHours: 18,
    costPer50kgBag: 3200,
    costPerTon: 58000,
    hubName: 'North-Central to South-West Trunk Line',
  },
  {
    fromState: 'Kano (Dawanau)',
    toState: 'Lagos (Mile 12)',
    transitHours: 24,
    costPer50kgBag: 3800,
    costPerTon: 68000,
    hubName: 'Kano-Ibadan-Lagos Grain Express',
  },
  {
    fromState: 'Plateau (Jos)',
    toState: 'Abuja (Dei-Dei / Mararaba)',
    transitHours: 6,
    costPer50kgBag: 1600,
    costPerTon: 30000,
    hubName: 'Plateau Fresh Produce Corridor',
  },
  {
    fromState: 'Enugu / Ebonyi',
    toState: 'Rivers (Port Harcourt - Oil Mill)',
    transitHours: 7,
    costPer50kgBag: 1900,
    costPerTon: 34000,
    hubName: 'South-East to South-South Agro Corridor',
  },
  {
    fromState: 'Oyo (Ibadan / Ogbomoso)',
    toState: 'Lagos (Alaba Rago / Ketu)',
    transitHours: 3,
    costPer50kgBag: 1100,
    costPerTon: 19000,
    hubName: 'Western Agro Feed Line',
  }
];

export const NIGERIAN_STATES = [
  'Abia', 'Abuja (FCT)', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
}

export function maskPhoneNumber(phone: string): string {
  const clean = phone.trim();
  if (clean.length < 8) return clean;
  const prefix = clean.slice(0, 4);
  const suffix = clean.slice(-3);
  return `${prefix} ••• •${suffix}`;
}

// LocalStorage helpers to ensure persistence across reloads
const STORAGE_KEY_LISTINGS = 'farmlink_ng_listings_v1';
const STORAGE_KEY_ORDERS = 'farmlink_ng_orders_v1';

export function getSavedListings(): ProduceListing[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LISTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(INITIAL_LISTINGS));
      return INITIAL_LISTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LISTINGS;
  }
}

export function saveListings(listings: ProduceListing[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(listings));
  } catch (err) {
    console.error('Failed to save listings to localStorage', err);
  }
}

export function getSavedOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage', err);
  }
}

export const INITIAL_USERS: AppUser[] = [
  {
    id: 'usr-farmer-01',
    fullName: 'Torkwase Agber',
    identifier: '08034918234',
    identifierType: 'phone',
    phone: '08034918234',
    email: 'torkwase.agber@benuefarms.ng',
    role: 'farmer',
    state: 'Benue',
    lgaOrMarket: 'Zaki Biam Yam Depot, Ukum',
    farmOrBusinessName: 'Mbakor Farmers Union',
    isVerified: true,
    createdAt: 'Joined Oct 2026',
  },
  {
    id: 'usr-buyer-02',
    fullName: 'Alhaji Adebayo Adeleke',
    identifier: 'adebayo@lagosgrain.com',
    identifierType: 'email',
    phone: '08023456789',
    email: 'adebayo@lagosgrain.com',
    role: 'wholesaler',
    state: 'Lagos',
    lgaOrMarket: 'Mile 12 International Market, Kosofe',
    farmOrBusinessName: 'Adeleke Agro Commodity Ventures',
    isVerified: true,
    createdAt: 'Joined Sep 2026',
  },
  {
    id: 'usr-consumer-03',
    fullName: 'Ngozi Okonjo',
    identifier: '08129876543',
    identifierType: 'phone',
    phone: '08129876543',
    email: 'ngozi.okonjo@gmail.com',
    role: 'buyer',
    state: 'Abuja (FCT)',
    lgaOrMarket: 'Maitama / Wuse 2 Market Hub',
    isVerified: true,
    createdAt: 'Joined Oct 2026',
  }
];

const STORAGE_KEY_USERS = 'farmlink_ng_users_v1';
const STORAGE_KEY_CURRENT_USER = 'farmlink_ng_current_user_v1';

export function getSavedUsers(): AppUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
}

export function saveUsers(users: AppUser[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users', err);
  }
}

export function getCurrentUser(): AppUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AppUser | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  } catch (err) {
    console.error('Failed to set current user', err);
  }
}

