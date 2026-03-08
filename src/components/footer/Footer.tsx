/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "@/redux/fetures/admin/admin-category.api";

const Footer = () => {
  // কুইক লিংকের জন্য ক্যাটাগরি ডাটা ফেচ করা
  const { data: categoriesResponse } = useGetAllCategoriesQuery({
    page: 1,
    limit: 7,
  });
  const quickCategories = categoriesResponse?.data || [];

  return (
    <footer className="w-full bg-white border-t pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 1. Logo and App Downloads */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90">
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
                <span className="text-white bg-black p-3 rounded-md font-bold text-xs uppercase italic">
                  F
                </span>
              </div>
              <h1 className="text-sm font-black text-[#0064AE] uppercase tracking-widest">
                Finn
              </h1>
            </Link>

            <div className="space-y-3">
              <p className="font-semibold text-slate-800">
                Download The Mobile App
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="flex items-center bg-black text-white px-4 py-2 rounded-lg w-48 hover:opacity-80 transition"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-8"
                  />
                </a>
                <a
                  href="#"
                  className="flex items-center bg-black text-white px-4 py-2 rounded-lg w-48 hover:opacity-80 transition"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-8"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Company Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-slate-800">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  FAQ's
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Quick Links (Dynamic Categories with Search URL) */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-slate-800">Quick Links</h4>
            <ul className="space-y-2">
              {quickCategories.map((cat: any) => (
                <li key={cat.id}>
                  {/* URL format: /search?search=category-name */}
                  <Link
                    to={`/search?search=${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-slate-600 hover:text-[#0064AE] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              {quickCategories.length === 0 && (
                <li className="text-slate-400 text-sm italic">
                  No categories found
                </li>
              )}
            </ul>
          </div>

          {/* 4. Help & Contact (Includes Social Links) */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-slate-800">Help & Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Classified Ad Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Fraud Prevention
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Recently Viewed
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-[#0064AE] transition-colors"
                >
                  Favorites
                </Link>
              </li>
            </ul>

            {/* Social Links inside Help & Contact section */}
            <div className="pt-6 space-y-3">
              <p className="font-bold text-slate-800 text-sm">
                Stay Connected:
              </p>
              <div className="flex gap-4 items-center text-slate-500">
                <a href="#" className="hover:text-[#0064AE] transition">
                  <Facebook size={18} />
                </a>
                <a href="#" className="hover:text-[#0064AE] transition">
                  <Instagram size={18} />
                </a>
                <a href="#" className="hover:text-[#0064AE] transition">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#0064AE] transition">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} All rights are reserved by Finn</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-slate-600">
              Sitemap
            </Link>
            <Link to="/contact" className="hover:text-slate-600">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
