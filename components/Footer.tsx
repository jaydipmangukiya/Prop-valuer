import { Building2, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
// import CookieSettingsButton from "./CookieConsent/CookieSettingsButton";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold">Asstory</span>
            </div>
            <p className="text-gray-400 md:max-w-md md:mb-6 mb-3">
              Your trusted partner for data-driven property insights. We provide
              accurate property valuations and verified auction property
              discovery powered by advanced market analysis and real-time data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/property-valuation"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link
                  href="/property-auction-list"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Auction Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">info@asstory.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">+91 78782 83414</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-400">Surat, Gujarat</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Asstory. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6 mt-4 md:mt-0 flex-wrap justify-center md:justify-end">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white sm:text-sm text-[11px] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="text-gray-400 hover:text-white sm:text-sm text-[11px] transition-colors"
              >
                Cookie Policy
              </Link>
              {/* <CookieSettingsButton /> */}
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white sm:text-sm text-[11px] transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="text-gray-400 hover:text-white sm:text-sm text-[11px] transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
