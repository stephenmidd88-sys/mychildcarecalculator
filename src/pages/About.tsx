export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Blue */}
      <div className="bg-blue-400 text-white rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              About <span className="text-blue-100">Our Story</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-blue-100 mb-8">
              Created by parents, for parents
            </p>
            
            {/* Visual Icons */}
            <div className="flex justify-center items-center space-x-8 mb-8 text-4xl md:text-5xl">
              <div className="animate-bounce" style={{animationDelay: '0s'}}>👨‍👩‍👧‍👦</div>
              <div className="animate-bounce" style={{animationDelay: '0.2s'}}>💡</div>
              <div className="animate-bounce" style={{animationDelay: '0.4s'}}>💻</div>
              <div className="animate-bounce" style={{animationDelay: '0.6s'}}>❤️</div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section - Pink */}
      <div className="bg-pink-200 rounded-t-3xl -mt-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto border border-pink-300/50">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-4">
                The Problem We Solved
              </h2>
              <div className="text-4xl mb-4">🤔</div>
            </div>
            
            <div className="space-y-6 text-pink-800 leading-relaxed">
              <p className="text-lg">
                As a parent, I was always keen to understand what my nursery costs would be for my child. 
                This became even more important when the government announced changes in the support they 
                would provide to parents.
              </p>

              <p className="text-lg">
                Like many parents, I found myself creating spreadsheets and doing rough calculations, trying 
                to make sense of the numbers. But as I spoke to other parents, it became obvious that the 
                existing "online calculators" didn't really meet our requirements as parents—sometimes 
                giving inaccurate or partial answers to our important questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section - White */}
      <div className="py-12 bg-white rounded-3xl mx-4 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Our Solution
            </h2>
            <div className="text-4xl mb-4">✨</div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Experience</h3>
              <p className="text-gray-600">
                I created this calculator with my own childcare situation in mind. My child will soon 
                receive the 30 hours childcare support from September 2025.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Comprehensive Approach</h3>
              <p className="text-gray-600">
                I've tried to include several factors to make this calculator as comprehensive 
                as possible for families in similar situations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Us Improve Section - Pink */}
      <div className="bg-pink-300 rounded-t-3xl py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-pink-400/50">
            <div className="text-pink-800">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Help Us Make It Even Better
              </h2>
              <p className="text-pink-700 text-lg mb-6">
                While I've tried to include several factors in this calculator, there may still be 
                some items missing or edge cases I haven't considered.
              </p>
              <div className="bg-pink-100 rounded-2xl p-6 mb-6">
                <p className="text-pink-800 font-medium mb-2">
                  🐛 Found a bug or missing feature?
                </p>
                <p className="text-pink-700">
                  Please use our <strong>Contact Us</strong> page to share any helpful hints or 
                  report issues you've discovered with the calculator.
                </p>
              </div>
              <div className="flex justify-center space-x-4 text-2xl">
                <span>👨‍👩‍👧‍👦</span>
                <span>💙</span>
                <span>🤝</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}