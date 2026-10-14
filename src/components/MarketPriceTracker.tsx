import React, { useState } from 'react';
import { MarketPriceItem } from '../types';
import { formatNaira } from '../data/mockData';
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';

interface MarketPriceTrackerProps {
  prices: MarketPriceItem[];
}

export const MarketPriceTracker: React.FC<MarketPriceTrackerProps> = ({ prices }) => {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const filteredPrices = selectedState === 'all' 
    ? prices 
    : prices.filter(p => p.state.toLowerCase().includes(selectedState.toLowerCase()));

  const handleSimulateRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div id="price-index" className="bg-white border-b border-stone-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              <span>Market Intelligence</span>
              <span aria-hidden="true">·</span>
              <span>Farmgate Price Benchmarks</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mt-1">
              Today's Daily Wholesale Commodity Index
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Surveyed from primary rural aggregation depots (Dawanau, Zaki Biam, Bodija, Jos, and Mile 12). Updated every morning to curb middleman price gouging.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs font-medium border border-stone-300 rounded-lg px-3 py-2 bg-stone-50 text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
            >
              <option value="all">All Regional Markets</option>
              <option value="Kano">Kano (North-West)</option>
              <option value="Benue">Benue (North-Central)</option>
              <option value="Plateau">Plateau (Middle Belt)</option>
              <option value="Kaduna">Kaduna (North)</option>
              <option value="Enugu">Enugu / South-East</option>
              <option value="Ebonyi">Ebonyi (Rice Belt)</option>
            </select>

            <button
              type="button"
              onClick={handleSimulateRefresh}
              className="flex items-center gap-1.5 text-xs font-medium border border-stone-200 hover:border-stone-300 bg-white px-3 py-2 rounded-lg text-stone-700 transition-colors cursor-pointer"
              title="Refresh price benchmarks"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync Live</span>
            </button>
          </div>
        </div>

        {/* Commodity Ticker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrices.map((item) => {
            const isUp = item.trend === 'up';
            const isDown = item.trend === 'down';

            return (
              <div 
                key={item.id}
                className="p-4 rounded-xl border border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-stone-900 text-sm">
                        {item.crop}
                      </h3>
                      <div className="text-xs text-stone-500 mt-0.5">
                        <span>{item.market}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{item.state}</span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded ${
                      isUp 
                        ? 'text-rose-700 bg-rose-50' 
                        : isDown 
                          ? 'text-emerald-700 bg-emerald-50' 
                          : 'text-stone-600 bg-stone-100'
                    }`}>
                      {isUp && <TrendingUp className="w-3.5 h-3.5" />}
                      {isDown && <TrendingDown className="w-3.5 h-3.5" />}
                      {!isUp && !isDown && <Minus className="w-3.5 h-3.5" />}
                      <span className="font-mono tabular-nums">
                        {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-stone-500">Benchmark Rate</span>
                      <div className="text-xl font-bold text-stone-900 font-mono tabular-nums">
                        {formatNaira(item.currentPrice)}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded">
                      per {item.unit}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Prev: {formatNaira(item.previousPrice)}</span>
                  <span>{item.lastUpdated}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
