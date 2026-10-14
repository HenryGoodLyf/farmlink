import React from 'react';
import { ShieldCheck, Truck, PhoneCall, TrendingDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onPostProduceClick: () => void;
  totalListingsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onPostProduceClick,
  totalListingsCount,
}) => {
  return (
    <div className="bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Value proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              <span>Federal Republic of Nigeria</span>
              <span aria-hidden="true">·</span>
              <span>Direct Agricultural Exchange</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Direct Farmgate Produce Without Middlemen Markups.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              Connect directly with registered smallholders and agricultural cooperatives across Benue, Kano, Plateau, Oyo, and 32 other states. Zero registration required to buy, negotiate, or list harvest.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-5 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
              >
                Browse Harvests ({totalListingsCount} Available)
              </button>
              <button
                type="button"
                onClick={onPostProduceClick}
                className="px-5 py-3 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-all whitespace-nowrap cursor-pointer"
              >
                List Your Harvest Free
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-stone-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Anti-Scraping Phone Shield
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                Interstate Haulage Network
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-700" />
                Fair Farmgate Pricing
              </span>
            </div>
          </div>

          {/* Right Column: Authentic Nigerian Agricultural Market Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-md aspect-[4/3] bg-stone-200">
              <img
                src="/src/assets/images/hero_nigerian_harvest_1791974041593.jpg"
                alt="Nigerian agricultural produce market with fresh yams, palm oil, and maize"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                  Farmgate Fresh · Weekly Dispatch
                </p>
                <p className="text-sm font-medium mt-1 text-stone-100">
                  Bulk grains, tubers, fresh peppers, and palm oil sourced directly from primary rural markets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Metrics Strip below hero */}
        <div className="mt-12 pt-8 border-t border-stone-300/70 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              36 + FCT
            </div>
            <div className="text-xs text-stone-600 mt-1 font-medium">
              States covered with rural market aggregation points
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
              0% Fee
            </div>
            <div className="text-xs text-stone-600 mt-1 font-medium">
              Zero listing fees, zero broker cuts for local farmers
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              100% Direct
            </div>
            <div className="text-xs text-stone-600 mt-1 font-medium">
              One-tap direct phone calls & WhatsApp negotiations
            </div>
          </div>
          <div>
            <div className="text-2xl lg:text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
              24-48 hrs
            </div>
            <div className="text-xs text-stone-600 mt-1 font-medium">
              Average truck haulage between North-Central & Lagos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
