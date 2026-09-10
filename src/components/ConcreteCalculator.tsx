import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Calculator, ArrowRight, Truck, Package, Check, Info } from 'lucide-react';

interface MixPreset {
  id: string;
  name: string;
  targetStrength: string;
  desc: string;
  cementPerCubicMeter: number; // kg/m³
  slagPerCubicMeter: number; // kg/m³
  slagReplacementRatio: number; // %
}

const MIX_PRESETS: MixPreset[] = [
  {
    id: 'standard_structural',
    name: '常規結構混凝土 (梁柱/樓板)',
    targetStrength: '280 kgf/cm² (4,000 psi)',
    desc: '標準建築結構配比，取代率約 25%，兼顧早強與後期緻密性',
    cementPerCubicMeter: 255,
    slagPerCubicMeter: 85,
    slagReplacementRatio: 25
  },
  {
    id: 'mass_concrete',
    name: '巨積基礎筏基 / 地下連續壁',
    targetStrength: '210 kgf/cm² (3,000 psi)',
    desc: '高爐石粉高取代率 40%，大幅降低大體積水化溫升與收縮裂縫',
    cementPerCubicMeter: 168,
    slagPerCubicMeter: 112,
    slagReplacementRatio: 40
  },
  {
    id: 'high_performance',
    name: '超高層 / 高抗壓耐久混凝土',
    targetStrength: '350~420 kgf/cm² (5,000~6,000 psi)',
    desc: '高強度耐久混凝土，28天與56天抗壓強度表現優越',
    cementPerCubicMeter: 315,
    slagPerCubicMeter: 135,
    slagReplacementRatio: 30
  },
  {
    id: 'marine_harbor',
    name: '海事港灣 / 抗硫酸鹽侵蝕配比',
    targetStrength: '300 kgf/cm² (高抗氯鹽)',
    desc: '爐石粉取代 50%，極佳抗海水氯離子穿透與耐久防蝕壽命',
    cementPerCubicMeter: 175,
    slagPerCubicMeter: 175,
    slagReplacementRatio: 50
  }
];

