import { Product, CustomerInquiry, BlogPost, StaffMember, AuditLog } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-cement-type-1',
    code: 'SEC-CEM-01',
    name: '一型卜特蘭水泥',
    enName: 'Type I Portland Cement',
    category: 'cement',
    categoryLabel: '卜特蘭水泥系列',
    badge: 'CNS 61 正字標記認證',
    cnsStandard: 'CNS 61 一型 / ASTM C150 Type I',
    summary: '高強度發育穩定、水化均勻，為各大預拌混凝土廠、重大公共工程及建材經銷行常態性大宗指定用料。',
    description: '東南水泥一型卜特蘭水泥精選高品位石灰石熟料與適量天然石膏共同研磨而成。具備卓越之早期與晚期抗壓強度發育特徵，水化緻密、需水量穩定，能與各類減水劑及礦物摻料良好相容。自營槽車專線直達預拌廠水泥倉，確保全天候供料不中斷。',
    image: '/src/assets/images/sec_cement_type1_1789005287685.jpg',
    packaging: [
      {
        type: 'tanker_bulk',
        label: '散裝氣送槽車 (Bulk Tanker)',
        description: '專業氣送式密閉槽車直運，單車裝載量約 25～32 噸，直接氣送卸料至預拌廠水泥庫，防雨防潮零損耗。',
        minOrder: '單趟 25 噸起'
      },
      {
        type: 'bag_40kg',
        label: '40kg 強化防潮袋裝 (Bagged Cement)',
        description: '三層牛皮紙加防潮PE膜內袋包裝（40公斤裝），每棧板 50 包（2公噸整），覆蓋防水熱縮膜保護，便於建材行庫存與搬運。',
        minOrder: '1 棧板（50包 / 2噸）起'
      }
    ],
    keyFeatures: [
      '強度發育優異：28天抗壓強度平均達 49.8 MPa，大幅超越 CNS 61 標準（≥ 28.0 MPa）',
      '需水量穩定：標準稠度用水量變異係數小，大幅降低預拌混凝土坍度控制難度',
      '外加劑相容性佳：與市售聚羧酸系高機能減水劑及強塑劑反應溫和，無異常假凝現象',
      '嚴格均質化均化庫：窯磨全電腦化分析儀連線監控，保證批次間色澤與物理性能高度一致'
    ],
    specs: [
      { label: '比表面積 (Blaine 研磨細度)', value: '3,650 cm²/g', standardReq: 'CNS ≥ 2,800 cm²/g' },
      { label: '初凝時間 (Vicat 凝結試驗)', value: '135 分鐘', standardReq: 'CNS ≥ 45 分鐘' },
      { label: '終凝時間 (Vicat 凝結試驗)', value: '240 分鐘', standardReq: 'CNS ≤ 375 分鐘' },
      { label: '壓蒸膨脹率 (健全性)', value: '0.08 %', standardReq: 'CNS ≤ 0.80 %' },
      { label: '3天 膠砂抗壓強度', value: '26.5 MPa', standardReq: 'CNS ≥ 12.0 MPa' },
      { label: '7天 膠砂抗壓強度', value: '36.2 MPa', standardReq: 'CNS ≥ 19.0 MPa' },
      { label: '28天 膠砂抗壓強度', value: '49.8 MPa', standardReq: 'CNS ≥ 28.0 MPa' },
      { label: '燒失量 (Loss on Ignition)', value: '1.60 %', standardReq: 'CNS ≤ 3.00 %' },
      { label: '三氧化硫 (SO₃)', value: '2.40 %', standardReq: 'CNS ≤ 3.00 %' },
      { label: '氧化鎂 (MgO)', value: '2.85 %', standardReq: 'CNS ≤ 6.00 %' }
    ],
    applications: [
      '預拌混凝土廠一般常態性結構混凝土（210～420 kgf/cm² 各標號配比）',
      '公共工程：高速公路、高架橋墩、隧道襯砌、軌道基磐',
      '大樓建築基礎筏基、地下連續壁、逆打工法結構體',
      '預力預鑄水泥製品廠（RC涵管、水泥基樁、預力箱型梁）',
      '建材行經銷批發：泥作粉光、砌磚打底、地坪鋪面與家庭修繕'
    ],
    stockStatus: 'stable_supply',
    stockStatusLabel: '正常大宗供料中（槽車即時排班）',
    leadTime: '散裝槽車下單後 4～24 小時內送達指定廠區；袋裝棧板隔日配送',
    certifications: [
      '經濟部標檢局 CNS 61 正字標記第 0003 號',
      'ISO 9001:2015 品質管理系統驗證',
      'TAF 認證實驗室批次出廠檢驗證明',
      '台灣綠建材環保認證評定'
    ],
    pdfSpecName: 'SEC-Type1-Cement-Specification-Report.pdf',
    updatedAt: '2026-09-01'
  },
  {
    id: 'prod-slag-powder',
    code: 'SEC-SLG-100',
    name: '水淬高爐石粉 (爐石粉)',
    enName: 'Ground Granulated Blast-Furnace Slag (GGBS)',
    category: 'slag',
    categoryLabel: '水淬高爐石粉 / 環保建材',
    badge: 'CNS 12549 100級/120級 規範',
    cnsStandard: 'CNS 12549 100級 / ASTM C989 Grade 100',
    summary: '微結構緻密化、有效降低巨積水化熱、大幅提升長期強度與抗海水/化學侵蝕能力，現代綠色混凝土關鍵摻料。',
    description: '東南水泥生產之水淬高爐石粉，精選優質鋼鐵製程副產物經急冷水淬乾燥後，採用高效率立磨細磨至理想粒徑分布。在預拌混凝土中取代部分一型水泥（通常取代率 20%～50%），可大幅減少水泥水化熱峰值，避免裂縫產生，且二次水化反應生成更緊密的水化矽酸鈣（C-S-H），使硬固混凝土具備卓越抗氯離子穿透與抗硫酸鹽侵蝕性能。',
    image: '/src/assets/images/sec_slag_powder_1789004312307.jpg',
    packaging: [
      {
        type: 'tanker_bulk',
        label: '散裝氣送槽車 (Bulk Tanker)',
        description: '高密封性粉體槽車直配，單車裝載 26～32 噸，直接氣打入混凝土廠之爐石專用筒倉，粉塵零外溢。',
        minOrder: '單趟 25 噸起'
      },
      {
        type: 'bag_40kg',
        label: '40kg 袋裝 / 1噸太空包 (Big Bag)',
        description: '防潮密封紙袋（40公斤裝，每棧板50包）或 1,000kg 強韌吊帶太空包，利於特殊工地配比添加或袋裝建材批發。',
        minOrder: '1 棧板（50包 / 2噸）或 2 只太空包起'
      }
    ],
    keyFeatures: [
      '顯著降低水化熱：延長凝結反應釋熱期，有效杜絕大體積連續壁及厚板基礎溫差收縮裂縫',
      '極致抗腐蝕與抗滲：大幅阻絕水分子、海水氯鹽與土壤硫酸鹽穿透，鋼筋耐久壽命提升2倍以上',
      '長效強度攀升：第56天、90天後期抗壓強度持續增強，超越純一型水泥配比',
      '增加工作度與泵送性：球形微粒滑動滾珠效應，提升新拌混凝土流動度，減少泵送阻力與塞管風險'
    ],
    specs: [
      { label: '比表面積 (Blaine 研磨細度)', value: '4,350 cm²/g', standardReq: 'CNS 100級 ≥ 4,000 cm²/g' },
      { label: '7天 爐石活性指數 (SAI)', value: '82.5 %', standardReq: 'CNS 100級 ≥ 75.0 %' },
      { label: '28天 爐石活性指數 (SAI)', value: '108.2 %', standardReq: 'CNS 100級 ≥ 95.0 %' },
      { label: '比重 (密度)', value: '2.91 g/cm³', standardReq: '一般常態基準 2.85~2.95' },
      { label: '玻璃質含量 (X光繞射)', value: '96.2 %', standardReq: 'CNS 建議 ≥ 90.0 %' },
      { label: '水分含量 (Moisture)', value: '0.12 %', standardReq: 'CNS ≤ 1.00 %' },
      { label: '硫化物硫 (S)', value: '0.82 %', standardReq: 'CNS ≤ 2.50 %' },
      { label: '三氧化硫 (SO₃)', value: '0.25 %', standardReq: 'CNS ≤ 4.00 %' },
      { label: '氯離子含量 (Cl⁻)', value: '0.007 %', standardReq: 'CNS ≤ 0.050 %' }
    ],
    applications: [
      '預拌混凝土廠：低水化熱巨積混凝土（水庫壩體、捷運站體基礎、風機重力基座）',
      '海事與港灣工程：碼頭防波堤、沈箱、沉箱沉樁、高鹽分海岸耐蝕工程',
      '自充填清水混凝土 (SCC) 與超高性能混凝土 (UHPC) 微粉配比',
      '地下連續壁及地質改良灌漿材料',
      '建築產業低碳永續評估（符合低碳水泥製品與綠建築減碳指標）'
    ],
    stockStatus: 'stable_supply',
    stockStatusLabel: '常態庫存充足（立磨專線全產能運作）',
    leadTime: '槽車下單排程後 6～24 小時內配送至廠',
    certifications: [
      '經濟部標準檢驗局 CNS 12549 驗證登錄合格',
      'ISO 14001 環境管理系統認證',
      'ISO 14067 產品碳足跡盤查認證（減碳標籤證明）',
      '公共工程委員會核備優良建材產品'
    ],
    pdfSpecName: 'SEC-GGBS-SlagPowder-TechnicalData.pdf',
    updatedAt: '2026-09-03'
  }
];

