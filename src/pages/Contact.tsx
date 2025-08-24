export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Blue */}
      <div className="bg-blue-400 text-white rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Get <span className="text-blue-100">In Touch</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-blue-100 mb-8">
              We'd love to hear from you!
            </p>
            
            {/* Visual Icons */}
            <div className="flex justify-center items-center space-x-8 mb-8 text-4xl md:text-5xl">
              <div className="animate-bounce" style={{animationDelay: '0s'}}>📧</div>
              <div className="animate-bounce" style={{animationDelay: '0.2s'}}>💬</div>
              <div className="animate-bounce" style={{animationDelay: '0.4s'}}>🤝</div>
              <div className="animate-bounce" style={{animationDelay: '0.6s'}}>✨</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Contact Us Section - Pink */}
      <div className="bg-pink-200 rounded-t-3xl -mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-pink-300/50">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4">
                Why Should You Contact Us?
              </h2>
              <div className="text-4xl mb-4">🎯</div>
            </div>
            
            <div className="text-pink-800 leading-relaxed text-center">
              <p className="text-lg mb-6">
                Your feedback helps make our childcare calculator better for all UK families. 
                Whether you've spotted something that needs fixing or have ideas for improvements, 
                we want to hear from you!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reasons to Contact Section - White */}
      <div className="py-12 bg-white rounded-3xl mx-4 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              What We'd Love to Hear About
            </h2>
            <div className="text-4xl mb-4">💭</div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">🐛</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Bug Reports</h3>
              <p className="text-gray-600">
                Found something that's not working quite right? Let us know so we can fix it!
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Feature Ideas</h3>
              <p className="text-gray-600">
                Have an idea that would make the calculator more useful? We'd love to consider it!
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Missing Factors</h3>
              <p className="text-gray-600">
                Know of childcare costs or scenarios we haven't included? Help us be more comprehensive!
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">General Questions</h3>
              <p className="text-gray-600">
                Have questions about the calculator or childcare costs in general? Just ask!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Section - Pink */}
      <div className="bg-pink-300 rounded-t-3xl py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-pink-400/50">
            <div className="text-pink-800">
              <div className="text-4xl mb-6">📮</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to Get in Touch?
              </h2>
              
              <div className="bg-white rounded-2xl p-6 mb-6 border border-pink-200">
                <p className="text-pink-700 text-lg mb-3 font-medium">
                  Drop us a line at:
                </p>
                <a 
                  href="mailto:hello@mychildcarecalculator.co.uk"
                  className="text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200 break-all"
                >
                  hello@mychildcarecalculator.co.uk
                </a>
              </div>
              
              <p className="text-pink-700 text-lg mb-6">
                We read every email and do our best to respond promptly. 
                Your input helps make this calculator better for everyone!
              </p>
              
              <div className="flex justify-center space-x-4 text-2xl">
                <span>📧</span>
                <span>💙</span>
                <span>👨‍👩‍👧‍👦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}