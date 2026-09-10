import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  FileSpreadsheet, 
  Package, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  X, 
  Save, 
  Truck, 
  Phone, 
  Building2,
  Layers,
  Filter,
  Eye,
  Calendar,
  BookOpen,
  Users,
  History,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Product, CustomerInquiry, PackagingType } from '../types';
import { BlogManagerTab } from './admin/BlogManagerTab';
import { StaffManagerTab } from './admin/StaffManagerTab';
import { AuditLogsTab } from './admin/AuditLogsTab';

export const AdminView: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    blogPosts,
    staffMembers,
    auditLogs,
    currentOperator,
    setCurrentOperator,
    setActivePage,
    setSelectedProductId
  } = useProducts();

  const [activeTab, setActiveTab] = useState<'products' | 'inquiries' | 'blog' | 'staff' | 'audit'>('products');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState<string>('all');

  // Product Form State
  const [formName, setFormName] = useState('');
  const [formEnName, setFormEnName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formCategory, setFormCategory] = useState<'cement' | 'slag' | 'specialty'>('cement');
  const [formBadge, setFormBadge] = useState('CNS 61 國家標準認證');
  const [formCnsStandard, setFormCnsStandard] = useState('CNS 61 一型 / ASTM C150');
  const [formSummary, setFormSummary] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStockStatus, setFormStockStatus] = useState<'stable_supply' | 'limited' | 'custom_order'>('stable_supply');
  const [formLeadTime, setFormLeadTime] = useState('散裝槽車下單後 4～24 小時內送達指定廠區');
  const [formFeatures, setFormFeatures] = useState<string>('28天抗壓強度平均達 49.8 MPa\n水化熱適中，水化均勻\n標準稠度用水量穩定');
  const [formApplications, setFormApplications] = useState<string>('預拌混凝土廠一般結構用料\n高速公路與捷運工程\n建材行經銷批發');
  const [formImage, setFormImage] = useState('/src/assets/images/sec_cement_type1_1789005287685.jpg');

  // Specs state for the form
  const [formSpecs, setFormSpecs] = useState([
    { label: '比表面積 (Blaine 研磨細度)', value: '3,650 cm²/g', standardReq: 'CNS ≥ 2,800 cm²/g' },
    { label: '初凝時間 (Vicat 凝結試驗)', value: '135 分鐘', standardReq: 'CNS ≥ 45 分鐘' },
    { label: '終凝時間 (Vicat 凝結試驗)', value: '240 分鐘', standardReq: 'CNS ≤ 375 分鐘' },
    { label: '28天 膠砂抗壓強度', value: '49.8 MPa', standardReq: 'CNS ≥ 28.0 MPa' }
  ]);

  const openEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormEnName(prod.enName);
    setFormCode(prod.code);
    setFormCategory(prod.category);
    setFormBadge(prod.badge);
    setFormCnsStandard(prod.cnsStandard);
    setFormSummary(prod.summary);
    setFormDescription(prod.description);
    setFormStockStatus(prod.stockStatus);
    setFormLeadTime(prod.leadTime);
    setFormFeatures(prod.keyFeatures.join('\n'));
    setFormApplications(prod.applications.join('\n'));
    setFormImage(prod.image);
    setFormSpecs(prod.specs.length > 0 ? prod.specs : [
      { label: '比表面積 (Blaine)', value: '3,650 cm²/g', standardReq: 'CNS ≥ 2,800 cm²/g' },
      { label: '28天 抗壓強度', value: '49.8 MPa', standardReq: 'CNS ≥ 28.0 MPa' }
    ]);
  };

  const resetForm = () => {
    setEditingProductId(null);
    setIsAddProductOpen(false);
    setFormName('');
    setFormEnName('');
    setFormCode('');
    setFormSummary('');
    setFormDescription('');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const featureList = formFeatures.split('\n').map(s => s.trim()).filter(Boolean);
    const appList = formApplications.split('\n').map(s => s.trim()).filter(Boolean);

    const categoryLabelMap = {
      cement: '卜特蘭水泥系列',
      slag: '水淬高爐石粉',
      specialty: '特種工程水泥'
    };

    const stockStatusLabelMap = {
      stable_supply: '正常大宗供料中（槽車即時排班）',
      limited: '排單生產供應中',
      custom_order: '專案客製化試拌'
    };

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formName,
        enName: formEnName || formName,
        code: formCode || 'SEC-PROD',
        category: formCategory,
        categoryLabel: categoryLabelMap[formCategory],
        badge: formBadge,
        cnsStandard: formCnsStandard,
        summary: formSummary,
        description: formDescription,
        stockStatus: formStockStatus,
        stockStatusLabel: stockStatusLabelMap[formStockStatus],
        leadTime: formLeadTime,
        keyFeatures: featureList,
        applications: appList,
        image: formImage,
        specs: formSpecs
      });
    } else {
      addProduct({
        name: formName,
        enName: formEnName || formName,
        code: formCode || `SEC-PROD-${Date.now().toString().slice(-4)}`,
        category: formCategory,
        categoryLabel: categoryLabelMap[formCategory],
        badge: formBadge,
        cnsStandard: formCnsStandard,
        summary: formSummary,
        description: formDescription,
        image: formImage,
        stockStatus: formStockStatus,
        stockStatusLabel: stockStatusLabelMap[formStockStatus],
        leadTime: formLeadTime,
        keyFeatures: featureList,
        applications: appList,
        specs: formSpecs,
        packaging: [
          {
            type: 'tanker_bulk',
            label: '散裝氣送槽車 (Bulk Tanker)',
            description: '專業氣送式密閉槽車直運，單車裝載量約 25～32 噸。',
            minOrder: '單趟 25 噸起'
          },
          {
            type: 'bag_40kg',
            label: '40kg 強化防潮袋裝 (Bagged)',
            description: '每棧板 50 包（2公噸），覆蓋防水熱縮膜保護。',
            minOrder: '1 棧板（50包 / 2噸）起'
          }
        ],
        certifications: ['CNS 國家檢驗合格', 'TAF 出廠品質試驗成績單']
      });
    }

    resetForm();
  };

  const filteredInquiries = inquiryFilterStatus === 'all'
    ? inquiries
    : inquiries.filter(i => i.status === inquiryFilterStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-stone-900 text-amber-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-stone-900">東南水泥 · 夥伴營運管理後台</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                產品增減 / 訂單管理
              </span>
            </div>
            <p className="text-xs text-stone-500">
              讓夥伴輕鬆增減、編輯一型水泥與爐石粉等產品規格，並即時查閱處理客戶詢價訂單。
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-stone-600 hidden sm:inline">當前操作者：</span>
            <select
              value={currentOperator.id}
              onChange={(e) => {
                const found = staffMembers.find(s => s.id === e.target.value);
                if (found) setCurrentOperator(found);
              }}
              className="bg-transparent font-bold text-stone-900 focus:outline-none cursor-pointer text-xs"
              title="切換後台操作同仁身分，操作日誌將自動記錄此人名義"
            >
              {staffMembers.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} ({staff.employeeId} · {staff.department})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setActivePage('products')}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>前台預覽</span>
          </button>
          <button
            onClick={() => setActivePage('home')}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>官網首頁</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 gap-2">
        <div className="flex flex-wrap gap-1 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap px-1 ${
              activeTab === 'products'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>產品資訊 ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap px-1 ${
              activeTab === 'inquiries'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>採購詢價單 ({inquiries.length})</span>
            {inquiries.filter(i => i.status === 'pending').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {inquiries.filter(i => i.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap px-1 ${
              activeTab === 'blog'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>技術專欄文章 ({blogPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap px-1 ${
              activeTab === 'staff'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>人員權限管理 ({staffMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap px-1 ${
              activeTab === 'audit'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <History className="w-4 h-4" />
            <span>操作日誌 ({auditLogs.length})</span>
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={() => {
                resetForm();
                setIsAddProductOpen(true);
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>新增產品規格</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('確定要將產品資料重設回復為預設的一型水泥與高爐石粉標準資料嗎？')) {
                  resetProductsToDefault();
                }
              }}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-medium rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
              title="重設為預設產品"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">重設預設值</span>
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Product Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          
          {/* Modal / Inline Editor for Adding or Editing Product */}
          {(isAddProductOpen || editingProductId) && (
            <div className="bg-white border-2 border-amber-500/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-100 text-amber-800">
                    {editingProductId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {editingProductId ? '編輯產品資訊與物性規格' : '新增水泥 / 礦物粉體產品'}
                    </h3>
                    <p className="text-xs text-stone-500">更新後將即時同步於前台官網首頁與產品詳細介紹頁面</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      產品中文名稱 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="例如：一型卜特蘭水泥"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      英文名稱
                    </label>
                    <input
                      type="text"
                      placeholder="例如：Type I Portland Cement"
                      value={formEnName}
                      onChange={(e) => setFormEnName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      產品編號代碼
                    </label>
                    <input
                      type="text"
                      placeholder="例如：SEC-CEM-01"
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      產品類別
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    >
                      <option value="cement">卜特蘭水泥系列</option>
                      <option value="slag">水淬高爐石粉系列</option>
                      <option value="specialty">特種/抗硫酸鹽系列</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      認證標章文字 (Badge)
                    </label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      國家檢驗標準
                    </label>
                    <input
                      type="text"
                      value={formCnsStandard}
                      onChange={(e) => setFormCnsStandard(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      產品摘要 (卡片重點簡述)
                    </label>
                    <input
                      type="text"
                      placeholder="簡潔介紹此產品特點..."
                      value={formSummary}
                      onChange={(e) => setFormSummary(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      供料狀態
                    </label>
                    <select
                      value={formStockStatus}
                      onChange={(e) => setFormStockStatus(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    >
                      <option value="stable_supply">正常大宗供料中（槽車即時排班）</option>
                      <option value="limited">排單生產中</option>
                      <option value="custom_order">專案特訂試拌</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      詳細說明與技術配比原理
                    </label>
                    <textarea
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      核心特點 (每行一項)
                    </label>
                    <textarea
                      rows={3}
                      value={formFeatures}
                      onChange={(e) => setFormFeatures(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      適用工程與客群 (每行一項)
                    </label>
                    <textarea
                      rows={3}
                      value={formApplications}
                      onChange={(e) => setFormApplications(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      產品展示圖片路徑
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setFormImage('/src/assets/images/sec_cement_type1_1789005287685.jpg')}
                        className="px-3 py-1 bg-stone-100 text-stone-700 text-xs rounded-lg hover:bg-stone-200"
                      >
                        使用一型水泥圖
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormImage('/src/assets/images/sec_slag_powder_1789004312307.jpg')}
                        className="px-3 py-1 bg-stone-100 text-stone-700 text-xs rounded-lg hover:bg-stone-200"
                      >
                        使用爐石粉圖
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>儲存並同步至前台</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Cards Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={prod.image} 
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-xl border border-stone-200" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-bold">
                          {prod.code}
                        </span>
                        <span className="text-xs text-stone-400">{prod.cnsStandard}</span>
                      </div>
                      <h4 className="text-lg font-bold text-stone-900 mt-0.5">{prod.name}</h4>
                      <p className="text-xs text-stone-500">{prod.enName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditProduct(prod)}
                      className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer"
                      title="編輯此產品"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {products.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm(`確定要刪除「${prod.name}」嗎？`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                        title="刪除此產品"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {prod.summary}
                </p>

                <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[11px]">類別：</span>
                    <span className="font-medium text-stone-800">{prod.categoryLabel}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">供料狀態：</span>
                    <span className="font-medium text-emerald-700">{prod.stockStatusLabel}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
                  <span>修訂日期：{prod.updatedAt}</span>
                  <button
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      setActivePage('products');
                    }}
                    className="text-amber-600 font-bold hover:underline cursor-pointer"
                  >
                    前台物性報告 &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: Inquiries Management */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-semibold text-stone-600">狀態篩選：</span>
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: '全部詢價單' },
                  { id: 'pending', label: '待回覆' },
                  { id: 'quoted', label: '已提供報價' },
                  { id: 'in_delivery', label: '槽車排程中' },
                  { id: 'completed', label: '已完成結案' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setInquiryFilterStatus(st.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      inquiryFilterStatus === st.id
                        ? 'bg-stone-900 text-white font-bold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-stone-400">共 {filteredInquiries.length} 筆客戶詢價記錄</span>
          </div>

          <div className="space-y-4">
            {filteredInquiries.map((inq) => (
              <div 
                key={inq.id}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4"
              >
                {/* Inquiry Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      {inq.inquiryNumber}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {inq.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500">更新狀態：</span>
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                      className={`text-xs font-bold px-3 py-1 rounded-lg border cursor-pointer ${
                        inq.status === 'pending'
                          ? 'bg-rose-50 border-rose-300 text-rose-700'
                          : inq.status === 'quoted'
                          ? 'bg-amber-50 border-amber-300 text-amber-800'
                          : inq.status === 'in_delivery'
                          ? 'bg-blue-50 border-blue-300 text-blue-800'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      }`}
                    >
                      <option value="pending">新送出詢價（待業務接洽）</option>
                      <option value="quoted">已提供業務報價單</option>
                      <option value="in_delivery">槽車排程供料中</option>
                      <option value="completed">已完成採購結案</option>
                    </select>

                    <button
                      onClick={() => {
                        if (window.confirm('確定要刪除這筆詢價記錄嗎？')) {
                          deleteInquiry(inq.id);
                        }
                      }}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded cursor-pointer"
                      title="刪除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Company & Request details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="text-stone-400 text-[11px]">採購廠商與聯絡人：</div>
                    <div className="font-bold text-stone-900 text-sm">{inq.companyName}</div>
                    {inq.taxId && <div className="font-mono text-stone-500">統編：{inq.taxId}</div>}
                    <div className="text-stone-700 font-medium">{inq.contactPerson}</div>
                    <div className="text-stone-800 font-mono flex items-center gap-1">
                      <Phone className="w-3 h-3 text-stone-400" />
                      <span>{inq.phone}</span>
                    </div>
                    {inq.email && <div className="text-stone-500">{inq.email}</div>}
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-stone-400 text-[11px]">送達工地與工程資訊：</div>
                    <div className="text-stone-800 font-medium">
                      目的地：{inq.deliveryCity} {inq.deliveryDistrict}
                    </div>
                    {inq.projectSiteName && (
                      <div className="text-stone-600">工程標案：{inq.projectSiteName}</div>
                    )}
                    <div className="text-stone-600">
                      儲倉條件：{inq.hasSiloStorage ? '具備密閉式水泥儲倉 (可槽車氣送)' : '無儲倉 (需袋裝棧板)'}
                    </div>
                    <div className="text-stone-500">
                      預計交期：{inq.targetDeliveryDate}
                    </div>
                  </div>

                  <div className="space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                    <div className="text-stone-500 font-semibold text-[11px]">需求產品規格：</div>
                    {inq.productRequests.map((req, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-stone-800">{req.productName}</span>
                        <span className="font-mono font-bold text-amber-700">{req.quantityTons} 噸 ({req.packaging === 'tanker_bulk' ? '散裝槽車' : '袋裝'})</span>
                      </div>
                    ))}
                    {inq.specialRequirements && (
                      <div className="pt-2 border-t border-stone-200 text-stone-600 text-[11px]">
                        <strong>特殊備註：</strong>{inq.specialRequirements}
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes Input */}
                <div className="pt-2 flex items-center gap-2 text-xs">
                  <span className="text-stone-400 shrink-0">內部備註：</span>
                  <input
                    type="text"
                    placeholder="點擊輸入業務跟進進度（如：已電話提供每噸報價、預計9/15試車排班）..."
                    value={inq.notes || ''}
                    onChange={(e) => updateInquiryStatus(inq.id, inq.status, e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            ))}

            {filteredInquiries.length === 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400 space-y-2">
                <FileSpreadsheet className="w-8 h-8 mx-auto text-stone-300" />
                <p className="text-sm">目前沒有此狀態的詢價記錄</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 3: Technical Blog Posts Management */}
      {activeTab === 'blog' && (
        <BlogManagerTab />
      )}

      {/* Tab 4: Staff & Permissions Management */}
      {activeTab === 'staff' && (
        <StaffManagerTab />
      )}

      {/* Tab 5: Audit Logs & Security Trail */}
      {activeTab === 'audit' && (
        <AuditLogsTab />
      )}

    </div>
  );
};