export const SAMPLE_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-1001',
    inquiryNumber: 'SEC-20260908-01',
    customerType: 'ready_mix',
    companyName: '統亞預拌混凝土股份有限公司 (仁武廠)',
    taxId: '23456781',
    contactPerson: '陳建宏 廠長',
    phone: '07-371-8899 / 0918-234-567',
    email: 'chen.jh@tongya-concrete.com.tw',
    deliveryCity: '高雄市',
    deliveryDistrict: '仁武區',
    projectSiteName: '台積電楠梓園區二期基礎工程混凝土配比供料',
    productRequests: [
      {
        productId: 'prod-cement-type-1',
        productName: '一型卜特蘭水泥',
        packaging: 'tanker_bulk',
        quantityTons: 600
      },
      {
        productId: 'prod-slag-powder',
        productName: '水淬高爐石粉 (爐石粉)',
        packaging: 'tanker_bulk',
        quantityTons: 400
      }
    ],
    targetDeliveryDate: '2026-09-18',
    hasSiloStorage: true,
    truckWeightLimit: '35噸聯結槽車可正常通行進廠',
    specialRequirements: '需附最新批次TAF檢驗報告正本各一份，前三批每日需四車次連續氣送排程。',
    status: 'quoted',
    statusLabel: '已提供業務報價單',
    createdAt: '2026-09-08 14:22',
    notes: '業務部王襄理已於 9/8 下午完成電話報價與槽車班表確認，等待客戶簽約回傳。'
  },
  {
    id: 'inq-1002',
    inquiryNumber: 'SEC-20260909-02',
    customerType: 'building_material',
    companyName: '大盛建材五金行',
    taxId: '54129876',
    contactPerson: '林世榮 負責人',
    phone: '06-258-3311 / 0932-887-123',
    email: 'dasheng.materials@gmail.com',
    deliveryCity: '台南市',
    deliveryDistrict: '永康區',
    projectSiteName: '永康總倉建材行常態備料門市補貨',
    productRequests: [
      {
        productId: 'prod-cement-type-1',
        productName: '一型卜特蘭水泥',
        packaging: 'bag_40kg',
        quantityTons: 20
      }
    ],
    targetDeliveryDate: '2026-09-12',
    hasSiloStorage: false,
    truckWeightLimit: '門口需具備堆高機卸貨通道，限15噸以內大貨車進出',
    specialRequirements: '一型袋裝水泥共10棧板（40kg裝，每棧50包，共20公噸），請務必包裹嚴實熱縮膜。',
    status: 'pending',
    statusLabel: '新送出詢價（待業務接洽）',
    createdAt: '2026-09-09 10:15',
    notes: '建材行老客戶定期叫料，由高雄營業部以經銷批發優惠價接單。'
  }
];

