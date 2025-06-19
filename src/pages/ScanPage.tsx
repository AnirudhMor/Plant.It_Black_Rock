import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Camera, ArrowLeft, Loader, Check, AlertTriangle, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface DiagnosisResult {
  condition: string;
  severity: 'healthy' | 'mild' | 'moderate' | 'severe';
  description: string;
  treatment: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: 'fertilizer' | 'medicine' | 'tool';
    description: string;
    inStock: boolean;
  }>;
}

const ScanPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useCart();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setDiagnosisResult(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis with mock data
    setTimeout(() => {
      const mockResults: DiagnosisResult[] = [
        {
          condition: 'Leaf Spot Disease',
          severity: 'moderate',
          description: 'Your plant appears to have leaf spot disease, likely caused by fungal infection. This is common in humid conditions and can be treated effectively with proper fungicide application.',
          treatment: 'Remove affected leaves, improve air circulation, and apply copper-based fungicide twice weekly for 3 weeks.',
          products: [
            { id: 'copper-fungicide', name: 'Copper Fungicide Spray', price: 899, image: '🧴', category: 'medicine', description: 'Effective copper-based fungicide for leaf spot treatment', inStock: true },
            { id: 'immune-booster', name: 'Plant Immune Booster', price: 649, image: '💊', category: 'medicine', description: 'Strengthens plant immunity against diseases', inStock: true },
            { id: 'neem-oil', name: 'Organic Neem Oil', price: 1199, image: '🌿', category: 'medicine', description: 'Natural organic treatment for various plant issues', inStock: true }
          ]
        },
        {
          condition: 'Healthy Plant',
          severity: 'healthy',
          description: 'Great news! Your plant appears to be healthy with no visible signs of disease or pest damage. Continue with your current care routine.',
          treatment: 'Maintain current watering schedule and ensure adequate light. Consider monthly fertilization during growing season.',
          products: [
            { id: 'plant-food', name: 'All-Purpose Plant Food', price: 749, image: '🌱', category: 'fertilizer', description: 'Complete nutrition for healthy plant growth', inStock: true },
            { id: 'growth-enhancer', name: 'Growth Enhancer', price: 1099, image: '💚', category: 'fertilizer', description: 'Promotes vigorous growth and flowering', inStock: true }
          ]
        },
        {
          condition: 'Nutrient Deficiency',
          severity: 'mild',
          description: 'Your plant shows signs of nutrient deficiency, particularly nitrogen. The yellowing of lower leaves is a classic indicator.',
          treatment: 'Apply balanced liquid fertilizer every 2 weeks and ensure proper drainage to improve nutrient uptake.',
          products: [
            { id: 'liquid-fertilizer', name: 'Liquid Plant Fertilizer', price: 849, image: '🧪', category: 'fertilizer', description: 'Fast-acting liquid nutrition for quick results', inStock: true },
            { id: 'soil-conditioner', name: 'Soil Conditioner', price: 999, image: '🪨', category: 'fertilizer', description: 'Improves soil structure and nutrient retention', inStock: true },
            { id: 'ph-test-kit', name: 'pH Test Kit', price: 549, image: '📏', category: 'tool', description: 'Monitor soil pH for optimal plant health', inStock: true }
          ]
        }
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDiagnosisResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'healthy': return 'border-emerald-500 bg-emerald-50';
      case 'mild': return 'border-amber-500 bg-amber-50';
      case 'moderate': return 'border-orange-500 bg-orange-50';
      case 'severe': return 'border-red-500 bg-red-50';
      default: return 'border-slate-500 bg-slate-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'healthy': return <Check className="text-emerald-500" size={24} />;
      case 'mild': return <AlertTriangle className="text-amber-500" size={24} />;
      case 'moderate': return <AlertTriangle className="text-orange-500" size={24} />;
      case 'severe': return <AlertTriangle className="text-red-500" size={24} />;
      default: return <AlertTriangle className="text-slate-500" size={24} />;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-8 px-6 rounded-2xl shadow-xl">
            <Camera className="mx-auto mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-2">Plant Health Scanner</h1>
            <p className="text-xl opacity-90">Upload a photo for instant AI-powered diagnosis</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-8">
            <div
              className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                isDragOver 
                  ? 'border-emerald-500 bg-emerald-50 transform scale-105' 
                  : 'border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload 
                className={`mx-auto mb-4 ${isDragOver ? 'text-emerald-500' : 'text-slate-400'}`} 
                size={64} 
              />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                {isDragOver ? 'Drop your image here' : 'Upload Plant Photo'}
              </h3>
              <p className="text-slate-500 mb-6">
                Drag and drop your image here, or click to browse
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-8 text-center">
                <img 
                  src={previewUrl} 
                  alt="Plant preview" 
                  className="max-w-full max-h-80 mx-auto rounded-xl shadow-lg"
                />
                <div className="mt-6 space-x-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Plant'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                      setDiagnosisResult(null);
                    }}
                    className="bg-slate-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center mb-8">
            <Loader className="animate-spin mx-auto mb-4 text-emerald-600" size={48} />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Analyzing Your Plant</h3>
            <p className="text-slate-500">Our AI is examining your plant for diseases, pests, and health issues...</p>
          </div>
        )}

        {/* Diagnosis Results */}
        {diagnosisResult && !isAnalyzing && (
          <div className="space-y-8">
            <div className={`bg-white rounded-2xl shadow-xl border-l-8 ${getSeverityColor(diagnosisResult.severity)} p-8`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getSeverityIcon(diagnosisResult.severity)}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    Diagnosis: {diagnosisResult.condition}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {diagnosisResult.description}
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Treatment Recommendation:</h4>
                    <p className="text-blue-700">{diagnosisResult.treatment}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <ShoppingCart className="mr-3 text-emerald-600" />
                Recommended Products
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {diagnosisResult.products.map((product, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="text-4xl mb-4">{product.image}</div>
                    <h4 className="font-semibold text-slate-800 mb-2">{product.name}</h4>
                    <p className="text-emerald-600 font-bold text-xl mb-4">₹{product.price}</p>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl('');
                  setDiagnosisResult(null);
                }}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Scan Another Plant
              </button>
              <Link
                to="/"
                className="inline-block bg-slate-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanPage;