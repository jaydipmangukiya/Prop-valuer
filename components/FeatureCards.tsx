import { FileText, Gavel, ArrowRight } from "lucide-react";
import Link from "next/link";

const FeatureCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-4xl">
            {/* Two Pillars of Smart Property Decisions */}
            Trusted Property Valuation Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {/* Whether you need accurate valuations or seeking investment
            opportunities, we have you covered. */}
            Accurate property valuations backed by real market data and
            professional expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
          {/* Valuation Card */}
          <div className="group relative bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600  to-teal-600 rounded-t-2xl" />
            <div className="w-14 h-14 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-6">
              <FileText className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              Property Valuation
            </h3>
            <p className="text-muted-foreground mb-6">
              Professional valuation reports trusted by banks, legal entities,
              and property professionals. Get accurate market-backed pricing for
              any property.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-8">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Professional bank-grade reports
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Market-backed accurate pricing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Bank & legal compliance ready
              </li>
            </ul>
            <Link
              href="/property-valuation"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group-hover:gap-3 gap-2"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Auction Card */}
          {/* <div className="group relative bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600  to-teal-600 rounded-t-2xl" />
            <div className="w-14 h-14 rounded-xl bg-emerald-600/10 flex items-center justify-center mb-6">
              <Gavel className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              Auction & Bank-Seized Properties
            </h3>
            <p className="text-muted-foreground mb-6">
              Discover undervalued auction properties and bank-seized assets.
              Make informed investment decisions with valuation-backed insights.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-8">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Find undervalued auction properties
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Valuation-backed decision support
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Smart buying opportunities
              </li>
            </ul>
            <Link
              href="/property-auction-list"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group-hover:gap-3 gap-2"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
