import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { state, dispatch } = useCart();
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    // Maintain scroll position at top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    // Maintain scroll position at top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Clear cart after successful order
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
    }, 2000);
  };

  const handleStepChange = (newStep: 'cart' | 'shipping' | 'payment') => {
    setStep(newStep);
    // Maintain scroll position at top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentMethodChange = (method: 'card' | 'upi' | 'cod') => {
    setPaymentMethod(method);
    // Prevent page scroll
    const currentScrollY = window.scrollY;
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  };

  const shippingCost = state.total > 1000 ? 0 : 99;
  const totalWithShipping = state.total + shippingCost;

  if (step === 'confirmation') {
    return (
      <div className="pt-20 min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Order Confirmed!</h1>
            <p className="text-slate-600 mb-8">
              Thank you for your order. We'll send you a confirmation email shortly with tracking details.
            </p>
            <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-2">Order Summary</h3>
              <p className="text-slate-600">Total Amount: ₹{totalWithShipping}</p>
              <p className="text-slate-600">Delivery Address: {shippingInfo.address}, {shippingInfo.city}</p>
              <p className="text-slate-600">Expected Delivery: 2-3 business days</p>
            </div>
            <div className="space-x-4">
              <Link
                to="/products"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="inline-block bg-slate-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/products" 
            className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Products
          </Link>
          
          <h1 className="text-3xl font-bold text-slate-800">
            {step === 'cart' && 'Shopping Cart'}
            {step === 'shipping' && 'Shipping Information'}
            {step === 'payment' && 'Payment Details'}
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { key: 'cart', label: 'Cart', icon: '🛒' },
              { key: 'shipping', label: 'Shipping', icon: '📦' },
              { key: 'payment', label: 'Payment', icon: '💳' }
            ].map((stepItem, index) => (
              <div key={stepItem.key} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === stepItem.key 
                    ? 'bg-emerald-600 text-white' 
                    : index < ['cart', 'shipping', 'payment'].indexOf(step)
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {stepItem.icon}
                </div>
                <span className={`ml-2 font-medium ${
                  step === stepItem.key ? 'text-emerald-600' : 'text-slate-500'
                }`}>
                  {stepItem.label}
                </span>
                {index < 2 && <div className="w-8 h-px bg-slate-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'cart' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Cart Items</h2>
                
                {state.items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Your cart is empty</h3>
                    <p className="text-slate-500 mb-6">Add some products to get started</p>
                    <Link
                      to="/products"
                      className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{item.name}</h3>
                          <p className="text-slate-600 text-sm">{item.description}</p>
                          <p className="text-emerald-600 font-bold">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                    
                    <div className="pt-4">
                      <button
                        onClick={() => handleStepChange('shipping')}
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Proceed to Shipping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 'shipping' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Shipping Information</h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Address *</label>
                    <textarea
                      required
                      rows={3}
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">State *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">PIN Code *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo({...shippingInfo, pincode: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Landmark (Optional)</label>
                    <input
                      type="text"
                      value={shippingInfo.landmark}
                      onChange={(e) => setShippingInfo({...shippingInfo, landmark: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => handleStepChange('cart')}
                      className="flex-1 bg-slate-500 text-white py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Payment Method</h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'
                    }`} onClick={() => handlePaymentMethodChange('card')}>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => handlePaymentMethodChange('card')}
                          className="text-emerald-600"
                        />
                        <CreditCard className="text-slate-600" size={20} />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                    </div>
                    
                    <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'upi' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'
                    }`} onClick={() => handlePaymentMethodChange('upi')}>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => handlePaymentMethodChange('upi')}
                          className="text-emerald-600"
                        />
                        <span className="text-xl">📱</span>
                        <span className="font-medium">UPI Payment</span>
                      </div>
                    </div>
                    
                    <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'
                    }`} onClick={() => handlePaymentMethodChange('cod')}>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => handlePaymentMethodChange('cod')}
                          className="text-emerald-600"
                        />
                        <span className="text-xl">💰</span>
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => handleStepChange('shipping')}
                      className="flex-1 bg-slate-500 text-white py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.name} × {item.quantity}</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">₹{state.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-slate-200 pt-2">
                  <span>Total</span>
                  <span className="text-emerald-600">₹{totalWithShipping}</span>
                </div>
              </div>
              
              {state.total > 1000 && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center text-emerald-700 text-sm">
                    <Truck className="mr-2" size={16} />
                    Free shipping on orders over ₹1000!
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="flex items-center">
                  <Shield className="mr-2 text-emerald-600" size={16} />
                  Secure payment processing
                </div>
                <div className="flex items-center">
                  <Truck className="mr-2 text-emerald-600" size={16} />
                  2-3 day delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;