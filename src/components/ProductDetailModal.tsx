import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  X, 
  ShieldCheck, 
  Download, 
  Truck, 
  Package, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { products, selectedProductId, setSelectedProductId, setActivePage, setQuickQuoteProductId } = useProducts();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!selectedProductId) return null;

  const product = products.find(p => p.id === selectedProductId);
  if (!product) return null;

  const handleStartQuote = () => {
    setQuickQuoteProductId(product.id);
    setSelectedProductId(null);
    setActivePage('contact');
  };

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col text-stone-100 overflow-hidden relative animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {product.code}
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {product.name}
              </h2>
              <p className="text-xs text-stone-400">{product.enName} · {product.cnsStandard}</p>
            </div>
          </div>
          <button
            id="close-product-detail-btn"
            onClick={() => setSelectedProductId(null)}
            className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 text-stone-200">
          {/* Top Banner with image and key takeaway */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-stone-950/80 border border-stone-800 rounded-xl p-5">
            <div className="md:col-span-5 relative rounded-lg overflow-hidden border border-stone-800 aspect-video md:aspect-square bg-stone-900">
              <img 
                src={product.image} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 left-2 bg-stone-900/90 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded border border-amber-500/40">
                {product.badge}
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-medium text-emerald-400">{product.stockStatusLabel}</span>
              </div>
              <p className="text-base text-stone-200 leading-relaxed font-normal">
                {product.summary}
              </p>
              <div className="text-xs text-stone-400 bg-stone-900 p-3 rounded-lg border border-stone-800 space-y-1">
                <div className="font-semibold text-stone-300">常態交期與配送機制：</div>
                <div>{product.leadTime}</div>
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  id="modal-quote-cta-btn"
                  onClick={handleStartQuote}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>立即以此產品填寫採購詢價</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="modal-download-report-btn"
                  onClick={handleSimulateDownload}
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs rounded-lg border border-stone-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-300" />
                  <span>下載最新 TAF 檢驗成績書</span>
                </button>
              </div>
              {downloadSuccess && (
                <div className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>已成功產生《{product.name} TAF批次物性成績證明》，正在準備下載...</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 1: Detailed physical and chemical specs table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                標準物理及化學檢驗數據指標 (CNS 國家標準規範對比)
              </h3>
              <span className="text-xs text-stone-400 hidden sm:inline">品管實驗室TAF認證檢驗</span>
            </div>
            
            <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-900/90 text-stone-300 border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-4 font-semibold">檢驗項目 (Test Property)</th>
                    <th className="py-3 px-4 font-semibold text-amber-300">東南水泥實際檢驗平均值</th>
                    <th className="py-3 px-4 font-semibold text-stone-400">CNS 規範標準門檻要求</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/80 font-mono">
                  {product.specs.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-900/40 transition-colors">
                      <td className="py-2.5 px-4 text-stone-300 font-sans font-medium">{item.label}</td>
                      <td className="py-2.5 px-4 font-bold text-amber-400">{item.value}</td>
                      <td className="py-2.5 px-4 text-stone-400">{item.standardReq || '符合規定'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Key Features & Technical Notes */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              產品優勢與工程性能核心要點
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.keyFeatures.map((feat, idx) => (
                <div key={idx} className="bg-stone-950 border border-stone-800 p-3.5 rounded-lg flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-300 leading-relaxed">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Applications for Concrete Plants and Material Stores */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              適用工程場域與客群搭配指南
            </h3>
            <ul className="space-y-2 bg-stone-950 border border-stone-800 p-4 rounded-xl text-xs text-stone-300">
              {product.applications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Packaging and Bulk Logistics */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              出貨形式與起訂量規範
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.packaging.map((pack, idx) => (
                <div key={idx} className="bg-stone-950 border border-stone-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-stone-100 font-bold text-sm">
                    {pack.type === 'tanker_bulk' ? (
                      <Truck className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Package className="w-4 h-4 text-amber-400" />
                    )}
                    <span>{pack.label}</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {pack.description}
                  </p>
                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-400">最少採購訂量：</span>
                    <span className="font-semibold text-amber-300">{pack.minOrder}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Certifications */}
          <div className="bg-stone-950/60 border border-stone-800 p-4 rounded-xl text-xs text-stone-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-stone-300 block mb-1">官方檢驗與品質認證體系：</span>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-[11px] text-stone-300">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right text-[11px] text-stone-500 shrink-0">
              規格最後修訂：{product.updatedAt}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-400">
            想了解大宗訂購噸數與運費報價？業務團隊 24H 快速回覆
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProductId(null)}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white bg-stone-900 border border-stone-800 rounded-lg cursor-pointer"
            >
              返回
            </button>
            <button
              onClick={handleStartQuote}
              className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md cursor-pointer transition-colors"
            >
              填寫大宗詢價單
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
