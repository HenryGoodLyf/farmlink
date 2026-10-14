import React, { useState } from 'react';
import { ProduceListing, ProduceCategory, AppUser } from '../types';
import { NIGERIAN_STATES } from '../data/mockData';
import { X, Upload, CheckCircle2, Image as ImageIcon, UserCheck } from 'lucide-react';

interface PostProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated: (newListing: ProduceListing) => void;
  currentUser?: AppUser | null;
  onOpenAuth?: () => void;
}

const PRESET_IMAGES = [
  { label: 'Tubers & Yams', path: '/src/assets/images/produce_yam_tubers_1791974042374.jpg' },
  { label: 'Fresh Tomatoes & Peppers', path: '/src/assets/images/produce_fresh_tomatoes_1791974042845.jpg' },
  { label: 'Grains, Beans & Palm Oil', path: '/src/assets/images/produce_grains_staples_1791974043244.jpg' },
  { label: 'Mixed Market Harvest', path: '/src/assets/images/hero_nigerian_harvest_1791974041593.jpg' },
];

export const PostProduceModal: React.FC<PostProduceModalProps> = ({
  isOpen,
  onClose,
  onListingCreated,
  currentUser,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProduceCategory>('grains');
  const [price, setPrice] = useState<number>(50000);
  const [unit, setUnit] = useState<string>('50kg Bag');
  const [quantity, setQuantity] = useState<number>(20);
  const [moq, setMoq] = useState<number>(1);
  const [isWholesale, setIsWholesale] = useState<boolean>(true);
  const [state, setState] = useState<string>(currentUser?.state || 'Benue');
  const [marketLocation, setMarketLocation] = useState<string>(currentUser?.lgaOrMarket || '');
  const [farmerName, setFarmerName] = useState<string>(currentUser?.fullName || '');
  const [farmerPhone, setFarmerPhone] = useState<string>(currentUser?.phone || currentUser?.identifier || '');
  const [farmerType, setFarmerType] = useState<'Smallholder Farmer' | 'Commercial Farm' | 'Cooperative Union'>(
    currentUser?.farmOrBusinessName ? 'Cooperative Union' : 'Smallholder Farmer'
  );
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>(PRESET_IMAGES[0].path);
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage('Image size should be below 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Please provide a descriptive title for your produce.');
      return;
    }
    if (price <= 0) {
      setErrorMessage('Please enter a valid price in Naira.');
      return;
    }
    if (!farmerName.trim()) {
      setErrorMessage('Please provide your name or farm/cooperative name.');
      return;
    }
    if (!farmerPhone.trim() || farmerPhone.length < 10) {
      setErrorMessage('Please provide an active Nigerian phone number.');
      return;
    }
    if (!marketLocation.trim()) {
      setErrorMessage('Please enter the market depot or local farm location.');
      return;
    }

    const newListing: ProduceListing = {
      id: `fl-user-${Date.now()}`,
      title: title.trim(),
      category,
      price: Number(price),
      unit: unit.trim(),
      quantity: Number(quantity),
      moq: Number(moq),
      isWholesale,
      state,
      marketLocation: marketLocation.trim(),
      farmerName: farmerName.trim(),
      farmerPhone: farmerPhone.trim(),
      farmerType,
      harvestDate: 'Freshly Listed Today',
      image: customImagePreview || selectedImage,
      description: description.trim() || 'Direct farmgate harvest ready for local inspection and rapid interstate delivery.',
      rating: 5.0,
      completedOrders: 0,
      inStock: true,
    };

    onListingCreated(newListing);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              List Your Harvest Free (Zero Registration)
            </h3>
            <p className="text-xs text-stone-500">
              Connect directly with nationwide wholesale food traders and consumers
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-stone-900">
              Harvest Published Live to FarmLink NG!
            </h4>
            <p className="text-xs text-stone-600">
              Buyers and wholesalers can now view, call, and place orders directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {currentUser ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-950 font-medium">
                <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Posting under your account: <strong>{currentUser.fullName}</strong> ({currentUser.role} · {currentUser.state})</span>
              </div>
            ) : onOpenAuth ? (
              <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl flex items-center justify-between text-xs text-stone-700">
                <span>Posting as Guest.</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="text-emerald-800 font-semibold hover:underline cursor-pointer"
                >
                  Register with Email/Phone →
                </button>
              </div>
            ) : null}

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg font-medium">
                {errorMessage}
              </div>
            )}

            {/* Produce Title */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Produce Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 50kg Bags of Dry Yellow Corn or 100 Tubers Benue Yam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
              />
            </div>

            {/* Category & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProduceCategory)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white cursor-pointer"
                >
                  <option value="tubers">Tubers & Roots (Yam, Cassava, Potato)</option>
                  <option value="grains">Grains & Cereals (Maize, Rice, Beans, Millet)</option>
                  <option value="vegetables">Vegetables & Peppers (Tomatoes, Rodo, Onion)</option>
                  <option value="oils_staples">Oils & Staples (Palm Oil, Garri, Groundnut)</option>
                  <option value="livestock">Poultry & Livestock (Broilers, Goats, Eggs)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Packaging Unit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50kg Bag, 100 Tubers, Basket, 25L Keg"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Price in Naira (₦) *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Available Quantity *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Minimum Order (MOQ)
                </label>
                <input
                  type="number"
                  min={1}
                  value={moq}
                  onChange={(e) => setMoq(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-mono"
                />
              </div>
            </div>

            {/* State & Market Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Farm / Harvest State *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white cursor-pointer"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Market Depot / Farm Hub *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zaki Biam Yam Depot or Dawanau Market"
                  value={marketLocation}
                  onChange={(e) => setMarketLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>
            </div>

            {/* Farmer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Seller / Farmer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Torkwase Agber"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Phone (WhatsApp Active) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 491 8234"
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Producer Type
                </label>
                <select
                  value={farmerType}
                  onChange={(e) => setFarmerType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white cursor-pointer"
                >
                  <option value="Smallholder Farmer">Smallholder Farmer</option>
                  <option value="Commercial Farm">Commercial Farm</option>
                  <option value="Cooperative Union">Cooperative Union</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Quality & Storage Specifications
              </label>
              <textarea
                rows={2}
                placeholder="Mention moisture levels, destoning, natural sun curing, or bagging specs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white resize-none"
              />
            </div>

            {/* Photo Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 block">
                Select Photo or Upload
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_IMAGES.map((img) => (
                  <button
                    key={img.path}
                    type="button"
                    onClick={() => {
                      setSelectedImage(img.path);
                      setCustomImagePreview(null);
                    }}
                    className={`relative rounded-lg overflow-hidden aspect-[4/3] border cursor-pointer ${
                      selectedImage === img.path && !customImagePreview 
                        ? 'border-emerald-700 ring-2 ring-emerald-700' 
                        : 'border-stone-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.path} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 inset-x-1 text-[10px] bg-stone-900/80 text-white rounded px-1 truncate text-center">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom Image Upload Option */}
              <div className="pt-2 flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Upload from Phone Camera / Gallery</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
                {customImagePreview && (
                  <span className="text-xs text-emerald-800 font-medium">Custom photo loaded!</span>
                )}
              </div>
            </div>

            {/* Wholesale Toggle */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="isWholesale"
                checked={isWholesale}
                onChange={(e) => setIsWholesale(e.target.checked)}
                className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
              />
              <label htmlFor="isWholesale" className="text-xs text-stone-700 cursor-pointer">
                <strong>Wholesale Batch:</strong> Available for bulk trailer / truck distribution
              </label>
            </div>

            {/* Submit Bar */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Publish Listing Free
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
