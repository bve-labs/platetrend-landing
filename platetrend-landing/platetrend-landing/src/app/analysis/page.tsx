import SentimentAnalysis from '@/components/SentimentAnalysis'

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/80 border-b border-white/20 z-50 shadow-lg shadow-stone-900/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-4">
                <img 
                  src="/images/platetrend_logo.png"
                  alt="PlateTrend - Restaurant Intelligence"
                  className="h-16 w-auto hover:opacity-80 transition-opacity duration-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                    PlateTrend
                  </span>
                  <span className="text-sm font-medium text-amber-700 -mt-1">
                    Restaurant Intelligence
                  </span>
                </div>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">Home</a>
              <a href="/analysis" className="text-amber-600 hover:text-amber-700 transition-colors font-medium">Analysis</a>
              <a href="/#features" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">Features</a>
              <a href="/#pricing" className="text-stone-600 hover:text-stone-900 transition-colors font-medium">Pricing</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <SentimentAnalysis />
      </div>
    </div>
  )
}
