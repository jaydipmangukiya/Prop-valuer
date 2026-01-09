import { howItWorksSteps } from "@/lib/siteContent";

export function HowItWorks() {
  return (
    <section className="bg-gray-50 py-12 mb-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Get your property valuation in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              // <div key={index} className="text-center relative">
              //   <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10">
              //     <Icon className="h-8 w-8 text-emerald-600" />
              //   </div>

              //   {index < howItWorksSteps.length - 1 && (
              //     <div className="hidden lg:block absolute top-8 left-1/2 w-full">
              //       <div className="h-[2px] w-full bg-emerald-600/10"></div>
              //     </div>
              //   )}

              //   <div className="absolute -top-2 -left-2 bg-emerald-600/10 text-emerald-600 rounded-full w-6 h-6 hidden lg:flex items-center justify-center text-sm font-bold">
              //     {index + 1}
              //   </div>

              //   <h3 className="text-lg font-semibold text-gray-900 mb-2">
              //     {step.title}
              //   </h3>
              //   <p className="text-gray-600 text-sm leading-relaxed">
              //     {step.description}
              //   </p>
              // </div>
              <div
                key={index}
                className="text-center relative transition-all duration-300"
              >
                <div className="mx-auto mb-3 bg-emerald-600/10 text-emerald-600 rounded-full w-6 h-6 hidden lg:flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10  transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/30 hover:shadow-xl">
                  <Icon className="h-8 w-8 text-emerald-600 transition-all duration-300 hover:rotate-6 hover:scale-110" />
                </div>

                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full">
                    <div className="h-[2px] w-full bg-emerald-600/10"></div>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
