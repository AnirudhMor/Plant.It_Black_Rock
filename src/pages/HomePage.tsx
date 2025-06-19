import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Target, ShoppingCart, Truck, Upload, Users, Award, Clock, Share2, Copy, MessageCircle, Mail } from 'lucide-react';

const HomePage = () => {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your diagnosis request! We\'ll get back to you within 24 hours.');
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = 'Plant.It - AI-Powered Plant Disease Detection';
    const description = 'Get instant plant diagnosis and treatment with AI technology. Upload a photo and order the cure directly!';

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n${description}\n${url}`)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\nCheck it out: ${url}`)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard!');
        });
        break;
    }
  };

  return (
    <div className="pt-28">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Plant Disease Detection
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 font-light opacity-90">
            Upload a photo, get instant diagnosis, and order the cure directly
          </h2>
          
          <div className="w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-400">
            <span className="text-6xl">🌱</span>
          </div>
          
          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-lg opacity-90 leading-relaxed">
              Simply upload a photo of your plant and our advanced AI instantly identifies diseases, pests, and nutrient deficiencies. Get the exact medicines and fertilizers you need, delivered from local nurseries directly to your door.
            </p>
          </div>
          
          <Link 
            to="/scan" 
            className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Upload Plant Photo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Plant.It?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We combine scientific expertise with practical solutions to give your plants the best care possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-emerald-600 mb-6">
                <Camera size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Instant AI Scanning</h3>
              <p className="text-slate-600 leading-relaxed">
                Upload a photo and get instant disease detection powered by advanced machine learning algorithms trained on thousands of plant conditions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-blue-600 mb-6">
                <Target size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Precise Treatment Plans</h3>
              <p className="text-slate-600 leading-relaxed">
                Receive specific medicine and fertilizer recommendations tailored to your plant's exact condition and species requirements.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-amber-600 mb-6">
                <ShoppingCart size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">One-Click Ordering</h3>
              <p className="text-slate-600 leading-relaxed">
                Order recommended treatments directly through our platform. We partner with local nurseries for fast, reliable delivery.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-purple-600 mb-6">
                <Truck size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Local Nursery Network</h3>
              <p className="text-slate-600 leading-relaxed">
                Products are sourced and delivered by trusted local nurseries in your area, ensuring freshness and supporting local businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Diagnostic Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple, effective, and scientifically-backed approach to plant health restoration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Submit Photos', description: 'Upload clear photos of your plant and describe the symptoms you\'ve noticed.' },
              { step: 2, title: 'Expert Analysis', description: 'Our certified botanists analyze your plant using proven diagnostic methods.' },
              { step: 3, title: 'Receive Treatment Plan', description: 'Get a detailed, step-by-step treatment plan with product recommendations.' },
              { step: 4, title: 'Follow-up Support', description: 'Ongoing monitoring and adjustments to ensure your plant\'s complete recovery.' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 border-4 border-emerald-400 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 text-center border border-slate-200">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Advanced AI Technology</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Our machine learning algorithms are trained on extensive databases of plant diseases and conditions. Combined with our network of trusted local nurseries, we provide the most comprehensive plant care solution available.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                'AI-Powered Detection',
                'Local Nursery Partners',
                'Fast Delivery Network',
                'Quality Guaranteed'
              ].map((credential) => (
                <div key={credential} className="bg-white px-6 py-3 rounded-lg font-medium text-slate-800 shadow-md border border-slate-200">
                  {credential}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-800 text-center mb-16">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                text: "Plant.It's AI diagnosed my rose bush disease instantly! I ordered the recommended fungicide through their site and it was delivered the same day from a local nursery. My roses are blooming again!",
                author: "Sarah Chen, Home Gardener"
              },
              {
                text: "As a nursery owner, I love partnering with Plant.It. Their accurate diagnoses help our customers get exactly what they need, and the integrated ordering system streamlines our operations.",
                author: "Michael Rodriguez, Green Thumb Nursery"
              },
              {
                text: "The convenience is unmatched. Upload photo, get diagnosis, order treatment, receive delivery. My fiddle leaf fig has never looked better thanks to their precise recommendations.",
                author: "Jennifer Park, Plant Enthusiast"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 relative">
                <div className="text-6xl text-slate-200 absolute top-4 left-6 opacity-50">"</div>
                <p className="text-slate-700 mb-6 relative z-10 leading-relaxed">{testimonial.text}</p>
                <div className="font-bold text-slate-800">{testimonial.author}</div>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50,000+', label: 'Photos Analyzed' },
              { number: '96%', label: 'AI Accuracy Rate' },
              { number: '24hrs', label: 'Average Delivery Time' },
              { number: '500+', label: 'Partner Nurseries' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Get Started Today</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white text-slate-800 p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-8">Start Plant Diagnosis</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="plant-photo" className="block text-sm font-medium mb-2">Upload Plant Photo</label>
                  <input 
                    type="file" 
                    id="plant-photo" 
                    name="plant-photo" 
                    accept="image/*" 
                    required 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="plant-type" className="block text-sm font-medium mb-2">Plant Type (if known)</label>
                  <input 
                    type="text" 
                    id="plant-type" 
                    name="plant-type" 
                    placeholder="e.g., Fiddle Leaf Fig, Snake Plant" 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105"
                >
                  Get AI Diagnosis
                </button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center"><span className="mr-3">📧</span> plantit@gmail.com</p>
                  <p className="flex items-center"><span className="mr-3">📞</span> +91 9728618297</p>
                  <p className="flex items-center"><span className="mr-3">🕒</span> Mon-Fri: 8AM-6PM IST</p>
                  <p className="flex items-center"><span className="mr-3">📍</span> Manipal University Jaipur, Rajasthan</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Quick & Easy Process</h3>
                <p className="text-slate-300 leading-relaxed">
                  Upload your plant photo and get instant AI-powered diagnosis with direct access to order the exact treatments you need.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Local Delivery Network</h3>
                <p className="text-slate-300 leading-relaxed">
                  We partner with nurseries in your area to ensure fast delivery of fresh, quality plant care products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Website Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Share2 className="text-white" size={40} />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Love Plant.It? Share It!</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Help your friends and family discover the power of AI-driven plant care. 
              Share Plant.It and help more plants thrive!
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <button
                onClick={() => handleShare('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center space-y-2"
                title="Share on WhatsApp"
              >
                <MessageCircle size={24} />
                <span className="text-sm font-medium">WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleShare('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center space-y-2"
                title="Share on Facebook"
              >
                <span className="text-xl">📘</span>
                <span className="text-sm font-medium">Facebook</span>
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center space-y-2"
                title="Share on Twitter"
              >
                <span className="text-xl">🐦</span>
                <span className="text-sm font-medium">Twitter</span>
              </button>
              
              <button
                onClick={() => handleShare('linkedin')}
                className="bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center space-y-2"
                title="Share on LinkedIn"
              >
                <span className="text-xl">💼</span>
                <span className="text-sm font-medium">LinkedIn</span>
              </button>
              
              <button
                onClick={() => handleShare('email')}
                className="bg-slate-600 hover:bg-slate-700 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center space-y-2"
                title="Share via Email"
              >
                <Mail size={24} />
                <span className="text-sm font-medium">Email</span>
              </button>
              
              <button
                onClick={() => handleShare('copy')}
                className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center space-y-2"
                title="Copy Link"
              >
                <Copy size={24} />
                <span className="text-sm font-medium">Copy Link</span>
              </button>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <h3 className="text-lg font-semibold mb-3">Why Share Plant.It?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-300">🌱</span>
                  <span>Help plants thrive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-300">🤖</span>
                  <span>AI-powered diagnosis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-300">🚚</span>
                  <span>Local delivery network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;