import { TrendingUp, Shield, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default Hero;
export function Hero() {
  return (
    <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Property&#39;s
            <span className="text-yellow-300 block">True Market Value</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
            India&#39;s most trusted property valuation platform. Get instant,
            accurate valuations powered by AI and comprehensive market data
            analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Start Free Valuation
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-emerald-700 hover:bg-white hover:text-emerald-700 font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
              <p className="text-white/80">Real-time market data and trends</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Accurate Estimates</h3>
              <p className="text-white/80">95% accuracy rate you can trust</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-white/80">Get your valuation in seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
