import React, { useState } from 'react';
import { ProduceListing, Order, AppUser } from '../types';
import { formatNaira, NIGERIAN_STATES } from '../data/mockData';
import { X, CheckCircle2, ShieldCheck, Truck, ShoppingBag, ArrowRight, Printer, UserCheck } from 'lucide-react';

interface OrderModalProps {
  listing: ProduceListing | null;
  onClose: () => void;
  onOrderCreated: (newOrder: Order) => void;
  currentUser?: AppUser | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  listing,
  onClose,
  onOrderCreated,
  currentUser,
}) => {
  if (!listing) return null;

  const [quantity, setQuantity] = useState<number>(listing.moq || 1);
  const [buyerName, setBuyerName] = useState<string>(currentUser?.fullName || '');
  const [buyerPhone, setBuyerPhone] = useState<string>(currentUser?.phone || currentUser?.identifier || '');
  const [deliveryState, setDeliveryState] = useState<string>(currentUser?.state || 'Lagos');
  const [deliveryAddress, setDeliveryAddress] = useState<string>(currentUser?.lgaOrMarket || '');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer' | 'escrow'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Calculate delivery fee estimate
  const isInterstate = deliveryState.toLowerCase() !== listing.state.toLowerCase();
  const baseDeliveryRate = isInterstate ? 7500 : 2500;
  const estimatedDeliveryFee = baseDeliveryRate + Math.max(0, quantity - 1) * (isInterstate ? 1200 : 500);

  const subtotal = listing.price * quantity;
  const total = subtotal + estimatedDeliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!buyerName.trim()) {
      setErrorMessage('Please provide your full name or company name.');
      return;
    }
    if (!buyerPhone.trim() || buyerPhone.length < 10) {
      setErrorMessage('Please enter a valid Nigerian phone number (e.g. 08012345678).');
      return;
    }
    if (!deliveryAddress.trim()) {
      setErrorMessage('Please enter the delivery address or preferred destination market depot.');
      return;
    }
    if (quantity > listing.quantity) {
      setErrorMessage(`Only ${listing.quantity} ${listing.unit}s are currently available.`);
      return;
    }

    const orderId = `FL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingImage: listing.image,
      quantity,
      unit: listing.unit,
      unitPrice: listing.price,
      subtotal,
      deliveryFee: estimatedDeliveryFee,
      total,
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
      deliveryState,
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod,
      status: 'Pending Confirmation',
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onOrderCreated(newOrder);
    setConfirmedOrder(newOrder);
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
              {confirmedOrder ? 'Order Confirmed' : 'Place Farmgate Order'}
            </h3>
            <p className="text-xs text-stone-500">
              Zero registration required · Direct farmer fulfillment
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
        {!confirmedOrder ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg font-medium">
                {errorMessage}
              </div>
            )}

            {/* Produce Summary Strip */}
            <div className="flex items-center gap-4 p-3 bg-stone-50 border border-stone-200 rounded-xl">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-16 h-16 rounded-lg object-cover border border-stone-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-stone-900 text-sm truncate">
                  {listing.title}
                </h4>
                <div className="text-xs text-stone-500">
                  {listing.marketLocation}, {listing.state} State
                </div>
                <div className="text-xs font-bold text-emerald-900 font-mono tabular-nums mt-0.5">
                  {formatNaira(listing.price)} <span className="font-normal text-stone-600">/ {listing.unit}</span>
                </div>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 block">
                Quantity to Order (Units: {listing.unit})
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={quantity <= (listing.moq || 1)}
                  onClick={() => setQuantity(Math.max(listing.moq || 1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 text-stone-800 font-bold cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min={listing.moq || 1}
                  max={listing.quantity}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || listing.moq || 1;
                    setQuantity(Math.min(listing.quantity, Math.max(listing.moq || 1, val)));
                  }}
                  className="w-24 text-center font-bold text-stone-900 border border-stone-300 rounded-lg py-2 bg-white font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
                <button
                  type="button"
                  disabled={quantity >= listing.quantity}
                  onClick={() => setQuantity(Math.min(listing.quantity, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 disabled:opacity-40 text-stone-800 font-bold cursor-pointer"
                >
                  +
                </button>
                <span className="text-xs text-stone-500">
                  (Min: {listing.moq} · Max in stock: {listing.quantity})
                </span>
              </div>
            </div>

            {/* Buyer Contact & Delivery Details */}
            {currentUser && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-950 font-medium">
                <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Ordering as verified user: <strong>{currentUser.fullName}</strong> ({currentUser.identifier})</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Your Full Name / Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adebayo Johnson"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Delivery Destination State *
              </label>
              <select
                value={deliveryState}
                onChange={(e) => setDeliveryState(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white cursor-pointer"
              >
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st} {st.toLowerCase() === listing.state.toLowerCase() ? '(Local / Intra-state)' : '(Interstate Haulage)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Delivery Address or Destination Market Depot *
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Mile 12 International Market, Lagos, or Street delivery address..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 block">
                Preferred Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label 
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    paymentMethod === 'cod' 
                      ? 'border-emerald-700 bg-emerald-50/60 text-emerald-950 font-medium' 
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="sr-only"
                  />
                  <div className="text-xs font-bold">Cash on Delivery</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Pay driver after inspecting produce</div>
                </label>

                <label 
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    paymentMethod === 'transfer' 
                      ? 'border-emerald-700 bg-emerald-50/60 text-emerald-950 font-medium' 
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                    className="sr-only"
                  />
                  <div className="text-xs font-bold">Bank Transfer</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Instant transfer at drop-off point</div>
                </label>

                <label 
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    paymentMethod === 'escrow' 
                      ? 'border-emerald-700 bg-emerald-50/60 text-emerald-950 font-medium' 
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="escrow"
                    checked={paymentMethod === 'escrow'}
                    onChange={() => setPaymentMethod('escrow')}
                    className="sr-only"
                  />
                  <div className="text-xs font-bold">Secure Escrow</div>
                  <div className="text-[11px] text-stone-600 mt-0.5">Funds held safely until cleared</div>
                </label>
              </div>
            </div>

            {/* Authoritative Financial Breakdown */}
            <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200 space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Subtotal ({quantity} {listing.unit}):</span>
                <span className="font-semibold text-stone-900 font-mono tabular-nums">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Transit & Haulage ({listing.state} → {deliveryState}):</span>
                <span className="font-semibold text-stone-900 font-mono tabular-nums">{formatNaira(estimatedDeliveryFee)}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-950">
                <span>Total Payable:</span>
                <span className="font-mono tabular-nums text-base text-emerald-900">{formatNaira(total)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm & Place Order</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Receipt View */
          <div className="p-6 space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-stone-900">
                Order Successfully Dispatched to Farmer!
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Your order request has been logged. The farmer ({listing.farmerName}) will contact you on <strong>{confirmedOrder.buyerPhone}</strong> to confirm loading and vehicle dispatch.
              </p>
            </div>

            {/* Formal Receipt Card */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Tracking Reference:</span>
                <strong className="text-stone-900">{confirmedOrder.id}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Produce:</span>
                <span className="text-stone-900">{confirmedOrder.listingTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Quantity:</span>
                <span className="text-stone-900">{confirmedOrder.quantity} {confirmedOrder.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Route:</span>
                <span className="text-stone-900">{listing.state} → {confirmedOrder.deliveryState}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Terms:</span>
                <span className="text-stone-900 uppercase font-semibold">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 text-sm font-bold text-stone-950">
                <span>Total Amount:</span>
                <span className="text-emerald-900">{formatNaira(confirmedOrder.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Receipt</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
