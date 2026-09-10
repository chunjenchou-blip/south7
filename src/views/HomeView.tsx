import React from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Factory,
  Share2,
  BookOpen,
  Calendar
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, blogPosts, setActivePage, setSelectedProductId, setQuickQuoteProductId, setIsShareModalOpen } = useProducts();

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
  };

  const handleStartQuote = (productId?: string) => {
    if (productId) {
      setQuickQuoteProductId(productId);
    }
    setActivePage('contact');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-950 text-white min-h-[580px] sm:min-h-[640px] flex items-center border-b border-stone-800">
        {/* Background Image with sophisticated dark gradient overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/sec_cement_hero_1789004287364.jpg" 
            alt="東南水泥現代化生產廠區"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter contrast-110 brightness-95" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-900/60" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 text-amber-400 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>深耕台灣一甲子 · 預拌混凝土廠與建材行大宗水泥首選</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              築起堅實基石，<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-stone-100 to-amber-400">
                傳承卓越品質
              </span>
            </h1>

            {/* Concrete Value Description */}
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
              東南水泥股份有限公司專注生產 <strong>CNS 61 一型卜特蘭水泥</strong> 與 <strong>CNS 12549 水淬高爐石粉</strong>。自產高品位熟料，配合精密立磨與電腦化均質儲庫；自營散裝槽車車隊全天候提料直配，為您的工程與混凝土配比提供無懈可擊的穩定保證。
            </p>

            {/* Key Advantages Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl backdrop-blur-sm">
                <div className="text-xs text-stone-400">CNS 61 一型水泥</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">28天強度達 49.8 MPa</div>
              </div>
              <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl backdrop-blur-sm">
                <div className="text-xs text-stone-400">CNS 12549 爐石粉</div>
                <div className="text-sm font-bold text-stone-200 mt-0.5">微粒活性指數 108%</div>
              </div>
              <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xl backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="text-xs text-stone-400">散裝氣送物流</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">24H 槽車排班過磅直送</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="hero-quote-btn"
                onClick={() => handleStartQuote()}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>立即索取大宗採購報價</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-products-btn"
                onClick={() => setActivePage('products')}
                className="px-6 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-semibold text-sm sm:text-base rounded-xl border border-stone-700 hover:border-stone-500 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <span>檢視水泥與爐石粉規格</span>
              </button>

              <button
                id="hero-share-btn"
                onClick={() => setIsShareModalOpen(true)}
                className="px-4 py-3.5 text-stone-400 hover:text-stone-200 text-xs font-medium rounded-xl border border-stone-800 hover:border-stone-700 bg-stone-950/60 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                title="分享至 Threads / FB"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>分享</span>
              </button>
            </div>

            <p className="text-xs text-stone-400 flex items-center gap-2 pt-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>全批次附帶經濟部標準檢驗局 CNS 正字標記與 TAF 認證實驗室出廠檢驗成績書</span>
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences Dedicated Services (混凝土廠 vs 建材行) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
            客製化採購方案
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            精準滿足預拌混凝土廠與建材行的採購需求
          </h2>
          <p className="text-sm text-stone-600">
            依據不同的施工工法、儲槽設備與物流卸料限制，提供最經濟且穩健的高品質供料方案。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Box 1: Ready-Mix Concrete Plants */}
          <div className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-stone-900 text-amber-400">
                <Factory className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600">散裝槽車氣送 · 24H 穩定排班</span>
                <h3 className="text-xl font-bold text-stone-900">預拌混凝土廠專案供應</h3>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              針對預拌廠連續澆置作業，提供標準氣送式密閉槽車直運貴廠水泥筒倉。電腦自動化過磅，配備專利降塵防溢氣閥，避免揚塵與料損。
            </p>

            <ul className="space-y-3 text-xs text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>一型水泥穩定需水量：</strong> 標準稠度變異小，有效維持預拌坍度，減少現場外加劑調整變數</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>水淬高爐石粉配比優化：</strong> 取代率 20%~50%，巨積混凝土水化溫升降低 15℃ 以上</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>即時提供品質證明：</strong> 每批槽車均附出廠條碼與 TAF 試驗成績證明，滿足公共工程稽查</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>高乘載自營車隊：</strong> 備有多組 28~32 噸氣送槽車，大體積澆置日夜連續送達</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">建議包裝：散裝氣送槽車 (單車28噸起)</span>
              <button
                onClick={() => handleStartQuote('prod-cement-type-1')}
                className="text-xs font-bold text-stone-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
              >
                <span>預拌廠大宗詢價</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Box 2: Building Materials Suppliers */}
          <div className="bg-white border border-stone-200 rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-stone-900 text-amber-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600">40kg 防潮包裝 · 棧板熱縮膜封裝</span>
                <h3 className="text-xl font-bold text-stone-900">建材五金行經銷批發</h3>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              專為經銷門市、工程五金行與泥作統包商打造。三層防潮加厚紙袋包裝（40公斤裝），出廠前全棧板熱縮膜完整包覆，防雨防潮，耐儲存易堆疊。
            </p>

            <ul className="space-y-3 text-xs text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>強化防潮密封包裝：</strong> 40公斤/包，50包/棧板（2公噸整），抗摔抗潮，長期庫存不易受潮結塊</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>南部五棧板免運直達：</strong> 高雄、台南、屏東地區滿 5 棧板享有自營卡車專送直達店門口</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>一型水泥＋爐石粉混搭出貨：</strong> 支援袋裝水泥與袋裝/太空包爐石粉彈性混訂</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>長期經銷利潤保護：</strong> 提供具市場競爭力的經銷批發價與定期回饋機制</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">建議包裝：40kg袋裝棧板 (1棧板50包起)</span>
              <button
                onClick={() => handleStartQuote('prod-cement-type-1')}
                className="text-xs font-bold text-stone-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
              >
                <span>建材行經銷洽談</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              主力水泥與爐石粉產品
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              東南水泥核心產品與物理檢驗規格
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              由專業旋窯與高細度立磨研磨，均質儲庫嚴格均化，各項數據全面優於 CNS 國家標準要求。
            </p>
          </div>
          <button
            onClick={() => setActivePage('products')}
            className="text-sm font-bold text-stone-900 hover:text-amber-600 flex items-center gap-1 self-start cursor-pointer group"
          >
            <span>瀏覽完整技術規格比較表</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Product Image & Badges */}
                <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-md border border-amber-500/30 backdrop-blur-sm">
                    {prod.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-stone-950/80 text-stone-300 text-xs px-2.5 py-1 rounded backdrop-blur-sm font-mono">
                    {prod.code}
                  </div>
                </div>

                {/* Product Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900">{prod.name}</h3>
                      <p className="text-xs text-stone-500">{prod.enName}</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-medium">
                      {prod.categoryLabel}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {prod.summary}
                  </p>

                  {/* Highlights Specs Table */}
                  <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
                      關鍵物理指標（TAF實驗室實測）：
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono">
                      {prod.specs.slice(0, 4).map((spec, i) => (
                        <div key={i} className="bg-white p-2 rounded border border-stone-200/60">
                          <span className="text-[10px] text-stone-500 block font-sans">{spec.label}</span>
                          <span className="text-xs font-bold text-stone-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Packaging Options */}
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <span className="font-semibold text-stone-800 block">提供出貨規格：</span>
                    <div className="flex flex-wrap gap-2">
                      {prod.packaging.map((pack, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-stone-100 rounded text-stone-700 font-medium text-[11px]">
                          {pack.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  id={`view-detail-${prod.id}`}
                  onClick={() => handleProductClick(prod.id)}
                  className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                >
                  完整物性報告與規範
                </button>
                <button
                  id={`quote-btn-${prod.id}`}
                  onClick={() => handleStartQuote(prod.id)}
                  className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>索取此產品報價</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Blog & Technical Insights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>Technical Research & Field Reports</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
              工程技術專欄 · 水泥配比與試驗成果
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
              東南水泥研發檢驗中心與品管團隊定期發布實務技術專文，協助混凝土拌合廠克服大體積水化熱與早期強度挑戰。
            </p>
          </div>

          <button
            onClick={() => setActivePage('blog')}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
          >
            <span>瀏覽全部專欄文章</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePage('blog')}
              className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-md transition-all hover:border-amber-400/80 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    {post.publishedDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-medium">作者：{post.author}</span>
                <span className="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  閱讀內文
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-stone-800 p-8 sm:p-14 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              即刻洽詢 · 專屬業務團隊快速報價
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              準備為您的混凝土廠或建材門市建立穩定優質的供料管道？
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              無論是每月數千噸的預拌混凝土廠大宗槽車合約，或是建材五金門市棧板批發，東南水泥業務工程師皆能為您提供最具競爭力的專案報價與配送排程。
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="cta-bottom-quote-btn"
                onClick={() => handleStartQuote()}
                className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>立即填寫大宗供料詢價單</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="cta-bottom-call-btn"
                onClick={() => setActivePage('contact')}
                className="px-6 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm rounded-xl border border-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>查看總公司與調度專線</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
