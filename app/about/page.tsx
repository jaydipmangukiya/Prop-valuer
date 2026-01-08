import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { stats, teamMember, features } from "@/lib/siteContent";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About PropValuer</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We&#39;re revolutionizing property valuation in India with
            cutting-edge technology, comprehensive market data, and years of
            real estate expertise.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              // const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="text-emerald-600 mb-4 flex justify-center">
                    {/* <Icon className="w-8 h-8" /> */}
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                To democratize property valuation in India by making accurate,
                instant, and affordable property assessments accessible to
                everyone. We believe that every property owner, buyer, and
                investor deserves transparent and reliable valuation data.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our platform combines advanced machine learning algorithms with
                comprehensive market data to provide valuations that are not
                just accurate, but also actionable for your real estate
                decisions.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Modern office building"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose PropValuer?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We combine technology, data, and expertise to deliver the most
              accurate property valuations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <Icon className={`h-12 w-12 ${feature.colorClass}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Industry experts and technology leaders working together to
              transform real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMember.map((member, index) => (
              <Card
                key={index}
                className="text-center overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Value Your Property?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of property owners who trust PropValuer for accurate,
            instant valuations
          </p>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
