"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Building2, Menu, X, User, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./authentication/LogoutButton";
import { useAuth } from "./authentication/AuthProvider";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { user, isAuth } = useAuth();
  const userName = user?.name ?? "User";

  const isLoggedIn = isAuth;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Property Valuation", href: "/property-valuation" },
    { name: "Auction Property", href: "/property-auction-list" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-slate-800">Asstory</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center lg:space-x-6 md:space-x-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth / Profile Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setOpenProfileMenu(!openProfileMenu)}
                  className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 bg-white hover:bg-slate-50 transition"
                >
                  <User className="h-5 w-5 text-slate-700" />
                  <span className="text-slate-800 font-medium">{userName}</span>
                </button>

                {openProfileMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border border-slate-200 py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-slate-700"
                    >
                      <User className="h-4 w-4" /> My Profile
                    </Link>

                    <Link
                      href="/history"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 text-slate-700"
                    >
                      <History className="h-4 w-4" /> History
                    </Link>

                    <div className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-slate-700">
                      <LogoutButton />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-slate-700 font-medium"
                    >
                      My Profile
                    </Link>

                    <Link
                      href="/history"
                      className="text-slate-700 font-medium"
                    >
                      History
                    </Link>

                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full text-emerald-600 border-emerald-600"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link href="/register">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
