import React, { useState } from 'react';
import { ProduceListing } from '../types';
import { formatNaira, maskPhoneNumber } from '../data/mockData';
import { X, MapPin, Calendar, ShieldCheck, Phone, MessageSquare, ShoppingBag, Truck, Share2, Check } from 'lucide-react';

interface ProduceDetailModalProps {
  listing: ProduceListing | null;
  onClose: () => void;
  onPlaceOrder: (listing: ProduceListing) => void;
}

export const ProduceDetailModal: React.FC<ProduceDetailModalProps> = ({
  listing,
  onClose,
  onPlaceOrder,
}) => {
  const [isPhoneRevealed, setIsPhoneRevealed] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!listing) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsApp = () => {
    let cleanPhone = listing.farmerPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '234' + cleanPhone.slice(1);
    }
    const message = encodeURIComponent(
      `Hello ${listing.farmerName}, I am contacting you from FarmLink NG regarding your listing: "${listing.title}" (${formatNaira(listing.price)}/${listing.unit}) at ${listing.marketLocation}, ${listing.state} State. Is this available for delivery?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
            <span>{listing.category.replace('_', ' ')}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.state} Agricultural Hub</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Share listing"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Main Photo & Primary Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 bg-stone-900/85 text-xs text-white rounded font-medium">
                {listing.isWholesale ? 'Wholesale Batch' : 'Farmgate Retail'}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-950 leading-snug">
                {listing.title}
              </h2>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-xs text-stone-500 font-medium">Unit Price (Farmgate)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-mono tabular-nums">
                    {formatNaira(listing.price)}
                  </span>
                  <span className="text-sm text-stone-600 font-medium">
                    / {listing.unit}
                  </span>
                </div>
                <div className="text-xs text-stone-500 pt-1 flex items-center gap-3">
                  <span>Available: <strong className="text-stone-800">{listing.quantity} {listing.unit.split(' ')[0]}s</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Min Order: <strong className="text-stone-800">{listing.moq}</strong></span>
                </div>
              </div>

              {/* Origin Details */}
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span><strong>Market Depot:</strong> {listing.marketLocation}, {listing.state} State</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span><strong>Harvest Status:</strong> {listing.harvestDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span><strong>Seller Credential:</strong> {listing.farmerName} ({listing.farmerType})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Harvest & Description Details */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <h4 className="text-sm font-semibold text-stone-900">
              Produce Description & Quality Specifications
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Seller Contact & Verification Strip */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-stone-500 font-medium">Direct Farmer / Cooperative Contact</div>
              <div className="text-base font-bold text-stone-900 mt-0.5">
                {listing.farmerName}
              </div>
              <div className="text-xs text-stone-600 mt-0.5 font-mono tabular-nums">
                {isPhoneRevealed ? listing.farmerPhone : maskPhoneNumber(listing.farmerPhone)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isPhoneRevealed ? (
                <button
                  type="button"
                  onClick={() => setIsPhoneRevealed(true)}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Reveal Phone Number</span>
                </button>
              ) : (
                <a
                  href={`tel:${listing.farmerPhone}`}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {listing.farmerPhone}</span>
                </a>
              )}

              <button
                type="button"
                onClick={handleWhatsApp}
                className="px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200/80 rounded-lg border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-800" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Haulage & Interstate Transport Guarantee */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-100/50 flex items-start gap-3 text-xs text-stone-600">
            <Truck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Interstate Trucking & Aggregation:</strong> Daily shared haulage trucks operate from primary markets in Benue, Kano, Kaduna, and Plateau directly to Lagos, Abuja, Ibadan, and Port Harcourt.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-600">
            <span>Guaranteed zero registration required.</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onPlaceOrder(listing);
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Proceed to Order / Request Delivery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
