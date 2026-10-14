import React from 'react';
import { Order } from '../types';
import { formatNaira } from '../data/mockData';
import { X, Package, ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="text-base font-bold text-stone-900">
                My Farmgate Orders ({orders.length})
              </h3>
              <p className="text-xs text-stone-500">
                Direct produce reservations and tracking
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

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="text-sm font-semibold text-stone-700">No Orders Placed Yet</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore the produce catalog, find farmgate harvests, and place orders directly with zero registration.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg cursor-pointer"
              >
                Browse Harvests
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-stone-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.listingImage}
                      alt={order.listingTitle}
                      className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-mono text-stone-500">
                        {order.id}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 line-clamp-1">
                        {order.listingTitle}
                      </h4>
                      <p className="text-xs text-stone-600">
                        {order.quantity} {order.unit} · Deliver to {order.deliveryState}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-stone-900 font-mono tabular-nums">
                      {formatNaira(order.total)}
                    </div>
                    <span className="text-[11px] text-stone-500 block uppercase">
                      {order.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-600">
                  <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{order.status}</span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {order.createdAt}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
