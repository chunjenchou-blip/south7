export type CustomerCategory = 'ready_mix' | 'building_material' | 'contractor' | 'precast_concrete' | 'other';

export type PackagingType = 'tanker_bulk' | 'bag_40kg' | 'jumbo_ton' | 'bag_50kg';

export interface ProductSpecItem {
  label: string;
  value: string;
  standardReq?: string; // CNS 標準要求
}

export interface Product {
  id: string;
  code: string; // e.g. "SEC-CEM-01"
  name: string; // e.g. "一型卜特蘭水泥"
  enName: string; // e.g. "Type I Portland Cement"
  category: 'cement' | 'slag' | 'specialty';
  categoryLabel: string;
  badge: string; // e.g. "CNS 61 國家標準認證"
  cnsStandard: string; // e.g. "CNS 61 / ASTM C150 Type I"
  summary: string;
  description: string;
  image: string;
  packaging: {
    type: PackagingType;
    label: string;
    description: string;
    minOrder: string;
  }[];
  keyFeatures: string[];
  specs: ProductSpecItem[];
  applications: string[];
  stockStatus: 'stable_supply' | 'limited' | 'custom_order';
  stockStatusLabel: string;
  leadTime: string;
  certifications: string[];
  pdfSpecName?: string;
  updatedAt: string;
}

export interface InquiryItemRequest {
  productId: string;
  productName: string;
  packaging: PackagingType;
  quantityTons: number;
}

export interface CustomerInquiry {
  id: string;
  inquiryNumber: string;
  customerType: CustomerCategory;
  companyName: string;
  taxId?: string; // 統一編號
  contactPerson: string;
  phone: string;
  email: string;
  deliveryCity: string;
  deliveryDistrict: string;
  projectSiteName: string;
  productRequests: InquiryItemRequest[];
  targetDeliveryDate: string;
  hasSiloStorage: boolean; // 是否具備水泥儲槽(氣送槽車用)
  truckWeightLimit?: string; // 路段限重噸數
  specialRequirements?: string;
  status: 'pending' | 'quoted' | 'in_delivery' | 'completed';
  statusLabel: string;
  createdAt: string;
  notes?: string;
}

export type ActivePageView = 'home' | 'products' | 'product_detail' | 'contact' | 'blog' | 'admin';

export interface BreadcrumbItem {
  label: string;
  view?: ActivePageView;
}

// 專欄文章與最新技術報告 (Blog)
export type BlogCategory = 'technical' | 'mix_design' | 'project' | 'esg' | 'news';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  categoryLabel: string;
  summary: string;
  content: string; // 支援 Markdown 或格式化文本
  author: string;
  authorRole: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  isPublished: boolean;
  tags: string[];
  views: number;
}

// 人員管理 (Staff Management)
export type StaffDepartment = '業務處' | '技術研發處' | '廠務生產部' | '品質保證部' | '槽車調度組' | '管理室';
export type StaffRole = 'super_admin' | 'sales_manager' | 'tech_engineer' | 'dispatch_officer' | 'staff';

export interface StaffMember {
  id: string;
  name: string;
  employeeId: string; // 工號，例如 SEC-0182
  department: StaffDepartment;
  role: StaffRole;
  roleLabel: string;
  email: string;
  phone: string;
  status: 'active' | 'disabled';
  lastLoginAt: string;
  createdAt: string;
}

// 操作日誌 (Audit Logs - 讓我知道誰做了什麼)
export type AuditModule = 'product' | 'inquiry' | 'blog' | 'staff' | 'system';
export type AuditActionType = 'create' | 'update' | 'delete' | 'publish' | 'status_change' | 'login';

export interface AuditLog {
  id: string;
  timestamp: string;
  operatorName: string;
  operatorEmployeeId: string;
  operatorRole: string;
  module: AuditModule;
  moduleLabel: string;
  actionType: AuditActionType;
  actionLabel: string;
  targetId?: string;
  targetName?: string;
  description: string;
  details?: string;
}

