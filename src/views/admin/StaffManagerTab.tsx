import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { StaffMember, StaffDepartment, StaffRole } from '../../types';
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone, 
  Save, 
  X, 
  KeyRound, 
  Building2, 
  Clock,
  UserCheck
} from 'lucide-react';

export const StaffManagerTab: React.FC = () => {
  const { 
    staffMembers, 
    addStaffMember, 
    updateStaffMember, 
    deleteStaffMember, 
    toggleStaffStatus,
    currentOperator,
    setCurrentOperator 
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmployeeId, setFormEmployeeId] = useState('');
  const [formDepartment, setFormDepartment] = useState<StaffDepartment>('業務處');
  const [formRole, setFormRole] = useState<StaffRole>('sales_manager');
  const [formRoleLabel, setFormRoleLabel] = useState('業務經理');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'disabled'>('active');

  const openNewStaffForm = () => {
    setEditingStaffId(null);
    setFormName('');
    const randomNum = Math.floor(100 + Math.random() * 900);
    setFormEmployeeId(`SEC-0${randomNum}`);
    setFormDepartment('技術研發處');
    setFormRole('tech_engineer');
    setFormRoleLabel('材料研發工程師');
    setFormEmail('');
    setFormPhone('');
    setFormStatus('active');
    setIsFormOpen(true);
  };

  const openEditStaffForm = (staff: StaffMember) => {
    setEditingStaffId(staff.id);
    setFormName(staff.name);
    setFormEmployeeId(staff.employeeId);
    setFormDepartment(staff.department);
    setFormRole(staff.role);
    setFormRoleLabel(staff.roleLabel);
    setFormEmail(staff.email);
    setFormPhone(staff.phone);
    setFormStatus(staff.status);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStaffId(null);
  };

  const handleRoleChange = (role: StaffRole) => {
    setFormRole(role);
    const roleLabels: Record<StaffRole, string> = {
      super_admin: '業務處主管 / 系統最高管理員',
      sales_manager: '業務部副理 / 報價主管',
      tech_engineer: '技術研發處 / 配比資深工程師',
      dispatch_officer: '槽車調度組 / 調度管理主任',
      staff: '品保檢驗部 / 品管專員'
    };
    setFormRoleLabel(roleLabels[role] || '業務專員');
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('請輸入同仁姓名');
      return;
    }
    if (!formEmployeeId.trim()) {
      alert('請輸入工號');
      return;
    }

    if (editingStaffId) {
      updateStaffMember(editingStaffId, {
        name: formName.trim(),
        employeeId: formEmployeeId.trim(),
        department: formDepartment,
        role: formRole,
        roleLabel: formRoleLabel.trim(),
        email: formEmail.trim() || `${formEmployeeId.toLowerCase()}@secement.com`,
        phone: formPhone.trim(),
        status: formStatus
      });
    } else {
      addStaffMember({
        name: formName.trim(),
        employeeId: formEmployeeId.trim(),
        department: formDepartment,
        role: formRole,
        roleLabel: formRoleLabel.trim(),
        email: formEmail.trim() || `${formEmployeeId.toLowerCase()}@secement.com`,
        phone: formPhone.trim(),
        status: formStatus
      });
    }

    closeForm();
  };

  const handleDeleteStaff = (staff: StaffMember) => {
    if (confirm(`確定要刪除同仁「${staff.name}（${staff.employeeId}）」的帳號與後台權限嗎？`)) {
      deleteStaffMember(staff.id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <span>團隊人員與權限管理</span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            管理具有後台存取權限的東南水泥同仁（業務部、調度組、技術研發、品保檢驗）。每一位同仁在系統內的所有操作皆會真實記錄於「操作日誌」。
          </p>
        </div>

        <button
          onClick={openNewStaffForm}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>新增人員帳號</span>
        </button>
      </div>

      {/* Staff Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full my-auto shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  {editingStaffId ? <Edit3 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                </span>
                <div>
                  <h4 className="text-base font-bold text-stone-900">
                    {editingStaffId ? '編輯同仁帳號與職務權限' : '建立新人員後台存取帳號'}
                  </h4>
                  <p className="text-xs text-stone-500">指派部門、權限角色與聯絡電話</p>
                </div>
              </div>
              <button onClick={closeForm} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">同仁姓名 *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="例如：周建仁"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">東南水泥工號 *</label>
                  <input
                    type="text"
                    required
                    value={formEmployeeId}
                    onChange={(e) => setFormEmployeeId(e.target.value)}
                    placeholder="例如：SEC-0188"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">所屬部門 *</label>
                  <select
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value as StaffDepartment)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                  >
                    <option value="業務處">業務處 (大宗採購與合約)</option>
                    <option value="技術研發處">技術研發處 (配比試拌與TAF試驗)</option>
                    <option value="槽車調度組">槽車調度組 (散裝車隊排班過磅)</option>
                    <option value="品質保證部">品質保證部 (熟料化驗與研磨品管)</option>
                    <option value="廠務生產部">廠務生產部 (旋窯運轉與立磨)</option>
                    <option value="管理室">管理室 (系統資訊維護)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">權限角色層級 *</label>
                  <select
                    value={formRole}
                    onChange={(e) => handleRoleChange(e.target.value as StaffRole)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                  >
                    <option value="super_admin">系統最高管理員 (全功能)</option>
                    <option value="sales_manager">業務主管 / 報價經理</option>
                    <option value="tech_engineer">技術工程師 (專欄文章與配比試驗)</option>
                    <option value="dispatch_officer">槽車調度主管 (排車與出貨)</option>
                    <option value="staff">一般檢驗專員 / 唯讀檢視</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">自訂職稱顯示名稱</label>
                <input
                  type="text"
                  value={formRoleLabel}
                  onChange={(e) => setFormRoleLabel(e.target.value)}
                  placeholder="例如：自營槽車調度主管"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">電子郵件 (登入識別)</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@secement.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">公務聯絡電話</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="例如：0933-xxx-xxx"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-900 block">帳號啟用狀態</span>
                  <span className="text-[11px] text-stone-500">
                    {formStatus === 'active' ? '在職啟用中（可登入並操作後台系統）' : '已停用（暫停後台存取權限）'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormStatus(formStatus === 'active' ? 'disabled' : 'active')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    formStatus === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {formStatus === 'active' ? '在職啟用' : '已停用'}
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingStaffId ? '儲存權限修改' : '建立人員帳號'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700">
            東南水泥後台管理成員名單（共 {staffMembers.length} 名）
          </span>
          <span className="text-xs text-stone-400">
            當前操作者：<strong>{currentOperator.name}</strong> ({currentOperator.employeeId})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4 font-semibold">同仁姓名 / 工號</th>
                <th className="py-3.5 px-4 font-semibold">所屬部門</th>
                <th className="py-3.5 px-4 font-semibold">職務與權限角色</th>
                <th className="py-3.5 px-4 font-semibold">聯絡方式</th>
                <th className="py-3.5 px-4 font-semibold text-center">狀態</th>
                <th className="py-3.5 px-4 font-semibold text-right">操作與切換身分</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {staffMembers.map(staff => {
                const isCurrent = currentOperator.id === staff.id;
                return (
                  <tr key={staff.id} className={`hover:bg-stone-50/80 transition-colors ${isCurrent ? 'bg-amber-50/40' : ''}`}>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                          isCurrent 
                            ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400' 
                            : 'bg-stone-800 text-stone-200'
                        }`}>
                          {staff.name.slice(0, 1)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900">{staff.name}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-500 text-stone-950 font-bold text-[10px]">
                                當前操作者
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono">{staff.employeeId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-semibold">
                        {staff.department}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-semibold text-stone-800">{staff.roleLabel}</div>
                      <div className="text-[10px] text-stone-400 font-mono">
                        {staff.role === 'super_admin' ? '最高管理權限' : '部門專屬權限'}
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-stone-700 font-mono text-[11px]">{staff.email}</div>
                      <div className="text-stone-400 text-[11px]">{staff.phone}</div>
                    </td>

                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => toggleStaffStatus(staff.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 mx-auto ${
                          staff.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                        title="點擊切換在職/停用狀態"
                      >
                        {staff.status === 'active' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>在職啟用</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>已停用</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {!isCurrent && staff.status === 'active' && (
                          <button
                            onClick={() => setCurrentOperator(staff)}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                            title="切換以此同仁身分操作並記錄日誌"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                            <span>切換此身分</span>
                          </button>
                        )}
                        <button
                          onClick={() => openEditStaffForm(staff)}
                          className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg cursor-pointer"
                          title="修改資料"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(staff)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                          title="刪除帳號"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
