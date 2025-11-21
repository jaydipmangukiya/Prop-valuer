import { Search, FileText, Calculator, CircleCheck as CheckCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Enter Property Details",
      description: "Provide basic information about your property including location, type, and size"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Add Specifications",
      description: "Include additional details like amenities, age, and condition for better accuracy"
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "AI Analysis",
      description: "Our advanced algorithms analyze market data and comparable properties"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Get Valuation",
      description: "Receive instant, accurate property valuation with detailed market insights"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your property valuation in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <div className="text-blue-700">
                  {step.icon}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -translate-x-8"></div>
              )}
              
              <div className="absolute -top-2 -left-2 bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;