export const COMPANY_LOCATIONS = [
  {
    name: '高雄總公司',
    type: '營運總部',
    address: '高雄市前金區五福三路21號6樓',
    phone: '(07) 271-1121（總機代表號）',
    dispatchPhone: '(07) 271-1121',
    fax: '(07) 271-1125',
    hours: '營業時間：週一至週五 08:30 - 17:30',
    features: ['營運總部行政決策核心', '大宗供料合約協議簽署', '預拌廠與建材行大宗採購專案接洽']
  },
  {
    name: '東南水泥高雄港發貨站',
    type: '發貨總站 0600-1600',
    address: '高雄市前鎮區大華三路22號',
    phone: '(07) 822-7070',
    dispatchPhone: '(07) 822-7070（提料調度專線）',
    fax: '(07) 822-7075',
    hours: '發貨作業時間：週一至週六 06:00 - 16:00',
    features: ['散裝氣送槽車快速過磅發車', '40kg 防潮袋裝整棧板提領出貨', '自營槽車專屬車隊發貨調度']
  }
];

export const PROCUREMENT_FAQS = [
  {
    question: '預拌混凝土廠如何初次建立常態供料與散裝槽車配送？',
    answer: '初次合作之預拌廠，本公司將指派資深業務工程師親赴貴廠進行儲槽口徑、氣送接頭（一般為4吋快速接頭）、槽體容積及地磅動線勘查。簽訂供料合約後，貴廠即可隨時利用「東南水泥專屬調度專線」或本系統進行排車，自營車隊依指定時段準時過磅進廠。'
  },
  {
    question: '建材行經銷批發的「袋裝水泥」包裝規格與最小起訂量？',
    answer: '東南水泥一型水泥袋裝目前全面採用標準「40公斤裝」（40kg/包），採全自動棧板包裝（每棧板50包，重量2公噸整），外層覆蓋防水防潮熱縮膜保護。單次經銷出貨最低量為 1 棧板（2公噸）。高雄、屏東及南部鄰近地區滿 5 棧板享有自營卡車專車送達，其他區域則依車次距離與運量彈性報價。'
  },
  {
    question: '水淬高爐石粉如何與一型水泥搭配？東南水泥是否提供配比建議？',
    answer: '在一般結構用混凝土中，高爐石粉建議取代量為 20%～40%；若為巨積混凝土或高抗硫酸鹽工程，取代量可達 40%～50%。東南水泥品管研發中心備有 TAF 認證實驗室，可免費協助合作預拌廠進行水化熱曲線分析、初期與28天強度比對及試拌驗證，提供專屬配比建議書。'
  },
  {
    question: '出貨時是否隨車附帶國家檢驗合格證明與物性報告？',
    answer: '是的。每一批散裝槽車與袋裝出貨，出廠過磅單均附帶產品批號與品管條碼。貴公司可即時下載當批次 CNS 61 或 CNS 12549 物理化學試驗報告，亦可透過本網站直接下載品質試驗成績書正本，完全滿足公共工程稽查與品管備查需求。'
  },
  {
    question: '若工地有緊急追加混凝土澆置工程，槽車調度最快多久能到？',
    answer: '南部各預拌廠若遇連續壁或重大結構連日澆置，我們具備高雄港發貨站（大華三路22號，電話 07-822-7070）快速提料過磅通道，最快可在叫料後 2～4 小時內安排槽車抵達貴廠儲庫。'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    title: '巨積混凝土水化熱抑制實務：以水淬高爐石粉（GGBS）最佳化配比分析',
    slug: 'mass-concrete-hydration-heat-ggbs',
    category: 'technical',
    categoryLabel: '工程技術規範',
    summary: '針對深開挖連續壁、大樓厚度超過1.5米之基礎筏基與橋墩巨積混凝土，探討以東南水淬高爐石粉取代 30%～50% 一型卜特蘭水泥時的水化溫升抑制成效與晚期強度發育。',
    content: `## 巨積混凝土工程的溫度裂縫挑戰

在台灣高溫多濕的氣候條件下，建築基礎筏基、高鐵高架橋墩等巨積結構物，在澆置後 24 至 72 小時常因一型水泥快速水化而產生劇烈蓄熱。中心與表面溫差若超過 20°C，即極易誘發貫穿性溫度裂縫，危及結構物之水密性與耐久性。

### 水淬高爐石粉（GGBS）的化學減熱機制
東南水泥生產之 CNS 12549 水淬高爐石粉，玻璃質含量高達 96% 以上，比表面積達 4,350 cm²/g。其主要成分氧化矽（SiO₂）與氧化鋁（Al₂O₃）在常溫下活性穩定，需由一型水泥水化釋出之氫氧化鈣 Ca(OH)₂ 觸發二次波特蘭反應（Pozzolanic Reaction）：

1. **水化放熱高峰延緩**：將放熱速率峰值推遲 12～18 小時，避免熱量在密閉厚壁結構中瞬間累積。
2. **絕熱溫升降幅顯著**：當高爐石粉取代量達 40% 時，絕熱溫升相較純一型水泥混凝土降低約 8～12°C。
3. **基質孔隙緻密化**：二次水化生成更多的水化矽酸鈣凝膠（C-S-H），大幅提升微細孔隙緻密度，降低透水係數達一個數量級以上。

### 建議配比與施工注意事項
- **取代比例**：建議一般巨積筏基採 35%～45% 取代率；配合優良聚羧酸系高性能減水劑，控制水膠比 W/B 在 0.38～0.42。
- **早期養護關鍵**：由於高爐石粉初期水化較緩，拆模時間宜適度放寬，表面應維持至少 7 天連續濕治養護，以確保表層碳化防護力。`,
    author: '東南水泥技術研發處',
    authorRole: '材料研發工程團隊',
    coverImage: '/src/assets/images/sec_slag_powder_1789004312307.jpg',
    publishedAt: '2026-09-05',
    readTime: '5 分鐘閱讀',
    isPublished: true,
    tags: ['巨積混凝土', '高爐石粉', '水化熱', '配比設計', 'CNS 12549'],
    views: 842
  },
  {
    id: 'post-02',
    title: 'CNS 61 一型卜特蘭水泥之需水量穩定性與預拌混凝土坍度保持控制',
    slug: 'cns61-type1-cement-slump-retention',
    category: 'mix_design',
    categoryLabel: '混凝土配比研發',
    summary: '預拌混凝土廠在炎夏施工最常面臨坍度快速損失難題。本文解析東南水泥高純度熟料立磨研磨技術如何維持需水量超低變異係數，確保各標號混凝土出機至工地澆置品質如一。',
    content: `## 預拌廠製程控制的關鍵痛點：坍度跳動與需水量

預拌混凝土廠每天產出數百至上千立方公尺混凝土，若進料水泥的標準稠度需水量發生跳動（例如 ±1.5%），出機坍度可能產生 3～5 cm 的嚴重偏差，導致工地泵送阻塞或擅自加水影響水膠比。

### 東南水泥在研磨粒徑級配上的品質控制
東南水泥採用德國先進立磨研磨系統與高效動態分級機，針對一型卜特蘭水泥嚴格執行三道關鍵品管機制：

- **嚴格監控 3～30 μm 有效水化顆粒區間**：小於 3 μm 之超微粉控制在 10% 以下以降低瞬態吸水量；大於 45 μm 粗顆粒低於 8%，保證 28 天水化完全。
- **SO₃ 與鋁酸三鈣（C₃A）化學平衡**：嚴選天然石膏均勻共磨，確保初期水化石膏溶出速率與 C₃A 形成鈣礬石之速率精密匹配，徹底杜絕「假凝」與「急凝」現象。
- **外加劑相容性試驗**：每週針對市售三大主流聚羧酸減水劑進行微型砂漿流動度衰減試驗（0分鐘、30分鐘、60分鐘），確保預拌廠長距離車程坍度依然充裕。

### 預拌現場操作改善建議
在日間氣溫超過 32°C 條件下，建議骨材堆置區加設遮陽網並實施噴霧冷卻；配合本公司穩定之水泥需水量，可顯著縮小坍度標準差，減少調整工時。`,
    author: '東南水泥品質保證部',
    authorRole: '品管實驗室主任',
    coverImage: '/src/assets/images/sec_cement_type1_1789005287685.jpg',
    publishedAt: '2026-08-28',
    readTime: '4 分鐘閱讀',
    isPublished: true,
    tags: ['CNS 61', '坍度保持', '需水量', '預拌混凝土', '品質管制'],
    views: 615
  },
  {
    id: 'post-03',
    title: '南台灣半導體高科技廠房重型厚筏基：全天候槽車不間斷供料實績',
    slug: 'semiconductor-fab-foundation-supply-case',
    category: 'project',
    categoryLabel: '重大工程實績',
    summary: '記錄楠梓產業園區半導體晶圓廠超大型無震動厚度 2.2 米設備筏基澆置工程，東南水泥出動 28 輛自營散裝槽車，連續 48 小時無間斷精準輸送水泥與爐石粉成功經驗。',
    content: `## 連續 48 小時不間斷澆置的嚴苛挑戰

南台灣半導體重鎮先進製程晶圓廠設備基座，對微振動耐受度要求極其嚴苛，工程設計採 2.2 公尺深之連續巨積厚筏基，單一分區需連續澆置近 8,500 立方公尺混凝土。任何因水泥斷料造成的施工冷縫，都將導致不可逆的結構瑕疵。

### 雙通道專車直送調度方案
東南水泥動員自營散裝氣送槽車車隊與高雄港發貨站電腦智慧過磅系統，落實專案特快調度機制：

1. **專屬綠色快速過磅通道**：在廠區開設專車專用通道，每輛槽車進場過磅、氣送吹料至離廠時間壓縮至 18 分鐘以內。
2. **GPS 即時動態排班監控**：調度中心大螢幕即時掌握車輛位置與預拌廠水泥庫料位，維持「車等料、料等車」最佳平衡，確保預拌廠四套拌合機 100% 滿載運轉。
3. **出廠即時試驗成績備查**：每一車次皆具備專屬 QR-Code 批號檢驗碼，監造工程師可在現場手機即時核對 Blaine 比表面積與初期強度數據。

此專案圓滿達成零冷縫、中心溫差低於 18°C、且 28 天抗壓強度平均達 42.5 MPa（設計強度 35 MPa）之優異成果。`,
    author: '東南水泥營業部暨調度組',
    authorRole: '重大工程專案小組',
    coverImage: '/src/assets/images/sec_cement_hero_1789004287364.jpg',
    publishedAt: '2026-08-15',
    readTime: '6 分鐘閱讀',
    isPublished: true,
    tags: ['工程實績', '半導體廠房', '槽車調度', '筏基工程', '24H供料'],
    views: 1120
  }
];

