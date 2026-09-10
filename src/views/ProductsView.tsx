import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  ShieldCheck, 
  Truck, 
  Package, 
  FileText, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  Layers, 
  Sparkles,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ConcreteCalculator } from '../components/ConcreteCalculator';

export const ProductsView: React.FC = () => {
  const { products, setSelectedProductId, setActivePage, setQuickQuoteProductId } = useProducts();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'cement' | 'slag'>('all');
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);

  const filteredProducts = activeCategoryFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategoryFilter);

  const handleDownload = (prodName: string) => {
    setDownloadSuccessItem(prodName);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 4000);
  };

  const handleQuoteClick = (prodId: string) => {
    setQuickQuoteProductId(prodId);
    setActivePage('contact');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
          <span>產品介紹與技術規範</span>
          <span className="text-stone-300">/</span>
          <span>CNS 國家品質標準認證</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          東南水泥全系列優質產品
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          東南水泥專注於提供結構級優質水泥與高爐石粉。以 CNS 61 一型卜特蘭水泥為堅固骨幹，輔以高細度水淬高爐石粉（GGBS）之微結構緻密與水化熱抑制特性，為預拌混凝土廠與建材行打造最高性價比的採購配置。
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-4">
          <Filter className="w-4 h-4 text-stone-400" />
          <span className="text-xs font-semibold text-stone-500 mr-2">產品篩選：</span>
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategoryFilter === 'all'
                ? 'bg-stone-900 text-white shadow'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            全部產品 ({products.length})
          </button>
          <button
            onClick={() => setActiveCategoryFilter('cement')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategoryFilter === 'cement'
                ? 'bg-stone-900 text-white shadow'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            卜特蘭水泥 (CNS 61)
          </button>
          <button
            onClick={() => setActiveCategoryFilter('slag')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCategoryFilter === 'slag'
                ? 'bg-stone-900 text-white shadow'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            水淬高爐石粉 (CNS 12549)
          </button>
        </div>
      </div>

      {/* Main Product Detailed Cards */}
      <div className="space-y-12">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            id={`product-card-${product.id}`}
            className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Product Visual & Status (5 cols) */}
              <div className="lg:col-span-5 bg-stone-900 p-6 sm:p-8 flex flex-col justify-between text-white relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-lg font-mono">
                      {product.code}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">
                      {product.cnsStandard}
                    </span>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-stone-800 aspect-[4/3] bg-stone-950">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                    <p className="text-xs text-stone-400 mt-0.5">{product.enName}</p>
                  </div>

                  <div className="bg-stone-950/80 border border-stone-800 p-3.5 rounded-xl text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>供料狀態：{product.stockStatusLabel}</span>
                    </div>
                    <div className="text-stone-400 text-[11px] leading-relaxed">
                      {product.leadTime}
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-2.5">
                  <button
                    id={`quote-cta-${product.id}`}
                    onClick={() => handleQuoteClick(product.id)}
                    className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>立即索取此產品大宗報價單</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id={`download-spec-${product.id}`}
                    onClick={() => handleDownload(product.name)}
                    className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-xl border border-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下載 TAF 批次出廠檢驗成績證明 (PDF)</span>
                  </button>

                  {downloadSuccessItem === product.name && (
                    <div className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-700/60 p-2 rounded-lg flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>正在為您產出最新 TAF 檢驗成績書...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Detailed Spec and Content (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                
                {/* Product Narrative description */}
                <div>
                  <h3 className="text-base font-bold text-stone-900 mb-2">產品概述與配比原理</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Core Features */}
                <div>
                  <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                    核心優勢與工程性能：
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.keyFeatures.map((feat, i) => (
                      <div key={i} className="bg-stone-50 border border-stone-200/80 p-3 rounded-xl text-xs text-stone-700 flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical and Chemical Specs Table */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                      物理及化學性質檢驗指標 (CNS vs 實測)
                    </h3>
                    <button
                      onClick={() => setSelectedProductId(product.id)}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
                    >
                      放大檢視完整試驗標準
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-stone-100/90 text-stone-600 border-b border-stone-200">
                        <tr>
                          <th className="py-2.5 px-3 font-semibold font-sans">檢驗項目</th>
                          <th className="py-2.5 px-3 font-bold text-stone-900 font-sans">實測平均值</th>
                          <th className="py-2.5 px-3 font-medium text-stone-500 font-sans">CNS 規定要求</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200/80">
                        {product.specs.slice(0, 5).map((spec, i) => (
                          <tr key={i} className="hover:bg-white transition-colors">
                            <td className="py-2 px-3 text-stone-700 font-sans">{spec.label}</td>
                            <td className="py-2 px-3 font-bold text-amber-700">{spec.value}</td>
                            <td className="py-2 px-3 text-stone-500">{spec.standardReq || '符合規定'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Packaging & Minimum Order */}
                <div>
                  <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                    出貨包裝形式與起訂量：
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.packaging.map((pkg, i) => (
                      <div key={i} className="border border-stone-200 rounded-xl p-3.5 space-y-1.5 bg-stone-50/50">
                        <div className="flex items-center gap-2 font-bold text-xs text-stone-900">
                          {pkg.type === 'tanker_bulk' ? (
                            <Truck className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Package className="w-4 h-4 text-amber-600" />
                          )}
                          <span>{pkg.label}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-relaxed">
                          {pkg.description}
                        </p>
                        <div className="text-[11px] font-semibold text-amber-700 pt-1 border-t border-stone-200">
                          起訂量：{pkg.minOrder}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application bullet tags */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-stone-700 block">典型應用場合：</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.applications.map((app, i) => (
                      <span key={i} className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md border border-stone-200/60">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Concrete Calculator Embed */}
      <div className="pt-6">
        <ConcreteCalculator />
      </div>

      {/* Bottom Procurement Assurance */}
      <div className="bg-stone-100 border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-stone-900">需要針對貴廠專案進行試拌或特訂配比諮詢？</h3>
          <p className="text-xs sm:text-sm text-stone-600">
            東南水泥技術處工程師團隊具備完整配比試拌實驗室，竭誠為預拌廠客戶提供水化熱曲線與抗壓驗證分析。
          </p>
        </div>
        <button
          onClick={() => setActivePage('contact')}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shrink-0 shadow-md"
        >
          立即預約業務工程師現場拜訪
        </button>
      </div>

    </div>
  );
};
