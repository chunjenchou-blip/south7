import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CustomerInquiry, 
  PackagingType,
  ActivePageView, 
  BlogPost, 
  StaffMember, 
  AuditLog, 
  AuditModule, 
  AuditActionType 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  SAMPLE_INQUIRIES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_STAFF_MEMBERS, 
  INITIAL_AUDIT_LOGS 
} from '../data/initialProducts';

interface ProductContextType {
  products: Product[];
  inquiries: CustomerInquiry[];
  blogPosts: BlogPost[];
  staffMembers: StaffMember[];
  auditLogs: AuditLog[];
  currentOperator: StaffMember;
  activePage: ActivePageView;
  selectedProductId: string | null;
  selectedBlogPostId: string | null;
  isShareModalOpen: boolean;
  quickQuoteProductId: string | null;
  setActivePage: (page: ActivePageView) => void;
  setSelectedProductId: (id: string | null) => void;
  setSelectedBlogPostId: (id: string | null) => void;
  setIsShareModalOpen: (open: boolean) => void;
  setQuickQuoteProductId: (id: string | null) => void;
  setCurrentOperator: (staff: StaffMember) => void;
  
  // Product actions
  addProduct: (productData: Omit<Product, 'id' | 'updatedAt'>) => void;
  updateProduct: (id: string, updatedData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  
  // Inquiry actions
  addInquiry: (inquiryData: Omit<CustomerInquiry, 'id' | 'inquiryNumber' | 'status' | 'statusLabel' | 'createdAt'>) => string;
  updateInquiryStatus: (id: string, status: CustomerInquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;

  // Blog actions
  addBlogPost: (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'views'>) => void;
  updateBlogPost: (id: string, updatedData: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  toggleBlogPostPublish: (id: string) => void;

  // Staff actions
  addStaffMember: (staffData: Omit<StaffMember, 'id' | 'lastLoginAt' | 'createdAt'>) => void;
  updateStaffMember: (id: string, updatedData: Partial<StaffMember>) => void;
  deleteStaffMember: (id: string) => void;
  toggleStaffStatus: (id: string) => void;

  // Audit log action
  addAuditLog: (module: AuditModule, actionType: AuditActionType, description: string, details?: string, targetId?: string, targetName?: string) => void;
  clearAuditLogs: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY_PRODUCTS = 'sec_cement_products_v5';
const STORAGE_KEY_INQUIRIES = 'sec_cement_inquiries_v3';
const STORAGE_KEY_BLOG = 'sec_cement_blog_v1';
const STORAGE_KEY_STAFF = 'sec_cement_staff_v1';
const STORAGE_KEY_AUDIT = 'sec_cement_audit_v1';
const STORAGE_KEY_OPERATOR = 'sec_cement_operator_v1';

// Helper to ensure all bag specifications strictly use 40kg (40公斤) and clean obsolete terminology
export const sanitizeProductTo40kg = (p: Product): Product => {
  return {
    ...p,
    categoryLabel: p.categoryLabel ? p.categoryLabel.replace(/膠結料/g, '水淬高爐石粉') : p.categoryLabel,
    packaging: p.packaging.map(pkg => {
      const type = (pkg.type === 'bag_50kg' ? 'bag_40kg' : pkg.type) as PackagingType;
      const label = pkg.label
        .replace(/50\s*kg/gi, '40kg')
        .replace(/50\s*公斤/g, '40公斤');
      const description = pkg.description
        .replace(/50\s*kg/gi, '40kg')
        .replace(/50\s*公斤/g, '40公斤')
        .replace(/40\s*包（2公噸）/g, '50 包（2公噸）')
        .replace(/40\s*包/g, '50包');
      const minOrder = pkg.minOrder
        .replace(/40\s*包/g, '50包')
        .replace(/50\s*kg/gi, '40kg')
        .replace(/50\s*公斤/g, '40公斤');
      return {
        ...pkg,
        type,
        label,
        description,
        minOrder
      };
    })
  };
};

export const sanitizeInquiryTo40kg = (inq: CustomerInquiry): CustomerInquiry => {
  return {
    ...inq,
    productRequests: (inq.productRequests || []).map(rp => ({
      ...rp,
      packaging: (rp.packaging === 'bag_50kg' ? 'bag_40kg' : rp.packaging) as PackagingType
    })),
    specialRequirements: inq.specialRequirements
      ? inq.specialRequirements
          .replace(/50\s*kg/gi, '40kg')
          .replace(/50\s*公斤/g, '40公斤')
          .replace(/每棧\s*40\s*包/g, '每棧50包')
      : inq.specialRequirements
  };
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear legacy storage keys that might contain obsolete specifications
      ['sec_cement_products_v1', 'sec_cement_products_v2', 'sec_cement_products_v3', 'sec_cement_products_v4'].forEach(k => {
        try { localStorage.removeItem(k); } catch { /* ignore */ }
      });

      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => sanitizeProductTo40kg(p));
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_PRODUCTS.map(sanitizeProductTo40kg);
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      ['sec_cement_inquiries_v1', 'sec_cement_inquiries_v2'].forEach(k => {
        try { localStorage.removeItem(k); } catch { /* ignore */ }
      });

      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((inq: CustomerInquiry) => sanitizeInquiryTo40kg(inq));
        }
      }
    } catch {
      // Fallback
    }
    return SAMPLE_INQUIRIES.map(sanitizeInquiryTo40kg);
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BLOG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_BLOG_POSTS;
  });

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STAFF);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_STAFF_MEMBERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUDIT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_AUDIT_LOGS;
  });

  const [currentOperator, setCurrentOperatorState] = useState<StaffMember>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OPERATOR);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_STAFF_MEMBERS[0];
  });

  const [activePage, setActivePage] = useState<ActivePageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [quickQuoteProductId, setQuickQuoteProductId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch { /* ignore */ }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch { /* ignore */ }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BLOG, JSON.stringify(blogPosts));
    } catch { /* ignore */ }
  }, [blogPosts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STAFF, JSON.stringify(staffMembers));
    } catch { /* ignore */ }
  }, [staffMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(auditLogs));
    } catch { /* ignore */ }
  }, [auditLogs]);

  const setCurrentOperator = (staff: StaffMember) => {
    setCurrentOperatorState(staff);
    try {
      localStorage.setItem(STORAGE_KEY_OPERATOR, JSON.stringify(staff));
    } catch { /* ignore */ }
    addAuditLog('system', 'login', `切換當前後台操作人員為：${staff.name} (${staff.employeeId})`, `部門：${staff.department}，權限：${staff.roleLabel}`);
  };

  // Audit logging helper
  const addAuditLog = (
    module: AuditModule,
    actionType: AuditActionType,
    description: string,
    details?: string,
    targetId?: string,
    targetName?: string
  ) => {
    const moduleLabels: Record<AuditModule, string> = {
      product: '產品規格管理',
      inquiry: '採購詢價訂單',
      blog: '技術專欄文章',
      staff: '人員權限管理',
      system: '系統日誌與安全'
    };

    const actionLabels: Record<AuditActionType, string> = {
      create: '新增資料',
      update: '修改資料',
      delete: '刪除資料',
      publish: '發布變更',
      status_change: '狀態變更',
      login: '身分切換'
    };

    const now = new Date();
    const datePart = now.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    const timePart = now.toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const timestamp = `${datePart} ${timePart}`;

    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp,
      operatorName: currentOperator?.name || '周建仁',
      operatorEmployeeId: currentOperator?.employeeId || 'SEC-0101',
      operatorRole: currentOperator?.roleLabel || '系統管理員',
      module,
      moduleLabel: moduleLabels[module],
      actionType,
      actionLabel: actionLabels[actionType],
      targetId,
      targetName,
      description,
      details
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  const clearAuditLogs = () => {
    const defaultLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('zh-TW', { hour12: false }),
      operatorName: currentOperator?.name || '系統管理員',
      operatorEmployeeId: currentOperator?.employeeId || 'SEC-0101',
      operatorRole: '系統主管',
      module: 'system',
      moduleLabel: '系統日誌與安全',
      actionType: 'delete',
      actionLabel: '清空日誌',
      description: '管理員已清空歷史操作日誌並重新開始記錄'
    };
    setAuditLogs([defaultLog]);
  };

  // Dynamic Title & Meta Tag Synchronization based on activePage
  useEffect(() => {
    const baseSiteName = '東南水泥股份有限公司';
    let pageTitle = '';
    let pageDesc = '';

    switch (activePage) {
      case 'home':
        pageTitle = `首頁 | ${baseSiteName} - 一型水泥與高爐石粉專業製造．預拌廠與建材行大宗採購`;
        pageDesc = `${baseSiteName}深耕台灣，專注生產CNS 61一型水泥與CNS 12549水淬高爐石粉，提供自營散裝槽車直配與高雄港發貨站高效率供料。`;
        break;
      case 'products':
        pageTitle = `產品規格與技術報告 | ${baseSiteName} - 一型水泥．高爐石粉`;
        pageDesc = `完整檢視東南水泥一型卜特蘭水泥與水淬高爐石粉之CNS抗壓強度、比表面積、初凝終凝時間與散裝/袋裝出貨規格。`;
        break;
      case 'blog':
        pageTitle = `工程技術觀點與專欄 | ${baseSiteName} - 混凝土配比．水化熱．高爐石粉應用`;
        pageDesc = `東南水泥技術研發處與品管實驗室專欄：提供巨積混凝土水化熱抑制、CNS 61一型水泥坍度保持控制、高科技廠房大型筏基供料等專業工程實績報告。`;
        break;
      case 'contact':
        pageTitle = `業務採購與散裝槽車調度洽詢 | ${baseSiteName}`;
        pageDesc = `預拌混凝土廠與建材行採購專用表單。線上快速試算需求噸數、預約槽車排程與專屬業務經理快速報價。`;
        break;
      case 'admin':
        pageTitle = `夥伴營運管理系統 | ${baseSiteName}`;
        pageDesc = `夥伴專屬管理後台：隨時增減與編輯一型水泥、爐石粉等產品規格資料，即時審核管理混凝土廠詢價訂單、技術專欄文章發布與人員權限操作日誌。`;
        break;
      default:
        pageTitle = `${baseSiteName} - 卓越水泥基石`;
        pageDesc = `${baseSiteName}官方網站。`;
    }

    document.title = pageTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', pageDesc);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Product Actions with Audit Logging
  const addProduct = (productData: Omit<Product, 'id' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProduct, ...prev]);
    addAuditLog('product', 'create', `新增產品「${newProduct.name}」(${newProduct.code})`, `分類：${newProduct.categoryLabel}，規格：${newProduct.cnsStandard}`, newProduct.id, newProduct.name);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const updated = {
            ...p,
            ...updatedData,
            updatedAt: new Date().toISOString().split('T')[0]
          };
          addAuditLog('product', 'update', `更新產品「${updated.name}」資訊或物性規格`, `更新欄位：${Object.keys(updatedData).join(', ')}`, id, updated.name);
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (target) {
      addAuditLog('product', 'delete', `刪除產品「${target.name}」(${target.code})`, `已從前台官網與後台資料庫移除`, id, target.name);
    }
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    addAuditLog('product', 'update', `重置產品資料為系統出廠預設值`, `恢復一型卜特蘭水泥與水淬高爐石粉初始標準物性`);
  };

  // Inquiry Actions with Audit Logging
  const addInquiry = (inquiryData: Omit<CustomerInquiry, 'id' | 'inquiryNumber' | 'status' | 'statusLabel' | 'createdAt'>): string => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSeq = Math.floor(100 + Math.random() * 900);
    const inqNumber = `SEC-${todayStr}-${randomSeq}`;

    const newInq: CustomerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      inquiryNumber: inqNumber,
      status: 'pending',
      statusLabel: '新送出詢價（待業務接洽）',
      createdAt: new Date().toLocaleString('zh-TW', { hour12: false })
    };

    setInquiries(prev => [newInq, ...prev]);
    addAuditLog('inquiry', 'create', `客戶線上送出詢價單 ${inqNumber} (${newInq.companyName})`, `客戶類型：${newInq.customerType}，送達地點：${newInq.deliveryCity}${newInq.deliveryDistrict}`, newInq.id, inqNumber);
    return inqNumber;
  };

  const updateInquiryStatus = (id: string, status: CustomerInquiry['status'], notes?: string) => {
    const statusMap: Record<CustomerInquiry['status'], string> = {
      pending: '新送出詢價（待業務接洽）',
      quoted: '已提供業務報價單',
      in_delivery: '槽車排程供料中',
      completed: '已完成採購結案'
    };

    setInquiries(prev =>
      prev.map(item => {
        if (item.id === id) {
          const oldStatus = item.statusLabel;
          const newStatus = statusMap[status];
          addAuditLog(
            'inquiry', 
            'status_change', 
            `將詢價單 ${item.inquiryNumber} (${item.companyName}) 狀態變更為 [${newStatus}]`, 
            `原狀態：[${oldStatus}]；備註：${notes || item.notes || '無'}`,
            id,
            item.inquiryNumber
          );
          return {
            ...item,
            status,
            statusLabel: newStatus,
            notes: notes !== undefined ? notes : item.notes
          };
        }
        return item;
      })
    );
  };

  const deleteInquiry = (id: string) => {
    const target = inquiries.find(i => i.id === id);
    setInquiries(prev => prev.filter(item => item.id !== id));
    if (target) {
      addAuditLog('inquiry', 'delete', `刪除詢價單紀錄 ${target.inquiryNumber} (${target.companyName})`, undefined, id, target.inquiryNumber);
    }
  };

  // Blog Actions with Audit Logging
  const addBlogPost = (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'views'>) => {
    const categoryLabels: Record<string, string> = {
      technical: '工程技術規範',
      mix_design: '混凝土配比研發',
      project: '重大工程實績',
      esg: '永續低碳水泥',
      news: '廠區營運最新公告'
    };

    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}`,
      categoryLabel: categoryLabels[postData.category] || '技術專欄',
      publishedAt: new Date().toISOString().split('T')[0],
      views: 1
    };

    setBlogPosts(prev => [newPost, ...prev]);
    addAuditLog(
      'blog', 
      'create', 
      `新增專欄文章《${newPost.title}》`, 
      `分類：${newPost.categoryLabel}，作者：${newPost.author}，發布狀態：${newPost.isPublished ? '已直接公開發布' : '儲存為草稿'}`,
      newPost.id,
      newPost.title
    );
  };

  const updateBlogPost = (id: string, updatedData: Partial<BlogPost>) => {
    setBlogPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          const updated = { ...post, ...updatedData };
          addAuditLog(
            'blog', 
            'update', 
            `修改專欄文章《${updated.title}》`, 
            `更新項目：${Object.keys(updatedData).join(', ')}`,
            id,
            updated.title
          );
          return updated;
        }
        return post;
      })
    );
  };

  const deleteBlogPost = (id: string) => {
    const target = blogPosts.find(p => p.id === id);
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    if (target) {
      addAuditLog('blog', 'delete', `刪除專欄文章《${target.title}》`, `文章已自官網下架並永久移除`, id, target.title);
    }
  };

  const toggleBlogPostPublish = (id: string) => {
    setBlogPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          const nextState = !post.isPublished;
          addAuditLog(
            'blog', 
            'publish', 
            `切換專欄文章《${post.title}》發布狀態為：[${nextState ? '已公開發布' : '轉為內部草稿'}]`, 
            undefined,
            id,
            post.title
          );
          return { ...post, isPublished: nextState };
        }
        return post;
      })
    );
  };

  // Staff Actions with Audit Logging
  const addStaffMember = (staffData: Omit<StaffMember, 'id' | 'lastLoginAt' | 'createdAt'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: `staff-${Date.now()}`,
      lastLoginAt: '尚未登入',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStaffMembers(prev => [...prev, newStaff]);
    addAuditLog(
      'staff', 
      'create', 
      `新增人員帳號：${newStaff.name} (工號: ${newStaff.employeeId})`, 
      `部門：${newStaff.department}，職稱權限：${newStaff.roleLabel}，聯絡信箱：${newStaff.email}`,
      newStaff.id,
      newStaff.name
    );
  };

  const updateStaffMember = (id: string, updatedData: Partial<StaffMember>) => {
    setStaffMembers(prev =>
      prev.map(staff => {
        if (staff.id === id) {
          const updated = { ...staff, ...updatedData };
          addAuditLog(
            'staff', 
            'update', 
            `修改人員權限資料：${updated.name} (${updated.employeeId})`, 
            `更新項目：${Object.keys(updatedData).join(', ')}`,
            id,
            updated.name
          );
          return updated;
        }
        return staff;
      })
    );
  };

  const deleteStaffMember = (id: string) => {
    const target = staffMembers.find(s => s.id === id);
    if (!target) return;
    if (target.role === 'super_admin' && staffMembers.filter(s => s.role === 'super_admin').length <= 1) {
      alert('系統必須保留至少一位最高管理員，無法刪除此帳號。');
      return;
    }
    setStaffMembers(prev => prev.filter(s => s.id !== id));
    addAuditLog('staff', 'delete', `刪除人員帳號：${target.name} (${target.employeeId})`, `已註銷其後台所有存取權限`, id, target.name);
  };

  const toggleStaffStatus = (id: string) => {
    setStaffMembers(prev =>
      prev.map(staff => {
        if (staff.id === id) {
          const nextStatus = staff.status === 'active' ? 'disabled' : 'active';
          addAuditLog(
            'staff', 
            'status_change', 
            `將人員 ${staff.name} (${staff.employeeId}) 帳號狀態切換為：[${nextStatus === 'active' ? '在職啟用' : '已停用'}]`, 
            undefined,
            id,
            staff.name
          );
          return { ...staff, status: nextStatus };
        }
        return staff;
      })
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        inquiries,
        blogPosts,
        staffMembers,
        auditLogs,
        currentOperator,
        activePage,
        selectedProductId,
        selectedBlogPostId,
        isShareModalOpen,
        quickQuoteProductId,
        setActivePage,
        setSelectedProductId,
        setSelectedBlogPostId,
        setIsShareModalOpen,
        setQuickQuoteProductId,
        setCurrentOperator,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        toggleBlogPostPublish,
        addStaffMember,
        updateStaffMember,
        deleteStaffMember,
        toggleStaffStatus,
        addAuditLog,
        clearAuditLogs
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

