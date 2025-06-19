import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, MapPin, Phone, Mail, Building, Award, Upload, Check } from 'lucide-react';

const NurseryRegistrationPage = () => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    // Business Information
    nurseryName: '',
    ownerName: '',
    licenseNumber: '',
    businessType: 'retail',
    yearEstablished: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    website: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    
    // Business Details
    specialization: [] as string[],
    deliveryRadius: '',
    operatingHours: '',
    description: '',
    
    // Documents
    licenseDocument: null as File | null,
    businessProof: null as File | null,
    
    // Terms
    agreeToTerms: false,
    agreeToCommission: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecializationChange = (specialization: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(specialization)
        ? prev.specialization.filter(s => s !== specialization)
        : [...prev.specialization, specialization]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  if (step === 'success') {
    return (
      <div className="pt-20 min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-emerald-600" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Registration Submitted!</h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Thank you for your interest in partnering with Plant.It! We've received your nursery registration 
              application and will review it within 2-3 business days. Our team will contact you at{' '}
              <span className="font-medium">{formData.email}</span> with the next steps.
            </p>
            <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-slate-800 mb-4">What happens next?</h3>
              <div className="text-left space-y-3 text-slate-600">
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-3">1.</span>
                  Document verification (1-2 days)
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-3">2.</span>
                  Phone interview with our partnership team
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-3">3.</span>
                  Platform onboarding and training
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-600 mr-3">4.</span>
                  Start receiving orders from customers
                </div>
              </div>
            </div>
            <div className="space-x-4">
              <Link
                to="/"
                className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                to="/products"
                className="inline-block bg-slate-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-slate-800 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-8 px-6 rounded-2xl shadow-xl text-center">
            <Users className="mx-auto mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-2">Nursery Registration</h1>
            <p className="text-xl opacity-90">Join our network of trusted plant care partners</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Building className="mr-3 text-emerald-600" />
                Business Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nursery Name *
                  </label>
                  <input
                    type="text"
                    name="nurseryName"
                    required
                    value={formData.nurseryName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="Green Thumb Nursery"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business License Number *
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    required
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="BL123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  >
                    <option value="retail">Retail Nursery</option>
                    <option value="wholesale">Wholesale Nursery</option>
                    <option value="both">Retail & Wholesale</option>
                    <option value="online">Online Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Year Established
                  </label>
                  <input
                    type="number"
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="2020"
                    min="1900"
                    max="2025"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Phone className="mr-3 text-emerald-600" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="owner@nursery.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Alternate Phone
                  </label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="+91 9876543211"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="https://www.yournursery.com"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <MapPin className="mr-3 text-emerald-600" />
                Address Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="Street address, area, locality"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="Jaipur"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="Rajasthan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="302017"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Award className="mr-3 text-emerald-600" />
                Business Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Specialization (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      'Indoor Plants', 'Outdoor Plants', 'Succulents', 'Flowering Plants',
                      'Fruit Plants', 'Vegetable Plants', 'Medicinal Plants', 'Bonsai',
                      'Seeds', 'Fertilizers', 'Plant Medicines', 'Garden Tools'
                    ].map((spec) => (
                      <label key={spec} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.specialization.includes(spec)}
                          onChange={() => handleSpecializationChange(spec)}
                          className="mr-2 text-emerald-600 focus:ring-emerald-400"
                        />
                        <span className="text-sm text-slate-700">{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Delivery Radius (km)
                    </label>
                    <input
                      type="number"
                      name="deliveryRadius"
                      value={formData.deliveryRadius}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="25"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Operating Hours
                    </label>
                    <input
                      type="text"
                      name="operatingHours"
                      value={formData.operatingHours}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                      placeholder="9:00 AM - 6:00 PM"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    placeholder="Tell us about your nursery, experience, and what makes you special..."
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <FileText className="mr-3 text-emerald-600" />
                Required Documents
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business License Document *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'licenseDocument')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Business Proof (GST/Shop Act) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'businessProof')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Terms & Conditions</h3>
              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mr-3 mt-1 text-emerald-600 focus:ring-emerald-400"
                  />
                  <span className="text-sm text-slate-700">
                    I agree to Plant.It's <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a> *
                  </span>
                </label>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToCommission"
                    required
                    checked={formData.agreeToCommission}
                    onChange={handleInputChange}
                    className="mr-3 mt-1 text-emerald-600 focus:ring-emerald-400"
                  />
                  <span className="text-sm text-slate-700">
                    I agree to the commission structure (5% per successful order) and payment terms *
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Submit Registration
              </button>
              <p className="text-sm text-slate-500 mt-4">
                We'll review your application within 2-3 business days
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NurseryRegistrationPage;