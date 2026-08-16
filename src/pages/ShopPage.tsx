import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductType, ProductCategory } from '../types';
import { siteConfig } from '../config/siteConfig';
import { 
  Filter, 
  Search, 
  Sparkles, 
  X, 
  ArrowUpDown,
  Scissors,
  BookOpen,
  Palette,
  LayoutGrid
} from 'lucide-react';
import { motion } from 'motion/react';

export const ShopPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Categories list
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'wearables', label: 'Wearables & Hats' },
    { id: 'home-decor', label: 'Home Decor & Flowers' },
    { id: 'amigurumi', label: 'Amigurumi & Plush' },
    { id: 'bags', label: 'Bags & Totes' },
    { id: 'blankets', label: 'Blankets & Throws' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'pattern-digital', label: 'Digital PDF Patterns' },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Type Filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Stock filter
      if (onlyInStock && item.availability === 'sold-out') {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q) || item.shortDescription.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedType, selectedCategory, sortBy, searchQuery, onlyInStock]);

  const handleResetFilters = () => {
    setSelectedType('all');
    setSelectedCategory('all');
    setSortBy('featured');
    setSearchQuery('');
    setOnlyInStock(false);
  };

  return (
    <div id="shop-page" className="py-8 sm:py-14 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] text-[#5D3FD3] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#5D3FD3]" />
            <span>Complete Studio Collection</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-[#2D2A32] font-semibold tracking-tight">
            Shop Moonlit Loops
          </h1>
          <p className="text-sm sm:text-base text-[#6B6471] mt-2 font-serif italic">
            Handcrafted finished creations, detailed digital patterns, and custom orders.
          </p>
        </div>

        {/* Primary Type Filter Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#E6E0D5] shadow-xs gap-1 max-w-full overflow-x-auto">
            {[
              { id: 'all', label: 'All Items', icon: LayoutGrid },
              { id: 'handmade', label: 'Handmade Creations', icon: Scissors },
              { id: 'pattern', label: 'Crochet Patterns', icon: BookOpen },
              { id: 'custom', label: 'Custom Orders', icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`type-tab-${tab.id}`}
                  onClick={() => setSelectedType(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#5D3FD3] text-white shadow-xs'
                      : 'text-[#6B6471] hover:bg-[#F3E8FF] hover:text-[#5D3FD3]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter & Sort Controls Bar */}
        <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-[#E6E0D5] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar inside shop */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8A9A5B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword or tag..."
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#E6E0D5] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] bg-[#FDFBF7] text-[#2D2A32]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6471] hover:text-[#2D2A32] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown & Sorting Options */}
          <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
            
            {/* Category select */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#8A9A5B] font-semibold hidden sm:inline">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs sm:text-sm py-2 px-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] font-medium focus:outline-none focus:ring-1 focus:ring-[#5D3FD3] cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs sm:text-sm py-2 px-3 rounded-xl border border-[#E6E0D5] bg-[#FDFBF7] text-[#2D2A32] font-medium focus:outline-none focus:ring-1 focus:ring-[#5D3FD3] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter & Active Filters Reset */}
        <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-[#6B6471]">
          <span>
            Showing <strong className="text-[#2D2A32]">{filteredProducts.length}</strong> creations
          </span>

          {(selectedType !== 'all' || selectedCategory !== 'all' || searchQuery || sortBy !== 'featured') && (
            <button
              onClick={handleResetFilters}
              className="text-[#5D3FD3] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 text-center border border-[#E6E0D5] space-y-3 max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#F3E8FF] mx-auto flex items-center justify-center text-[#5D3FD3]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-[#2D2A32]">
              No creations found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6471]">
              We couldn't find any items matching your selected criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-6 py-2.5 rounded-full bg-[#5D3FD3] text-white text-xs font-semibold hover:bg-[#4B32A8] transition-colors cursor-pointer"
            >
              View All Creations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
