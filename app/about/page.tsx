import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Users,
  Award,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    {
      icon: <Building2 className="h-8 w-8" />,
      value: "50,000+",
      label: "Properties Valued",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "25,000+",
      label: "Happy Customers",
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: "95%",
      label: "Accuracy Rate",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "5+",
      label: "Years Experience",
    },
  ];

  const features = [
    {
      icon: <Shield className="h-12 w-12 text-emerald-600" />,
      title: "Trusted & Secure",
      description:
        "Your data is protected with bank-level security. We ensure complete privacy and confidentiality of your property information.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: "Market Intelligence",
      description:
        "Our AI-powered algorithms analyze millions of data points including recent sales, market trends, and location factors.",
    },
    {
      icon: <Clock className="h-12 w-12 text-orange-600" />,
      title: "Instant Results",
      description:
        "Get comprehensive property valuation reports in seconds, not days. No waiting, no delays, just accurate results.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "15+ years in real estate and technology",
    },
    {
      name: "Priya Sharma",
      role: "Head of Data Science",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "PhD in Machine Learning, ex-Google",
    },
    {
      name: "Amit Patel",
      role: "VP Engineering",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Former CTO at leading PropTech companies",
    },
  ];

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
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-emerald-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
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
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
            {team.map((member, index) => (
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
