import Calculator from "../Components/ChildcareCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Blue */}
      <div className="bg-blue-400 text-white rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Branding */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
                <span className="text-white">MyChildcare</span>
                <span className="text-blue-100">Calculator</span>
                <span className="text-blue-200 text-2xl md:text-3xl">.co.uk</span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-medium text-blue-100 mb-8">
              Helping parents understand their childcare costs!
            </p>
            
            {/* Visual Icons */}
            <div className="flex justify-center items-center space-x-8 mb-8 text-4xl md:text-5xl">
              <div className="animate-bounce" style={{animationDelay: '0s'}}>👶</div>
              <div className="animate-bounce" style={{animationDelay: '0.2s'}}>🍼</div>
              <div className="animate-bounce" style={{animationDelay: '0.4s'}}>🧸</div>
              <div className="animate-bounce" style={{animationDelay: '0.6s'}}>👶</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Commentary Section - Pink */}
      <div className="bg-pink-200 rounded-t-3xl -mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-pink-300/50">
              <p className="text-lg text-pink-800 leading-relaxed">
                Navigate the complex world of UK childcare costs with confidence. 
                Our calculator helps you understand free hours eligibility, tax-free childcare benefits, 
                and gives you an easy-to-read breakdown of your costs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 bg-white rounded-3xl mx-4 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Government Support</h3>
              <p className="text-gray-600">
                Understand your eligibility for 30 free hours and tax-free childcare schemes
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real Costs</h3>
              <p className="text-gray-600">
                See your actual out-of-pocket expenses including consumables and hidden costs
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Clear Breakdown</h3>
              <p className="text-gray-600">
                Get weekly, monthly, and annual cost projections with detailed explanations
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Calculator Section */}
      <div className="py-8 bg-gray-50 rounded-3xl mx-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Calculate Your Costs</h2>
            <p className="text-xl text-gray-600">
              Answer a few simple questions to get your personalized childcare cost breakdown
            </p>
          </div>
          
          <Calculator />
        </div>
      </div>
      
      {/* Bottom CTA Section - Pink */}
      <div className="bg-pink-300 rounded-t-3xl py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="text-pink-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Take Control of Your Childcare Budget
            </h2>
            <p className="text-pink-700 text-lg mb-6">
              Join thousands of parents who've used our calculator to plan their childcare costs
            </p>
            <div className="flex justify-center space-x-4 text-2xl">
              <span>👨‍👩‍👧‍👦</span>
              <span>💙</span>
              <span>🏠</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}