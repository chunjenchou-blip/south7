import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  Building2, 
  Send, 
  FileSpreadsheet, 
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { COMPANY_LOCATIONS, PROCUREMENT_FAQS } from '../data/initialProducts';
import { CustomerCategory, PackagingType } from '../types';

export const ContactView: React.FC = () => {
  const { products, addInquiry, quickQuoteProductId, setQuickQuoteProductId } = useProducts();

  // Form state
  const [customerType, setCustomerType] = useState<CustomerCategory>('ready_mix');
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('高雄市');
  const [deliveryDistrict, setDeliveryDistrict] = useState('');
  const [projectSiteName, setProjectSiteName] = useState('');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('');
  const [hasSiloStorage, setHasSiloStorage] = useState(true);
  const [truckWeightLimit, setTruckWeightLimit] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // Product requirements in inquiry
  const [reqCementTons, setReqCementTons] = useState<number>(100);
  const [cementPkg, setCementPkg] = useState<PackagingType>('tanker_bulk');
  const [includeSlag, setIncludeSlag] = useState(true);
  const [reqSlagTons, setReqSlagTons] = useState<number>(50);
  const [slagPkg, setSlagPkg] = useState<PackagingType>('tanker_bulk');

  // Submission feedback
  const [submittedInquiryNumber, setSubmittedInquiryNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // FAQ accordion state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Pre-fill if quickQuoteProductId was set
  useEffect(() => {
    if (quickQuoteProductId) {
      if (quickQuoteProductId === 'prod-slag-powder') {
        setIncludeSlag(true);
      }
      setQuickQuoteProductId(null);
    }
  }, [quickQuoteProductId, setQuickQuoteProductId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!companyName.trim()) {
      setErrorMsg('請輸入貴公司或行號名稱');
      return;
    }
    if (!contactPerson.trim()) {
      setErrorMsg('請輸入採購聯絡人姓名');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('請輸入聯絡電話或手機以利專員報價');
      return;
    }

    const productRequests = [];
    if (reqCementTons > 0) {
      productRequests.push({
        productId: 'prod-cement-type-1',
        productName: '一型卜特蘭水泥',
        packaging: cementPkg,
        quantityTons: reqCementTons
      });
    }
    if (includeSlag && reqSlagTons > 0) {
      productRequests.push({
        productId: 'prod-slag-powder',
        productName: '水淬高爐石粉 (爐石粉)',
        packaging: slagPkg,
        quantityTons: reqSlagTons
      });
    }

    if (productRequests.length === 0) {
      setErrorMsg('請至少填寫一項水泥或爐石粉預計需求噸數');
      return;
    }

    const inqNumber = addInquiry({
      customerType,
      companyName,
      taxId,
      contactPerson,
      phone,
      email,
      deliveryCity,
      deliveryDistrict,
      projectSiteName,
      productRequests,
      targetDeliveryDate: targetDeliveryDate || '儘速排程供料',
      hasSiloStorage,
      truckWeightLimit,
      specialRequirements
    });

    setSubmittedInquiryNumber(inqNumber);
    // Reset inputs
    setProjectSiteName('');
    setSpecialRequirements('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
          <span>業務採購與調度中心</span>
          <span className="text-stone-300">/</span>
          <span>大宗供料詢價</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          聯絡東南水泥 · 索取大宗專案報價
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          歡迎預拌混凝土廠、建材五金經銷行、大型營造公共工程主管單位填寫下方詢價表單。業務處專案經理將於收到表單後 <strong>2 小時內</strong> 與您電話接洽，提供最新出廠報價單與槽車排程規劃。
        </p>
      </div>

      {/* Main layout: Left is Inquiry Form, Right is Hubs & Dispatch info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Inquiry Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 sm:p-9 shadow-sm">
          
          {submittedInquiryNumber ? (
            /* Submission Success State */
            <div className="py-8 space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">詢價單已成功送出</span>
                <h3 className="text-2xl font-bold text-stone-900">感謝貴公司的採購洽詢</h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  系統已為您建立專屬業務單號，並即時同步至本公司業務調度系統。業務主管將儘速與貴公司聯絡人確認報價與送貨排程。
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                  <span className="text-stone-500">詢價追蹤編號：</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">{submittedInquiryNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">洽詢客戶行號：</span>
                  <span className="font-semibold text-stone-800">{companyName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">送達目的地：</span>
                  <span className="text-stone-800">{deliveryCity} {deliveryDistrict}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setSubmittedInquiryNumber(null)}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  填寫另一筆詢價單
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-amber-600" />
                  預拌混凝土廠 / 建材行 專屬大宗採購單
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  請填寫貴公司需求，我們將提供最適宜的運費方案、槽車班次與大宗折扣。
                </p>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Customer Category */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-2">
                  1. 貴公司所屬產業類別：
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'ready_mix', label: '預拌混凝土廠' },
                    { id: 'building_material', label: '建材行 / 五金批發' },
                    { id: 'contractor', label: '營造廠 / 基礎工程' },
                    { id: 'precast_concrete', label: '預力預鑄水泥製品廠' },
                    { id: 'other', label: '其他工程單位' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCustomerType(cat.id as CustomerCategory)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                        customerType === cat.id
                          ? 'bg-stone-900 text-amber-400 border-stone-900 shadow-sm font-bold'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Company & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    公司/行號全稱 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：統亞預拌混凝土 (仁武廠)"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    統一編號 (選填)
                  </label>
                  <input
                    type="text"
                    placeholder="8 碼統編"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    採購聯絡人姓名與職稱 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：陳建宏 廠長 / 經理"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    聯絡電話 / 手機 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="例如：07-3718899 / 0918-xxx-xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    電子信箱 (E-mail，接收報價單專用)
                  </label>
                  <input
                    type="email"
                    placeholder="例如：procurement@yourcompany.com.tw"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* 3. Products and Quantities */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-4">
                <span className="text-xs font-bold text-stone-800 block">
                  3. 預計採購產品與噸數：
                </span>

                {/* Cement */}
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-900">一型卜特蘭水泥 (CNS 61)</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={cementPkg}
                        onChange={(e) => setCementPkg(e.target.value as PackagingType)}
                        className="bg-stone-50 border border-stone-200 rounded-lg text-xs px-2.5 py-1 text-stone-700"
                      >
                        <option value="tanker_bulk">散裝槽車氣送 (25~32T)</option>
                        <option value="bag_40kg">40kg 袋裝棧板 (50包/棧)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500">預計需求量：</span>
                    <input
                      type="number"
                      min="0"
                      step="5"
                      value={reqCementTons}
                      onChange={(e) => setReqCementTons(Number(e.target.value))}
                      className="w-28 bg-stone-50 border border-stone-300 rounded-lg px-3 py-1 text-xs font-bold text-stone-900 text-right"
                    />
                    <span className="text-xs text-stone-600 font-medium">公噸 (Tons)</span>
                  </div>
                </div>

                {/* Slag Powder */}
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSlag}
                        onChange={(e) => setIncludeSlag(e.target.checked)}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                      />
                      <span className="text-xs font-bold text-stone-900">水淬高爐石粉 (CNS 12549 100級)</span>
                    </label>
                    {includeSlag && (
                      <select
                        value={slagPkg}
                        onChange={(e) => setSlagPkg(e.target.value as PackagingType)}
                        className="bg-stone-50 border border-stone-200 rounded-lg text-xs px-2.5 py-1 text-stone-700"
                      >
                        <option value="tanker_bulk">散裝槽車氣送 (25~32T)</option>
                        <option value="bag_40kg">40kg 袋裝 / 1噸太空包</option>
                      </select>
                    )}
                  </div>
                  {includeSlag && (
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs text-stone-500">預計需求量：</span>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={reqSlagTons}
                        onChange={(e) => setReqSlagTons(Number(e.target.value))}
                        className="w-28 bg-stone-50 border border-stone-300 rounded-lg px-3 py-1 text-xs font-bold text-stone-900 text-right"
                      />
                      <span className="text-xs text-stone-600 font-medium">公噸 (Tons)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Delivery Location and Site conditions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    送達縣市
                  </label>
                  <select
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  >
                    {['高雄市', '台南市', '屏東縣', '嘉義縣市', '台中市', '彰化縣', '雲林縣', '新竹苗栗', '台北新北桃園', '宜花東地區'].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    鄉鎮市區 / 工地名稱
                  </label>
                  <input
                    type="text"
                    placeholder="例如：仁武廠區 / 楠梓園區工區"
                    value={deliveryDistrict}
                    onChange={(e) => setDeliveryDistrict(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    廠區是否具備立體密閉水泥儲倉？
                  </label>
                  <div className="flex gap-4 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasSilo"
                        checked={hasSiloStorage === true}
                        onChange={() => setHasSiloStorage(true)}
                      />
                      <span>具備（可供散裝氣送槽車直接接管吹料）</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasSilo"
                        checked={hasSiloStorage === false}
                        onChange={() => setHasSiloStorage(false)}
                      />
                      <span>無（需以袋裝棧板或卡車配送卸料）</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    其他特殊需求或物性報告備註 (選填)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="例如：需隨車附 TAF 批次檢驗報告正本、現場路寬限重 15 噸、夜間連續澆置排車等..."
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-inquiry-btn"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>送出大宗採購詢價單（專案主管專人回覆）</span>
              </button>

              <div className="text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>您的資料將受到東南水泥嚴格保密，僅用於大宗水泥供料報價與排車洽詢。</span>
              </div>
            </form>
          )}

        </div>

        {/* Operating Hubs & Direct Hotlines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 24H Tanker Dispatch Box */}
          <div className="bg-stone-900 text-white border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  發貨總站 06:00 - 16:00
                </span>
                <h3 className="text-xl font-bold text-white">散裝槽車調度直撥專線</h3>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              預拌廠若遇大體積連續澆置、巨積連續壁施工追加用料，請直接撥打高雄港發貨站調度台，即時安排槽車過磅發車。
            </p>

            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">高雄港發貨站專線：</span>
                <span className="text-emerald-400 font-mono font-bold text-lg">(07) 822-7070</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">總公司代表號：</span>
                <span className="text-amber-400 font-mono font-semibold text-sm">(07) 271-1121</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-400">總公司傳真號碼：</span>
                <span className="text-stone-300 font-mono text-xs">(07) 271-1125</span>
              </div>
            </div>
          </div>

          {/* Plant & Sales Hubs List */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              全台主要營業據點與聯絡處
            </h3>

            <div className="space-y-3 divide-y divide-stone-100">
              {COMPANY_LOCATIONS.map((loc, idx) => (
                <div key={idx} className="pt-3 first:pt-0 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">{loc.name}</span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{loc.type}</span>
                  </div>
                  <div className="text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="text-stone-700 font-mono flex items-center gap-1">
                    <PhoneCall className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion Preview */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              採購與槽車配送常見問答 (FAQ)
            </h3>

            <div className="space-y-2">
              {PROCUREMENT_FAQS.map((faq, i) => (
                <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(expandedFaqIndex === i ? null : i)}
                    className="w-full text-left p-3 text-xs font-bold text-stone-800 bg-stone-50 hover:bg-stone-100 flex items-center justify-between cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      className={`w-4 h-4 text-stone-500 transition-transform ${
                        expandedFaqIndex === i ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {expandedFaqIndex === i && (
                    <div className="p-3.5 text-xs text-stone-600 bg-white border-t border-stone-100 leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
