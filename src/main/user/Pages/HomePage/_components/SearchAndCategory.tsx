/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Loader2, LayoutGrid } from "lucide-react";
import bgImg from "@/assets/bg.jpg";
import { useGetAllCategoriesQuery } from "@/redux/fetures/admin/admin-category.api";

const SearchAndCategory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // ১. Backend থেকে ক্যাটাগরি ডাটা ফেচ করা (RTK Query)
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery({
    page: 1,
    limit: 12, // আপনি যতগুলো আইকন হোমে দেখাতে চান
  });

  const categories = categoriesData?.data || [];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/search");
    }
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/search?search=${encodeURIComponent(slug)}`);
  };

  return (
    <div
      className="w-full relative pt-4 pb-6 bg-white overflow-hidden"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-3xl font-bold text-[#0064AE] mb-10">
          Your Trusted Local Marketplace for Free Classified Ads
        </h1>

        {/* --- Search Bar --- */}
        <div className="flex flex-col md:flex-row items-center justify-center max-w-3xl mx-auto border rounded-xl shadow-lg bg-white overflow-hidden mb-12">
          <div className="flex items-center flex-1 px-4 py-3">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search anything you need"
              className="w-full outline-none text-gray-600 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#0064AE] hover:bg-[#004f8b] text-white px-10 py-4 font-bold transition-all active:scale-95 cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* --- Dynamic Categories Section --- */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-4">
          {isLoading ? (
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm font-medium">Loading Categories...</span>
            </div>
          ) : (
            categories.map((cat: any) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className="w-14 h-14 flex items-center justify-center border border-gray-100 rounded-2xl bg-white shadow-sm group-hover:bg-blue-50 group-hover:shadow-md transition-all overflow-hidden p-2">
                  {cat.image ? (
                    // ব্যাকেন্ড থেকে আসা ইমেজ
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    // ইমেজ না থাকলে ডামি আইকন
                    <LayoutGrid
                      size={24}
                      className="text-gray-400 group-hover:text-[#0064AE]"
                    />
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-600 group-hover:text-[#0064AE]">
                  {cat.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndCategory;
