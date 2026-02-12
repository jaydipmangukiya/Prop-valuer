import { Gavel, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marketInsightsData } from "@/lib/siteContent";

export function MarketInsights() {
  return (
    <section className="bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:text-4xl">
            {/* Market Value & Investment Opportunities */}Market Insights
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {/* Understand accurate market valuation and discover auction &
            bank-seized properties with real investment potential. */}
            Stay informed with real-time market trends and pricing data across
            major cities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketInsightsData.map((data, index) => {
            const Icon = data.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    {data.type === "valuation" ? (
                      <div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          data.trendUp
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <TrendingUp
                          className={`h-3 w-3 ${
                            data.trendUp ? "" : "rotate-180"
                          }`}
                        />
                        <span>{data.trend}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                        <Gavel className="h-3 w-3" />
                        Auction Active
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2">
                    {data.location}
                  </CardTitle>
                  {data.type === "valuation" ? (
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-gray-900">
                        {data.avgPrice}
                      </p>
                      <p className="text-sm text-gray-600">
                        Market value per sq ft
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        Auction & Bank-Seized Properties
                      </p>
                      <p className="text-sm text-gray-600">
                        Compare auction price vs market value
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Why Choose Assetory?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-slate-800 mb-2">
                  50K+
                </div>
                <p className="text-gray-600">Properties Valued</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-700 mb-2">
                  95%
                </div>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  24/7
                </div>
                <p className="text-gray-600">Available Service</p>
              </div>
              {/* <div>
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  Valuation
                </div>
                <p className="text-gray-600">Bank-Grade Reports</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  Auctions
                </div>
                <p className="text-gray-600">Seized & Distressed Assets</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarketInsights;
