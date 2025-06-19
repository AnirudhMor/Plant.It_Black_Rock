import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, Search, ShoppingCart, Star } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fertilizer' | 'medicine' | 'tool'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const { dispatch } = useCart();

  const products: Product[] = [
    // Fertilizers
    {
      id: 'npk-fertilizer',
      name: 'NPK Complete Fertilizer',
      price: 1299,
      image: '🌱',
      category: 'fertilizer',
      description: 'Balanced NPK formula for all-round plant nutrition and healthy growth',
      inStock: true
    },
    {
      id: 'organic-compost',
      name: 'Premium Organic Compost',
      price: 899,
      image: '🍂',
      category: 'fertilizer',
      description: 'Rich organic matter to improve soil structure and fertility',
      inStock: true
    },
    {
      id: 'liquid-fertilizer',
      name: 'Liquid Plant Fertilizer',
      price: 849,
      image: '🧪',
      category: 'fertilizer',
      description: 'Fast-acting liquid nutrition for quick results',
      inStock: true
    },
    {
      id: 'bone-meal',
      name: 'Organic Bone Meal',
      price: 699,
      image: '🦴',
      category: 'fertilizer',
      description: 'Slow-release phosphorus for strong root development',
      inStock: true
    },
    {
      id: 'seaweed-extract',
      name: 'Seaweed Extract Fertilizer',
      price: 1199,
      image: '🌊',
      category: 'fertilizer',
      description: 'Natural growth stimulant with trace minerals',
      inStock: false
    },
    {
      id: 'potting-mix',
      name: 'Premium Potting Mix',
      price: 599,
      image: '🪴',
      category: 'fertilizer',
      description: 'Well-draining soil mix perfect for container plants',
      inStock: true
    },

    // Medicines
    {
      id: 'copper-fungicide',
      name: 'Copper Fungicide Spray',
      price: 899,
      image: '🧴',
      category: 'medicine',
      description: 'Effective copper-based fungicide for leaf spot treatment',
      inStock: true
    },
    {
      id: 'neem-oil',
      name: 'Organic Neem Oil',
      price: 1199,
      image: '🌿',
      category: 'medicine',
      description: 'Natural organic treatment for various plant issues',
      inStock: true
    },
    {
      id: 'insecticidal-soap',
      name: 'Insecticidal Soap Spray',
      price: 749,
      image: '🧼',
      category: 'medicine',
      description: 'Safe and effective pest control for soft-bodied insects',
      inStock: true
    },
    {
      id: 'systemic-insecticide',
      name: 'Systemic Insecticide',
      price: 1399,
      image: '💊',
      category: 'medicine',
      description: 'Long-lasting protection against sucking insects',
      inStock: true
    },
    {
      id: 'root-rot-treatment',
      name: 'Root Rot Treatment',
      price: 999,
      image: '🩹',
      category: 'medicine',
      description: 'Specialized treatment for root rot and fungal infections',
      inStock: false
    },
    {
      id: 'plant-antibiotic',
      name: 'Plant Antibiotic Solution',
      price: 1599,
      image: '💉',
      category: 'medicine',
      description: 'Broad-spectrum treatment for bacterial plant diseases',
      inStock: true
    },

    // Tools
    {
      id: 'ph-test-kit',
      name: 'Digital pH Test Kit',
      price: 549,
      image: '📏',
      category: 'tool',
      description: 'Monitor soil pH for optimal plant health',
      inStock: true
    },
    {
      id: 'moisture-meter',
      name: 'Soil Moisture Meter',
      price: 399,
      image: '💧',
      category: 'tool',
      description: 'Accurate soil moisture measurement tool',
      inStock: true
    },
    {
      id: 'pruning-shears',
      name: 'Professional Pruning Shears',
      price: 799,
      image: '✂️',
      category: 'tool',
      description: 'Sharp, durable shears for precise plant trimming',
      inStock: true
    },
    {
      id: 'spray-bottle',
      name: 'Adjustable Spray Bottle',
      price: 299,
      image: '🔫',
      category: 'tool',
      description: 'Multi-setting spray bottle for plant care applications',
      inStock: true
    },
    {
      id: 'plant-stakes',
      name: 'Bamboo Plant Stakes Set',
      price: 199,
      image: '🎋',
      category: 'tool',
      description: 'Natural bamboo stakes for plant support',
      inStock: true
    },
    {
      id: 'watering-can',
      name: 'Copper Watering Can',
      price: 1899,
      image: '🪣',
      category: 'tool',
      description: 'Elegant copper watering can with long spout',
      inStock: false
    }
  ];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedCategory(e.target.value as any);
    // Prevent page scroll by maintaining current scroll position
    const currentScrollY = window.scrollY;
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSortBy(e.target.value as any);
    // Prevent page scroll by maintaining current scroll position
    const currentScrollY = window.scrollY;
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fertilizer': return 'bg-emerald-100 text-emerald-800';
      case 'medicine': return 'bg-blue-100 text-blue-800';
      case 'tool': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-8 px-6 rounded-2xl shadow-xl text-center">
            <ShoppingCart className="mx-auto mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-2">Plant Care Products</h1>
            <p className="text-xl opacity-90">Everything you need for healthy, thriving plants</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-600" />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="fertilizer">Fertilizers</option>
                <option value="medicine">Medicines</option>
                <option value="tool">Tools</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{product.image}</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                </div>
                
                <h3 className="font-bold text-slate-800 mb-2 text-center">{product.name}</h3>
                <p className="text-slate-600 text-sm mb-4 text-center leading-relaxed">{product.description}</p>
                
                <div className="flex items-center justify-center mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-slate-500 text-sm ml-2">(4.8)</span>
                </div>
                
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-emerald-600">₹{product.price}</span>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    product.inStock
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Categories Overview */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Product Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Fertilizers</h3>
              <p className="text-slate-600 text-sm">Organic and synthetic fertilizers to nourish your plants and improve soil health</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Plant Medicines</h3>
              <p className="text-slate-600 text-sm">Treatments and preventive solutions for plant diseases, pests, and infections</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Garden Tools</h3>
              <p className="text-slate-600 text-sm">Essential tools and equipment for plant care, monitoring, and maintenance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;