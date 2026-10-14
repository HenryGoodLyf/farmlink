import React, { useState } from 'react';
import { HAULAGE_ROUTES, formatNaira, NIGERIAN_STATES } from '../data/mockData';
import { X, Truck, Clock, ShieldCheck, MapPin, Calculator } from 'lucide-react';

interface HaulageEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HaulageEstimatorModal: React.FC<HaulageEstimatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [fromState, setFromState] = useState<string>('Benue');
  const [toState, setToState] = useState<string>('Lagos');
  const [bagsCount, setBagsCount] = useState<number>(50);

  // Calculate estimated rate based on state distance approximation
  const isLocal = fromState.toLowerCase() === toState.toLowerCase();
  const baseRatePerBag = isLocal ? 1200 : 3500;
  const estimatedHours = isLocal ? 4 : 22;
  const totalCost = baseRatePerBag * bagsCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Interstate Agricultural Freight Calculator
              </h3>
              <p className="text-xs text-stone-500">
                Current haulage & shared truck estimates across Nigerian transit corridors
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Origin State (Farm / Depot)
              </label>
              <select
                value={fromState}
                onChange={(e) => setFromState(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white cursor-pointer"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Destination State (Market / Terminal)
              </label>
              <select
                value={toState}
                onChange={(e) => setToState(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white cursor-pointer"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">
              Estimated Number of 50kg - 100kg Bags / Baskets
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={600}
                value={bagsCount}
                onChange={(e) => setBagsCount(Math.max(1, Number(e.target.value)))}
                className="w-32 px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-mono"
              />
              <span className="text-xs text-stone-500">
                (Standard 30-ton trailer carries ~600 bags; 10-ton truck carries ~200 bags)
              </span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-semibold text-stone-600">Corridor Route:</span>
              <span className="text-sm font-bold text-stone-900">{fromState} → {toState}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] text-stone-500 block">Est. Road Transit Time</span>
                <div className="flex items-center gap-1.5 text-base font-bold text-stone-900 mt-0.5">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <span>~{estimatedHours} Hours</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-stone-500 block">Rate per Bag (Shared Haul)</span>
                <div className="text-base font-bold text-stone-900 font-mono tabular-nums mt-0.5">
                  {formatNaira(baseRatePerBag)}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] text-stone-500 block">Estimated Freight Subtotal</span>
                <div className="text-lg font-extrabold text-emerald-900 font-mono tabular-nums mt-0.5">
                  {formatNaira(totalCost)}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Corridors Benchmark Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Common Key Highway Corridors
            </h4>
            <div className="divide-y divide-stone-200 border border-stone-200 rounded-lg overflow-hidden text-xs">
              {HAULAGE_ROUTES.map((route, i) => (
                <div key={i} className="p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-stone-900">
                      {route.fromState} → {route.toState}
                    </div>
                    <div className="text-[11px] text-stone-500">{route.hubName}</div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <span className="text-stone-600 font-mono">~{route.transitHours}h</span>
                    <span className="font-bold text-emerald-900 font-mono tabular-nums">
                      {formatNaira(route.costPer50kgBag)} / bag
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
