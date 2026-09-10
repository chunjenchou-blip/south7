import React from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { COMPANY_LOCATIONS } from '../data/initialProducts';

export const Footer: React.FC = () => {
  const { setActivePage, setIsShareModalOpen } = useProducts();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top summary grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Corporate Overview (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">東南水泥股份有限公司</span>
                <p className="text-[11px] text-stone-400">Southeast Cement Corporation · 創立於民國45年</p>
              </div>
            </div>
            
            <p className="text-sm text-stone-400 leading-relaxed">
              深耕台灣水泥工業一甲子，以自產高品質熟料為根基，堅持 CNS 國家最高檢驗標準。專業生產一型卜特蘭水泥與超細水淬高爐石粉，為預拌混凝土廠、重大公共交通建設與建材流通體系提供全天候穩定供料與專屬槽車配送。
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                CNS 61 正字標記
              </span>
              <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                CNS 12549 驗證登錄
              </span>
              <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-300 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                24H 槽車氣送直配
              </span>
            </div>
          </div>

          {/* Core Products Quick links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              核心產品系列
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => setActivePage('products')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  一型卜特蘭水泥 (CNS 61)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('products')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  水淬高爐石粉 (CNS 12549)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('products')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  散裝氣送槽車出貨規格
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('products')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  40kg 防潮袋裝棧板包裝
                </button>
              </li>
            </ul>
          </div>

          {/* Quick procurement & services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              採購與業務支援
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => setActivePage('blog')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  工程技術專欄 & 配比試驗
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  混凝土廠大宗詢價單
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  建材行經銷批發洽詢
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('products')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                  TAF 出廠品質試驗報告
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('admin')}
                  className="hover:text-amber-300 flex items-center gap-1 text-left cursor-pointer transition-colors text-amber-400/90"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  團隊夥伴管理後台
                </button>
              </li>
            </ul>
          </div>

          {/* Procurement Hotlines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-stone-800 pb-2">
              業務採購專線
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div>
                <span className="text-stone-300 font-semibold block">高雄總公司（營運總部）：</span>
                <span className="text-amber-400 font-bold text-sm">(07) 271-1121</span>
              </div>
              <div>
                <span className="text-stone-300 font-semibold block">高雄港發貨站（0600-1600）：</span>
                <span className="text-emerald-400 font-bold text-sm">(07) 822-7070</span>
              </div>
              <div>
                <span className="text-stone-300 font-semibold block">業務部電子郵件：</span>
                <span className="text-stone-300">sales@secement.com.tw</span>
              </div>
              <div className="pt-2">
                <button
                  id="footer-share-btn"
                  onClick={() => setIsShareModalOpen(true)}
                  className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs rounded-lg border border-stone-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>分享官網 (Threads/FB)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hubs Bar */}
        <div className="border-t border-stone-800/80 pt-8">
          <h5 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
            主要營運據點與發貨總站
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {COMPANY_LOCATIONS.map((loc, idx) => (
              <div key={idx} className="bg-stone-900/60 border border-stone-800/80 rounded-xl p-3.5 space-y-1 text-xs">
                <div className="font-bold text-stone-200">{loc.name}</div>
                <div className="text-[11px] text-amber-400/90">{loc.type}</div>
                <div className="text-stone-400">{loc.address}</div>
                <div className="text-stone-300 font-mono pt-1">電話：{loc.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 東南水泥股份有限公司 Southeast Cement Corporation. 版權所有，非經授權請勿轉載。</p>
          <div className="flex items-center gap-4">
            <span>統一編號：75311200</span>
            <span>·</span>
            <span>股票代號：1110</span>
            <span>·</span>
            <button
              onClick={() => setActivePage('admin')}
              className="text-stone-400 hover:text-stone-200 underline cursor-pointer"
            >
              夥伴後台登入
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
