import React, { useState } from 'react';
import { AppUser } from '../types';
import { PlusCircle, ShoppingBag, Truck, TrendingUp, User, LogOut, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentUser: AppUser | null;
  onOpenAuth: (mode?: 'register' | 'signin') => void;
  onSignOut: () => void;
  onOpenPostProduce: () => void;
  onOpenMyOrders: () => void;
  onScrollToMarketIndex: () => void;
  onOpenHaulageEstimator: () => void;
  ordersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onSignOut,
  onOpenPostProduce,
  onOpenMyOrders,
  onScrollToMarketIndex,
  onOpenHaulageEstimator,
  ordersCount,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a 
          href="/" 
          className="text-xl font-bold tracking-tight text-emerald-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="w-8 h-8 rounded bg-emerald-800 text-emerald-100 flex items-center justify-center font-extrabold text-base">
            FL
          </span>
          <span>FarmLink NG</span>
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a 
            href="#market" 
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
          >
            Produce Catalog
          </a>
          <button 
            type="button"
            onClick={onScrollToMarketIndex}
            className="flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Daily Price Index</span>
          </button>
          <button 
            type="button"
            onClick={onOpenHaulageEstimator}
            className="flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>Interstate Freight</span>
          </button>
          <button 
            type="button"
            onClick={onOpenMyOrders}
            className="flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>Orders {ordersCount > 0 && `(${ordersCount})`}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Auth State */}
        <div className="flex items-center gap-3 shrink-0 relative">
          {ordersCount > 0 && (
            <button 
              type="button"
              onClick={onOpenMyOrders}
              className="md:hidden p-2 text-stone-600 hover:text-emerald-800 relative cursor-pointer"
              title="My Orders"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600" />
            </button>
          )}

          {/* User Account / Register Button */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-lg border border-stone-200 hover:border-emerald-700 bg-stone-50 hover:bg-white text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] uppercase font-bold">
                  {currentUser.fullName.charAt(0)}
                </div>
                <span className="max-w-[120px] truncate hidden sm:inline">
                  {currentUser.fullName}
                </span>
                <span className="text-[10px] uppercase text-emerald-800 font-bold bg-emerald-100/70 px-1 rounded">
                  {currentUser.role}
                </span>
              </button>

              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-2 text-xs z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-stone-100">
                    <p className="font-bold text-stone-900 truncate">{currentUser.fullName}</p>
                    <p className="text-[11px] text-stone-500 font-mono truncate">{currentUser.identifier}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{currentUser.state} State · {currentUser.lgaOrMarket}</p>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenMyOrders}
                    className="w-full text-left px-3 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-stone-400" />
                    <span>My Placed Orders ({ordersCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={onSignOut}
                    className="w-full text-left px-3 py-2 text-rose-700 hover:bg-rose-50 flex items-center gap-2 border-t border-stone-100 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Register with Email or Phone Number"
            >
              <User className="w-3.5 h-3.5 text-emerald-800" />
              <span>Register / Sign In</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onOpenPostProduce}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Harvest Free</span>
          </button>
        </div>
      </div>
    </header>
  );
};
