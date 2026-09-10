import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  Building2, 
  Share2, 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  Settings, 
  ChevronRight,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';
import { ActivePageView } from '../types';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, setIsShareModalOpen, inquiries } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'pending').length;

  const handleNav = (page: ActivePageView) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-xl transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-stone-950 px-4 py-1.5 text-xs text-stone-400 border-b border-stone-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              全台散裝槽車排班正常供料中
            </span>
            <span className="text-stone-500">|</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              CNS 61 一型水泥 ＆ CNS 12549 爐石粉 正字標記品質驗證
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">總公司：<strong className="text-stone-200 font-semibold">(07) 271-1121</strong> ｜ 發貨總站：<strong className="text-emerald-400 font-semibold">(07) 822-7070</strong></span>
            <span className="text-stone-500">|</span>
            <button
              id="header-share-button"
              onClick={() => setIsShareModalOpen(true)}
              className="hover:text-stone-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              分享至 Threads / FB
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-stone-700 via-stone-800 to-stone-950 border border-stone-600 flex items-center justify-center shadow-inner group-hover:border-amber-500/80 transition-all">
              {/* Industrial Cement Block / Monogram Motif */}
              <Building2 className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  東南水泥
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                  股份有限公司
                </span>
              </div>
              <p className="text-[11px] tracking-wider text-stone-400 uppercase font-sans font-medium">
                Southeast Cement Corp. · 卓越品質
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-link-home"
              onClick={() => handleNav('home')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                activePage === 'home'
                  ? 'bg-stone-800 text-amber-400 font-semibold shadow-inner'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              首頁
            </button>

            <button
              id="nav-link-products"
              onClick={() => handleNav('products')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'products'
                  ? 'bg-stone-800 text-amber-400 font-semibold shadow-inner'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              產品介紹
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-700 text-stone-300">
                一型水泥 / 爐石粉
              </span>
            </button>

            <button
              id="nav-link-blog"
              onClick={() => handleNav('blog')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'blog'
                  ? 'bg-stone-800 text-amber-400 font-semibold shadow-inner'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              工程技術專欄
            </button>

            <button
              id="nav-link-contact"
              onClick={() => handleNav('contact')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'contact'
                  ? 'bg-stone-800 text-amber-400 font-semibold shadow-inner'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-stone-400" />
              採購詢價 / 聯絡方式
            </button>

            <button
              id="nav-link-admin"
              onClick={() => handleNav('admin')}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 border ${
                activePage === 'admin'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                  : 'border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-600 bg-stone-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              夥伴管理後台
              {pendingInquiriesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                  {pendingInquiriesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Desktop Right CTA Action */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="nav-cta-quote-btn"
              onClick={() => handleNav('contact')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-sm rounded-md shadow-md hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              大宗採購線上詢價
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-share-btn"
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 text-stone-400 hover:text-stone-200"
              title="分享網站"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white focus:outline-none"
              aria-label="開啟導覽選單"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <button
            id="mobile-nav-home"
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
              activePage === 'home' ? 'bg-stone-800 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            <span>首頁</span>
            <ChevronRight className="w-4 h-4 text-stone-500" />
          </button>

          <button
            id="mobile-nav-products"
            onClick={() => handleNav('products')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
              activePage === 'products' ? 'bg-stone-800 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            <div>
              <span>產品介紹</span>
              <p className="text-xs text-stone-400 font-normal">一型卜特蘭水泥、水淬高爐石粉規格</p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-500" />
          </button>

          <button
            id="mobile-nav-blog"
            onClick={() => handleNav('blog')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
              activePage === 'blog' ? 'bg-stone-800 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            <div>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>工程技術專欄</span>
              </span>
              <p className="text-xs text-stone-400 font-normal">配比研究、水化熱試驗與重大工程實績</p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-500" />
          </button>

          <button
            id="mobile-nav-contact"
            onClick={() => handleNav('contact')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
              activePage === 'contact' ? 'bg-stone-800 text-amber-400 font-bold' : 'text-stone-300'
            }`}
          >
            <div>
              <span>採購詢價 / 聯絡方式</span>
              <p className="text-xs text-stone-400 font-normal">混凝土廠與建材行大宗供料詢價</p>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-500" />
          </button>

          <button
            id="mobile-nav-admin"
            onClick={() => handleNav('admin')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between border border-stone-700 ${
              activePage === 'admin' ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold' : 'text-stone-300 bg-stone-950'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>夥伴管理後台 (產品增減 / 訂單)</span>
            </div>
            {pendingInquiriesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold">
                {pendingInquiriesCount} 筆待回覆
              </span>
            )}
          </button>

          <div className="pt-3 border-t border-stone-800">
            <button
              id="mobile-nav-quote-btn"
              onClick={() => handleNav('contact')}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-center rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              立即索取混凝土廠/建材行大宗報價
            </button>
            <p className="text-center text-xs text-stone-400 mt-2">
              總公司：(07) 271-1121 ｜ 高雄港發貨站：(07) 822-7070
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
