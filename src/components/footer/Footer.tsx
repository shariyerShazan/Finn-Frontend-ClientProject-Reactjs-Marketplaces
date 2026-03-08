// import React from "react";
// import Link from "next/link"; // অথবা 'react-router-dom' থেকে Link নিন
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
//   const currentYear  = new Date().getFullYear() ;

  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/" },
        { label: "Contact Us", href: "/" },
        { label: "Blog", href: "/" },
        { label: "FAQ's", href: "/" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Vehicles", href: "#" },
        { label: "Property", href: "#" },
        { label: "Jobs", href: "#" },
        { label: "For Sale", href: "#" },
        { label: "Pets", href: "#" },
        { label: "Events", href: "#" },
      ],
    },
    {
      title: "Help & Contact",
      links: [
        { label: "Classified Ad Policy", href: "/" },
        { label: "Fraud Prevention", href: "/" },
        { label: "Search", href: "/" },
        { label: "Search by Distance", href: "/" },
        { label: "Recently Viewed", href: "/" },
        { label: "Favorites", href: "/" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white border-t pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and App Downloads */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90">
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
                <span className="text-white bg-black p-3 rounded-md font-bold text-xs uppercase italic">
                  F
                </span>
              </div>
              <h1 className="text-sm font-black text-[#0064AE]  uppercase tracking-widest">
                Finn
              </h1>
            </Link>

            <div className="space-y-3">
              <p className="font-semibold text-slate-800">
                Download The Mobile App
              </p>
              <div className="flex flex-col gap-2">
                {/* Google Play */}
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
                {/* App Store */}
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

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-bold text-lg text-slate-800">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-[#0064AE] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-slate-800">
              Subscribe Newsletter
            </h4>
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="example@email.com"
                  className="bg-slate-50 border-none h-12 pl-4 pr-10 focus-visible:ring-1 focus-visible:ring-[#0064AE]"
                />
              </div>
              <Button className="w-full bg-[#0064AE] hover:bg-[#005291] h-12 text-lg font-medium">
                Subscribe
              </Button>
            </div>

            <div className="space-y-3 pt-4">
              <p className="font-bold text-slate-800">Stay Connected:</p>
              <div className="flex gap-4 items-center text-slate-600">
                <a href="#" className="hover:text-[#0064AE] transition">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-[#0064AE] transition">
                  <Instagram size={20} />
                </a>
                {/* X (Twitter) Icon */}
                <a href="#" className="hover:text-[#0064AE] transition">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-[#0064AE] transition">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>All rights are reserved by the company Finn</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-800">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-800">
              Terms & Conditions
            </Link>
            <Link to="/" className="hover:text-slate-800">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