export const ConcreteCalculator: React.FC = () => {
  const { setActivePage } = useProducts();
  const [selectedPresetId, setSelectedPresetId] = useState<string>('standard_structural');
  const [volumeCubicMeters, setVolumeCubicMeters] = useState<number>(500); // 預設 500 方
  const [userRole, setUserRole] = useState<'ready_mix' | 'building_material'>('ready_mix');
  const [bagCalculatedArea, setBagCalculatedArea] = useState<number>(100); // 坪數

  const activePreset = MIX_PRESETS.find(p => p.id === selectedPresetId) || MIX_PRESETS[0];

  // Calculations for Ready-mix (m³)
  const totalCementKg = activePreset.cementPerCubicMeter * volumeCubicMeters;
  const totalSlagKg = activePreset.slagPerCubicMeter * volumeCubicMeters;
  const totalCementTons = Math.round((totalCementKg / 1000) * 10) / 10;
  const totalSlagTons = Math.round((totalSlagKg / 1000) * 10) / 10;

  // Tanker trips (average 28 tons per tanker trip)
  const cementTankerTrips = Math.ceil(totalCementTons / 28);
  const slagTankerTrips = Math.ceil(totalSlagTons / 28);

  // Calculations for Building Material store (40kg bags)
  // Standard plaster / mortar rule of thumb: ~4.4 bags (40kg) per 坪 for 2cm thickness
  const estimatedBags = Math.ceil(bagCalculatedArea * 4.4);
  const estimatedPallets = Math.ceil(estimatedBags / 50);
  const estimatedBagWeightTons = Math.round((estimatedBags * 40 / 1000) * 10) / 10;

  const handleApplyToQuote = () => {
    setActivePage('contact');
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 text-stone-100 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">工程用料需求與槽車車次試算器</h3>
            <p className="text-xs text-stone-400">專為混凝土廠與建材行規劃，快速估算一型水泥與爐石粉訂購噸數及槽車班次</p>
          </div>
        </div>

        {/* Role switch */}
        <div className="flex bg-stone-950 p-1 rounded-lg border border-stone-800 self-start md:self-auto">
          <button
            onClick={() => setUserRole('ready_mix')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              userRole === 'ready_mix'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            預拌混凝土廠 (方數 m³ 散裝)
          </button>
          <button
            onClick={() => setUserRole('building_material')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              userRole === 'building_material'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            建材行批發 (坪數 / 40kg袋裝)
          </button>
        </div>
      </div>

      {userRole === 'ready_mix' ? (
        /* Ready-mix Plant Calculator */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-2">
                1. 選擇預拌配比工程類型：
              </label>
              <div className="space-y-2">
                {MIX_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedPresetId === preset.id
                        ? 'bg-stone-800 border-amber-500 text-white ring-1 ring-amber-500/50'
                        : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-amber-400">{preset.name}</span>
                      <span className="text-stone-400">{preset.targetStrength}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1">{preset.desc}</p>
                    <div className="text-[11px] text-stone-500 mt-1">
                      配比參考：一型水泥 {preset.cementPerCubicMeter} kg/m³ + 爐石粉 {preset.slagPerCubicMeter} kg/m³ (取代率 {preset.slagReplacementRatio}%)
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-2">
                  2. 預計澆置或標案供料方數 (m³)：
                </label>
                <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="50"
                      max="100000"
                      step="50"
                      value={volumeCubicMeters}
                      onChange={(e) => setVolumeCubicMeters(Math.max(10, Number(e.target.value)))}
                      className="bg-stone-900 border border-stone-700 rounded-lg px-4 py-2.5 text-lg font-bold text-amber-400 w-36 focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-sm font-semibold text-stone-300">立方公尺 (方 / m³)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[100, 300, 500, 1000, 3000, 5000].map(val => (
                      <button
                        key={val}
                        onClick={() => setVolumeCubicMeters(val)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                          volumeCubicMeters === val 
                            ? 'bg-amber-500 text-stone-950 font-bold border-amber-500' 
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {val} m³
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ready-mix Calculation Results */}
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-3">
                <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-400" />
                  估算訂單規格與槽車調度排班：
                </span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-stone-900/80 rounded-lg border border-stone-800">
                    <div className="text-[11px] text-stone-400">一型水泥 (SEC-CEM-01)</div>
                    <div className="text-xl font-bold text-amber-400 mt-1">{totalCementTons} <span className="text-xs font-normal text-stone-300">公噸</span></div>
                    <div className="text-[11px] text-stone-500 mt-0.5">約需 {cementTankerTrips} 車次 (28T槽車)</div>
                  </div>

                  <div className="p-3 bg-stone-900/80 rounded-lg border border-stone-800">
                    <div className="text-[11px] text-stone-400">水淬高爐石粉 (GGBS)</div>
                    <div className="text-xl font-bold text-stone-200 mt-1">{totalSlagTons} <span className="text-xs font-normal text-stone-300">公噸</span></div>
                    <div className="text-[11px] text-stone-500 mt-0.5">約需 {slagTankerTrips} 車次 (28T槽車)</div>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 bg-stone-900 p-2.5 rounded-lg flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>東南水泥具備自營散裝槽車車隊，可依貴廠澆置時間表提供 24H 連續排班過磅直送。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Building Material Shop Calculator */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-stone-300 block">
                預估工程泥作地坪/砌磚面積（坪數）：
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="5"
                  max="10000"
                  step="10"
                  value={bagCalculatedArea}
                  onChange={(e) => setBagCalculatedArea(Math.max(1, Number(e.target.value)))}
                  className="bg-stone-950 border border-stone-700 rounded-lg px-4 py-2.5 text-lg font-bold text-amber-400 w-36 focus:outline-none focus:border-amber-500"
                />
                <span className="text-sm font-semibold text-stone-300">坪 (約 {Math.round(bagCalculatedArea * 3.305)} m²)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[30, 50, 100, 200, 500].map(p => (
                  <button
                    key={p}
                    onClick={() => setBagCalculatedArea(p)}
                    className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                      bagCalculatedArea === p 
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-500' 
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {p} 坪
                  </button>
                ))}
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                以常態泥作打底 1:3 水泥砂漿（厚度約 2cm）或建材行常態門市備料週期估算。
              </p>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-3">
              <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-400" />
                建議經銷進貨規格：
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-stone-900 rounded-lg">
                  <div className="text-[11px] text-stone-400">總袋數</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">{estimatedBags} 包</div>
                  <div className="text-[10px] text-stone-500">40kg/包</div>
                </div>
                <div className="p-3 bg-stone-900 rounded-lg">
                  <div className="text-[11px] text-stone-400">棧板數</div>
                  <div className="text-lg font-bold text-stone-200 mt-1">{estimatedPallets} 棧板</div>
                  <div className="text-[10px] text-stone-500">50包/棧 (2噸)</div>
                </div>
                <div className="p-3 bg-stone-900 rounded-lg">
                  <div className="text-[11px] text-stone-400">總總重</div>
                  <div className="text-lg font-bold text-stone-200 mt-1">{estimatedBagWeightTons} 噸</div>
                  <div className="text-[10px] text-stone-500">熱縮膜防潮封裝</div>
                </div>
              </div>
              <p className="text-xs text-stone-400">
                建材行經銷出貨滿 5 棧板享有高雄/台南/屏東專車免運直達貴店。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action footer */}
      <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-stone-400">
          如需特殊工程巨積配比模擬或水化熱抑制作業，歡迎聯繫東南水泥技術品管研發中心。
        </div>
        <button
          id="calculator-apply-quote-btn"
          onClick={handleApplyToQuote}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <span>立即索取大宗報價單</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
