import React, { useState } from 'react';
import { ProduceListing } from '../types';
import { formatNaira, maskPhoneNumber } from '../data/mockData';
import { MapPin, Phone, MessageSquare, ShoppingCart, Check, Star } from 'lucide-react';

interface ProduceCardProps {
  listing: ProduceListing;
  onViewDetails: (listing: ProduceListing) => void;
  onPlaceOrder: (listing: ProduceListing) => void;
}

export const ProduceCard: React.FC<ProduceCardProps> = ({
  listing,
  onViewDetails,
  onPlaceOrder,
}) => {
  const [isPhoneRevealed, setIsPhoneRevealed] = useState<boolean>(false);
  const [justCopied, setJustCopied] = useState<boolean>(false);

  const handleRevealPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPhoneRevealed(true);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPhoneRevealed) {
      setIsPhoneRevealed(true);
      return;
    }
    navigator.clipboard?.writeText(listing.farmerPhone);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 1500);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Convert 080... to 23480...
    let cleanPhone = listing.farmerPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '234' + cleanPhone.slice(1);
    }
    const message = encodeURIComponent(
      `Hello ${listing.farmerName}, I saw your harvest listing on FarmLink NG: "${listing.title}" priced at ${formatNaira(listing.price)} per ${listing.unit}. Is it currently available for dispatch?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlaceOrder(listing);
  };

  return (
    <div 
      onClick={() => onViewDetails(listing)}
      className="group bg-white rounded-xl border border-stone-200 hover:border-emerald-700/60 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-sm"
    >
      <div>
        {/* Product Image Box */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // fallback if broken
              const target = e.currentTarget;
              target.onerror = null;
              target.src = '/src/assets/images/hero_nigerian_harvest_1791974041593.jpg';
            }}
          />
          {/* Subtle wholesale text label (NOT a rounded pill sandwich) */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-stone-900/80 text-[11px] font-medium text-stone-100 rounded backdrop-blur-xs">
            {listing.isWholesale ? 'Wholesale Bulk Supply' : 'Direct Farmgate Retail'}
          </div>

          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-white/90 text-[11px] font-semibold text-stone-900 rounded shadow-xs font-mono tabular-nums">
            {listing.quantity} {listing.unit.split(' ')[0]}s left
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2.5">
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span className="text-emerald-800 uppercase tracking-wider text-[11px] font-semibold">
              {listing.category.replace('_', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {listing.state} State
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-stone-600">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              {listing.rating.toFixed(1)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-stone-900 text-base leading-snug group-hover:text-emerald-900 transition-colors line-clamp-2">
            {listing.title}
          </h3>

          {/* Location & Farmer */}
          <p className="text-xs text-stone-500 line-clamp-1">
            {listing.marketLocation} · {listing.farmerName}
          </p>

          {/* Pricing Row */}
          <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-stone-500 block">Farmgate Price</span>
              <div className="text-xl font-bold text-stone-900 font-mono tabular-nums tracking-tight">
                {formatNaira(listing.price)}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-600 font-medium block">
                per {listing.unit}
              </span>
              <span className="text-[11px] text-stone-500">
                Min. Order: {listing.moq}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-stone-100 space-y-2">
        {/* Anti-Scraping Phone & WhatsApp Bar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={isPhoneRevealed ? handleCopyPhone : handleRevealPhone}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors cursor-pointer"
            title={isPhoneRevealed ? "Click to copy phone number" : "Click to unmask farmer's phone number"}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-800" />
            <span className="font-mono tabular-nums">
              {isPhoneRevealed 
                ? (justCopied ? 'Copied!' : listing.farmerPhone) 
                : maskPhoneNumber(listing.farmerPhone)}
            </span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
            title="Chat directly on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>

        {/* Direct Order / Purchase Button */}
        <button
          type="button"
          onClick={handleOrderClick}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Place Order / Escrow Request</span>
        </button>
      </div>
    </div>
  );
};