export const INITIAL_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'staff-01',
    name: '周建仁',
    employeeId: 'SEC-0101',
    department: '業務處',
    role: 'super_admin',
    roleLabel: '業務處主管 / 系統最高管理員',
    email: 'chunjen.chou@secement.com',
    phone: '0933-289-112',
    status: 'active',
    lastLoginAt: '2026-09-09 18:45',
    createdAt: '2024-01-15'
  },
  {
    id: 'staff-02',
    name: '陳志明',
    employeeId: 'SEC-0215',
    department: '槽車調度組',
    role: 'dispatch_officer',
    roleLabel: '自營槽車調度主管',
    email: 'zhiming.chen@secement.com',
    phone: '0912-345-678',
    status: 'active',
    lastLoginAt: '2026-09-09 17:30',
    createdAt: '2024-03-20'
  },
  {
    id: 'staff-03',
    name: '李研發',
    employeeId: 'SEC-0308',
    department: '技術研發處',
    role: 'tech_engineer',
    roleLabel: '混凝土配比資深研發工程師',
    email: 'yanfa.lee@secement.com',
    phone: '0928-765-432',
    status: 'active',
    lastLoginAt: '2026-09-09 16:10',
    createdAt: '2024-06-01'
  },
  {
    id: 'staff-04',
    name: '林品保',
    employeeId: 'SEC-0412',
    department: '品質保證部',
    role: 'staff',
    roleLabel: 'TAF認證實驗室品管專員',
    email: 'pinbao.lin@secement.com',
    phone: '0919-888-776',
    status: 'active',
    lastLoginAt: '2026-09-08 14:20',
    createdAt: '2024-08-10'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-09-09 18:55',
    operatorName: '周建仁',
    operatorEmployeeId: 'SEC-0101',
    operatorRole: '業務處主管',
    module: 'product',
    moduleLabel: '產品規格管理',
    actionType: 'update',
    actionLabel: '更新產品相片',
    targetId: 'prod-cement-type-1',
    targetName: '一型卜特蘭水泥',
    description: '更換一型卜特蘭水泥為最新商業實體袋裝與粉體產品攝影圖檔',
    details: '更新產品封面圖檔，自動同步更新首頁展示與規格簡報'
  },
  {
    id: 'log-02',
    timestamp: '2026-09-09 15:40',
    operatorName: '周建仁',
    operatorEmployeeId: 'SEC-0101',
    operatorRole: '業務處主管',
    module: 'inquiry',
    moduleLabel: '採購詢價訂單',
    actionType: 'status_change',
    actionLabel: '變更處理進度',
    targetId: 'SEC-20260909-001',
    targetName: '宏都預拌混凝土股份有限公司',
    description: '將詢價單 SEC-20260909-001 狀態由 [新送出詢價] 更新為 [已提供正式報價]',
    details: '業務部已派員電聯廠長確認 4 吋氣送管徑與每週二、五固定排班 5 車次'
  },
  {
    id: 'log-03',
    timestamp: '2026-09-09 11:20',
    operatorName: '李研發',
    operatorEmployeeId: 'SEC-0308',
    operatorRole: '技術研發工程師',
    module: 'blog',
    moduleLabel: '技術專欄文章',
    actionType: 'publish',
    actionLabel: '公開發布文章',
    targetId: 'post-01',
    targetName: '巨積混凝土水化熱抑制實務：以水淬高爐石粉最佳化配比分析',
    description: '發布技術專欄文章，提供預拌廠與工程營造商下載參考',
    details: '分類：工程技術規範，包含水化放熱量測定與抑制微裂配比指引'
  },
  {
    id: 'log-04',
    timestamp: '2026-09-09 09:15',
    operatorName: '陳志明',
    operatorEmployeeId: 'SEC-0215',
    operatorRole: '槽車調度主管',
    module: 'inquiry',
    moduleLabel: '採購詢價訂單',
    actionType: 'status_change',
    actionLabel: '排車調度確認',
    targetId: 'SEC-20260909-002',
    targetName: '聯發建材五金行',
    description: '確認高雄港發貨站 40kg 袋裝棧板庫存 500 包（10棧板），安排明日上午 09:00 平板大貨車配送',
    details: '自營車隊單號 SEC-TRK-9821'
  },
  {
    id: 'log-05',
    timestamp: '2026-09-08 16:30',
    operatorName: '周建仁',
    operatorEmployeeId: 'SEC-0101',
    operatorRole: '業務處主管',
    module: 'staff',
    moduleLabel: '人員權限管理',
    actionType: 'create',
    actionLabel: '建立成員帳號',
    targetId: 'staff-04',
    targetName: '林品保',
    description: '新增品管實驗室專員 林品保 (SEC-0412) 帳號與後台檢驗報告檢視權限',
    details: '部門：品質保證部，權限組：品管專員'
  }
];

