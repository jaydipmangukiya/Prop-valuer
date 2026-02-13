import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Assetory",
  description:
    "Learn how Assetory uses cookies for property valuation, bank-seized property discovery, analytics, and how to manage your cookie preferences.",
};

export default function CookiePolicyPage() {
  const lastUpdated = "January 20, 2025";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
              Cookie Policy
            </h1>
            <p className="text-gray-600 text-sm">Last updated: {lastUpdated}</p>

            <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Introduction
                </h2>
                <p>
                  Assetory (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or
                  &quot;Company&quot;) uses cookies and similar tracking
                  technologies on our website to enhance your browsing
                  experience, analyze how you use our site, support property
                  valuation tools, bank-seized property discovery, and deliver
                  relevant content.
                  {/* Assetory (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or
                  &quot;Company&quot;) uses cookies and similar tracking
                  technologies on our website to enhance your browsing
                  experience, analyze how you use our site, support property
                  valuation tools, and deliver relevant content. */}
                </p>
                <p className="mt-3">
                  This Cookie Policy explains what cookies are, how we use them,
                  and your choices regarding our use of cookies.
                </p>
              </section>

              {/* What are Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. What Are Cookies?
                </h2>
                <p>
                  Cookies are small text files stored on your device (computer,
                  tablet, or mobile phone) when you visit a website. They help
                  websites remember information about your visit, such as your
                  preferences, login status, and browsing behavior.
                </p>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Types of Cookies We Use
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      A. Necessary Cookies
                    </h3>
                    <p>
                      These cookies are essential for the basic functionality of
                      our website. They include:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                      <li>Authentication cookies (login information)</li>
                      <li>Security cookies (fraud detection)</li>
                      <li>
                        Functionality cookies (language preferences, saved
                        searches, filters, and user interface preferences)
                      </li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">
                      These cookies cannot be disabled as they are required for
                      the site to function properly.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      B. Analytics Cookies
                    </h3>
                    <p>
                      These cookies help us understand how users interact with
                      our website. They collect information such as:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                      <li>Number of visitors</li>
                      <li>Pages visited</li>
                      <li>Time spent on pages</li>
                      <li>Referring source</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">
                      We use this information to improve our website and user
                      experience.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      C. Marketing Cookies
                    </h3>
                    <p>
                      These cookies are used to display relevant content and
                      advertisements based on your interests. They help us:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                      <li>Track your preferences</li>
                      <li>Show personalized ads</li>
                      <li>Measure advertising effectiveness</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">
                      You can opt-out of these cookies through our cookie
                      preferences settings.
                    </p>
                  </div>
                </div>
              </section>

              {/* Your Cookie Choices */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Your Cookie Choices
                </h2>
                <p>
                  You have the right to accept or refuse cookies. When you first
                  visit our website, we display a cookie banner allowing you to:
                </p>
                <ul className="list-disc list-inside mt-3 ml-2 space-y-2">
                  <li>
                    <strong>Accept All:</strong> Enable all non-necessary
                    cookies
                  </li>
                  <li>
                    <strong>Reject Non-Essential:</strong> Disable analytics and
                    marketing cookies
                  </li>
                  <li>
                    <strong>Customize:</strong> Choose which cookies to enable
                    or disable
                  </li>
                </ul>
                <p className="mt-3">
                  You can change your preferences at any time by clicking
                  &quot;Cookie Settings&quot; in the footer of our website.
                </p>
              </section>

              {/* Browser Controls */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Browser Controls
                </h2>
                <p>
                  Most web browsers allow you to control cookies through their
                  settings. You can:
                </p>
                <ul className="list-disc list-inside mt-3 ml-2 space-y-2">
                  <li>Accept or reject all cookies</li>
                  <li>Accept cookies only from certain sites</li>
                  <li>Delete cookies from your browser history</li>
                  <li>
                    Receive a warning when a website tries to set a cookie
                  </li>
                </ul>
                <p className="mt-3">
                  However, blocking cookies may affect the functionality of our
                  website and other sites you visit.
                </p>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Third-Party Cookies
                </h2>
                <p>
                  We may allow third-party service providers to place cookies on
                  your device for analytics, advertising, and other purposes.
                  These include:
                </p>
                <ul className="list-disc list-inside mt-3 ml-2 space-y-2">
                  <li>Google Analytics</li>
                  <li>Google Ads</li>
                  <li>Social media platforms</li>
                </ul>
                <p className="mt-3">
                  These third parties do not receive personally identifiable
                  property or bank-seized property data unless explicitly
                  required for service delivery.
                </p>
              </section>

              {/* Data Protection */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Data Protection
                </h2>
                <p>
                  We take the protection of your data seriously. All information
                  collected through cookies is processed in accordance with our
                  Privacy Policy and applicable data protection laws, in
                  accordance with our Privacy Policy and applicable data
                  protection laws, where required.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Changes to This Policy
                </h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons. We encourage you to review this policy
                  periodically.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Contact Us
                </h2>
                <p>
                  If you have any questions about our Cookie Policy or your
                  cookie preferences, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:info@assetory.in"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      info@assetory.in
                    </a>
                  </p>
                  <p className="mt-2">
                    <strong>Address:</strong> Surat, Gujarat, India
                  </p>
                </div>
              </section>
            </div>

            {/* CTA Button */}
            <div className="mt-12 p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
              <p className="text-gray-700 mb-4">
                Manage your cookie preferences anytime.
              </p>
              <a
                href="/"
                className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
