import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBox from './components/ChatBox';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import NurseryRegistrationPage from './pages/NurseryRegistrationPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/nursery-registration" element={<NurseryRegistrationPage />} />
          </Routes>
          <Footer />
          <ChatBox />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;