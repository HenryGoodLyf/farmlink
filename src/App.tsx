import React, { useState, useMemo } from 'react';
import { 
  ProduceListing, 
  ProduceCategory, 
  Order, 
  MarketPriceItem,
  AppUser
} from './types';
import { 
  INITIAL_MARKET_INDEX, 
  getSavedListings, 
  saveListings, 
  getSavedOrders, 
  saveOrders,
  getCurrentUser,
  setCurrentUser,
  NIGERIAN_STATES
} from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarketPriceTracker } from './components/MarketPriceTracker';
import { ProduceCard } from './components/ProduceCard';
import { ProduceDetailModal } from './components/ProduceDetailModal';
import { OrderModal } from './components/OrderModal';
import { PostProduceModal } from './components/PostProduceModal';
import { HaulageEstimatorModal } from './components/HaulageEstimatorModal';
import { MyOrdersModal } from './components/MyOrdersModal';
import { AuthModal } from './components/AuthModal';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Leaf, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  PhoneCall,
  UserPlus
} from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUserState] = useState<AppUser | null>(getCurrentUser);
  const [listings, setListings] = useState<ProduceListing[]>(getSavedListings);
  const [orders, setOrders] = useState<Order[]>(getSavedOrders);
  const [marketPrices] = useState<MarketPriceItem[]>(INITIAL_MARKET_INDEX);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProduceCategory>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [wholesaleOnly, setWholesaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'rating'>('featured');

  // Modal states
  const [activeListingForDetail, setActiveListingForDetail] = useState<ProduceListing | null>(null);
  const [activeListingForOrder, setActiveListingForOrder] = useState<ProduceListing | null>(null);
  const [isPostProduceOpen, setIsPostProduceOpen] = useState<boolean>(false);
  const [isHaulageOpen, setIsHaulageOpen] = useState<boolean>(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'register' | 'signin'>('register');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenAuth = (mode: 'register' | 'signin' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleUserAuthenticated = (user: AppUser) => {
    setCurrentUserState(user);
    setCurrentUser(user);
    showToast(`Welcome ${user.fullName}! Logged in as ${user.role}.`);
  };

  const handleSignOut = () => {
    setCurrentUserState(null);
    setCurrentUser(null);
    showToast('Signed out successfully.');
  };

  // Handle new produce listing
  const handleListingCreated = (newListing: ProduceListing) => {
    const updated = [newListing, ...listings];
    setListings(updated);
    saveListings(updated);
    showToast(`"${newListing.title}" successfully published to the marketplace!`);
  };

  // Handle order creation (with atomic inventory reduction)
  const handleOrderCreated = (newOrder: Order) => {
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveOrders(updatedOrders);

    // Atomically decrement stock on the target listing
    const updatedListings = listings.map((item) => {
      if (item.id === newOrder.listingId) {
        const remainingQty = Math.max(0, item.quantity - newOrder.quantity);
        return {
          ...item,
          quantity: remainingQty,
          completedOrders: item.completedOrders + 1,
          inStock: remainingQty > 0,
        };
      }
      return item;
    });

    setListings(updatedListings);
    saveListings(updatedListings);
    showToast(`Order #${newOrder.id} confirmed and dispatched to farmer!`);
  };

  // Filtered & Sorted listings
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Category
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        // State
        if (selectedState !== 'all' && item.state.toLowerCase() !== selectedState.toLowerCase()) {
          return false;
        }
        // Wholesale only
        if (wholesaleOnly && !item.isWholesale) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchState = item.state.toLowerCase().includes(q);
          const matchLocation = item.marketLocation.toLowerCase().includes(q);
          const matchFarmer = item.farmerName.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          if (!matchTitle && !matchState && !matchLocation && !matchFarmer && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default featured
      });
  }, [listings, selectedCategory, selectedState, wholesaleOnly, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedState('all');
    setWholesaleOnly(false);
    setSortBy('featured');
  };

  const handleScrollToMarket = () => {
    const el = document.getElementById('market');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPriceIndex = () => {
    const el = document.getElementById('price-index');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-stone-900 text-white px-4 py-3 rounded-xl shadow-lg border border-stone-700 flex items-center gap-3 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        onOpenPostProduce={() => setIsPostProduceOpen(true)}
        onOpenMyOrders={() => setIsMyOrdersOpen(true)}
        onScrollToMarketIndex={handleScrollToPriceIndex}
        onOpenHaulageEstimator={() => setIsHaulageOpen(true)}
        ordersCount={orders.length}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={handleScrollToMarket}
        onPostProduceClick={() => setIsPostProduceOpen(true)}
        totalListingsCount={listings.length}
      />

      {/* Registration Incentive Strip for unregistered visitors */}
      {!currentUser && (
        <div className="bg-emerald-950 text-white border-b border-emerald-900 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span><strong>Join Nigerian Agriculture:</strong> Register free with your Phone Number or Email to manage farmgate listings and track wholesale orders.</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenAuth('register')}
                className="px-3 py-1 font-semibold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-md transition-colors cursor-pointer"
              >
                Register Free
              </button>
              <button
                type="button"
                onClick={() => handleOpenAuth('signin')}
                className="text-emerald-300 hover:text-white underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Market Price Intelligence Strip */}
      <MarketPriceTracker prices={marketPrices} />

      {/* Main Produce Catalog Section */}
      <main id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        {/* Title & Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                Produce Catalog
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mt-0.5">
                Fresh Harvests & Bulk Commodities
              </h2>
            </div>
            <div className="text-xs text-stone-500 font-mono tabular-nums">
              Showing {filteredListings.length} of {listings.length} batches available
            </div>
          </div>

          {/* Interactive Category Segmented Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto text-xs font-medium no-scrollbar">
            {[
              { id: 'all', label: 'All Harvests' },
              { id: 'tubers', label: 'Tubers & Roots' },
              { id: 'grains', label: 'Grains & Cereals' },
              { id: 'vegetables', label: 'Vegetables & Peppers' },
              { id: 'oils_staples', label: 'Oils & Staples' },
              { id: 'livestock', label: 'Poultry & Livestock' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as ProduceCategory)}
                className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-emerald-950 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search, State Filter, Wholesale Toggle, and Sort Bar */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search crop, state (Benue, Kano...), or market..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {/* State Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
              >
                <option value="all">All 36 States + FCT</option>
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Farmer Rating</option>
              </select>
            </div>

            {/* Wholesale Toggle */}
            <div className="lg:col-span-2 flex items-center justify-between sm:justify-end gap-2">
              <label className="flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={wholesaleOnly}
                  onChange={(e) => setWholesaleOnly(e.target.checked)}
                  className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 cursor-pointer"
                />
                <span className="font-medium whitespace-nowrap">Bulk Only</span>
              </label>

              {(searchQuery || selectedCategory !== 'all' || selectedState !== 'all' || wholesaleOnly) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="p-1.5 text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1 cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredListings.map((listing) => (
              <ProduceCard
                key={listing.id}
                listing={listing}
                onViewDetails={(item) => setActiveListingForDetail(item)}
                onPlaceOrder={(item) => setActiveListingForOrder(item)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
            <Leaf className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">
              No matching agricultural batches found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try clearing your search query or switching state/category filters to view available harvests across Nigeria.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Educational & Trust Footer */}
      <footer className="mt-16 bg-stone-900 text-stone-300 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-emerald-700 text-white flex items-center justify-center font-extrabold text-sm">
                  FL
                </span>
                <span className="text-lg font-bold text-white tracking-tight">FarmLink NG</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Open-access agricultural marketplace connecting rural Nigerian farmers, cooperatives, wholesalers, and urban consumers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Key Produce Belts
              </div>
              <ul className="text-xs text-stone-400 space-y-1.5">
                <li>Benue State — Yams & Soybeans</li>
                <li>Kano State — Maize, Sorghum & Cowpeas</li>
                <li>Plateau State — Tomatoes, Irish Potatoes & Veggies</li>
                <li>Ebonyi & Niger — Swamp Paddies & Rice Mills</li>
                <li>Enugu & Ondo — Pure Palm Oil & Garri</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Safe Trade Principles
              </div>
              <ul className="text-xs text-stone-400 space-y-1.5">
                <li>1. Inspect produce upon arrival before releasing payment.</li>
                <li>2. Verify vehicle plate numbers and driver manifest on haulage dispatch.</li>
                <li>3. Check moisture content and destoning certificates on bulk grains.</li>
                <li>4. Use FarmLink Escrow for long-distance interstate transactions.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Account & Services
              </div>
              <div className="space-y-2">
                {!currentUser ? (
                  <button
                    type="button"
                    onClick={() => handleOpenAuth('register')}
                    className="w-full text-left px-3 py-2 text-xs font-medium bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer block"
                  >
                    Register with Email / Phone
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-rose-300 rounded-lg transition-colors cursor-pointer block"
                  >
                    Sign Out ({currentUser.fullName})
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsPostProduceOpen(true)}
                  className="w-full text-left px-3 py-2 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors cursor-pointer block"
                >
                  + Post Harvest
                </button>
                <button
                  type="button"
                  onClick={() => setIsHaulageOpen(true)}
                  className="w-full text-left px-3 py-2 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors cursor-pointer block"
                >
                  Check Interstate Haulage Rates
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div>
              © 2026 FarmLink NG. Built for Nigerian Agricultural Prosperity.
            </div>
            <div className="flex items-center gap-4">
              <span>Phone / Email Auth</span>
              <span aria-hidden="true">·</span>
              <span>100% Direct Contact</span>
              <span aria-hidden="true">·</span>
              <span>Anti-Scraping Protected</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProduceDetailModal
        listing={activeListingForDetail}
        onClose={() => setActiveListingForDetail(null)}
        onPlaceOrder={(listing) => setActiveListingForOrder(listing)}
      />

      <OrderModal
        listing={activeListingForOrder}
        onClose={() => setActiveListingForOrder(null)}
        onOrderCreated={handleOrderCreated}
        currentUser={currentUser}
      />

      <PostProduceModal
        isOpen={isPostProduceOpen}
        onClose={() => setIsPostProduceOpen(false)}
        onListingCreated={handleListingCreated}
        currentUser={currentUser}
        onOpenAuth={() => handleOpenAuth('register')}
      />

      <HaulageEstimatorModal
        isOpen={isHaulageOpen}
        onClose={() => setIsHaulageOpen(false)}
      />

      <MyOrdersModal
        isOpen={isMyOrdersOpen}
        onClose={() => setIsMyOrdersOpen(false)}
        orders={orders}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onUserAuthenticated={handleUserAuthenticated}
        initialMode={authModalMode}
      />
    </div>
  );
}
