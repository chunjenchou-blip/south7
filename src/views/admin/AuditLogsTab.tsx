import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { AuditLog, AuditModule, AuditActionType } from '../../types';
import { 
  History, 
  Search, 
  Filter, 
  Trash2, 
  RotateCcw, 
  User, 
  Calendar, 
  Clock, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Package, 
  Truck, 
  Users, 
  BookOpen,
  ArrowUpDown,
  RefreshCw
} from 'lucide-react';

export const AuditLogsTab: React.FC = () => {
  const { auditLogs, clearAuditLogs, currentOperator } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesModule = selectedModule === 'all' || log.module === selectedModule;
    const matchesAction = selectedAction === 'all' || log.actionType === selectedAction;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      log.operatorName.toLowerCase().includes(query) ||
      log.operatorEmployeeId.toLowerCase().includes(query) ||
      log.description.toLowerCase().includes(query) ||
      (log.details && log.details.toLowerCase().includes(query)) ||
      (log.targetName && log.targetName.toLowerCase().includes(query));
    return matchesModule && matchesAction && matchesSearch;
  });

  const getModuleIcon = (module: AuditModule) => {
    switch (module) {
      case 'product':
        return <Package className="w-3.5 h-3.5 text-amber-600" />;
      case 'inquiry':
        return <Truck className="w-3.5 h-3.5 text-blue-600" />;
      case 'blog':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-600" />;
      case 'staff':
        return <Users className="w-3.5 h-3.5 text-purple-600" />;
      case 'system':
      default:
        return <Shield className="w-3.5 h-3.5 text-stone-600" />;
    }
  };

  const getActionBadge = (actionType: AuditActionType, actionLabel: string) => {
    switch (actionType) {
      case 'create':
        return <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">{actionLabel}</span>;
      case 'update':
        return <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">{actionLabel}</span>;
      case 'delete':
        return <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">{actionLabel}</span>;
      case 'publish':
        return <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">{actionLabel}</span>;
      case 'status_change':
        return <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">{actionLabel}</span>;
      case 'login':
        return <span className="px-2 py-0.5 rounded bg-stone-200 text-stone-800 text-[10px] font-bold">{actionLabel}</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px]">{actionLabel}</span>;
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('確定要清空所有的系統歷史操作紀錄嗎？此動作將會記錄一筆清空日誌。')) {
      clearAuditLogs();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <History className="w-5 h-5 text-amber-600" />
            <span>系統安全操作日誌 (Audit Trail)</span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            即時追蹤「誰在何時對哪項產品、詢價單、技術專欄或同仁權限做了什麼」。符合 ISO/TAF 規範之變更稽核要求。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-stone-500 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 font-mono">
            當前操作者：<strong>{currentOperator.name}</strong> ({currentOperator.employeeId})
          </div>
          <button
            onClick={handleClearLogs}
            className="px-3.5 py-1.5 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-xs font-semibold rounded-xl border border-stone-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            title="清空歷史紀錄"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>清空日誌</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋操作者姓名、工號、目標項目或異動說明..."
              className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Module Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
            >
              <option value="all">所有功能模組 (全部)</option>
              <option value="product">產品規格管理</option>
              <option value="inquiry">採購詢價訂單</option>
              <option value="blog">技術專欄文章</option>
              <option value="staff">人員權限管理</option>
              <option value="system">系統日誌與安全</option>
            </select>
          </div>

          {/* Action Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
            >
              <option value="all">所有動作類型 (全部)</option>
              <option value="create">新增資料</option>
              <option value="update">修改資料</option>
              <option value="delete">刪除資料</option>
              <option value="status_change">狀態變更</option>
              <option value="publish">發布變更</option>
              <option value="login">身分切換</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700">
            稽核日誌明細（顯示 {filteredLogs.length} / 共 {auditLogs.length} 筆）
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            更新頻率：即時追蹤存證
          </span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-stone-500 text-xs">
            查無相符的操作日誌紀錄。
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-mono">
                <tr>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">時間 (Timestamp)</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">操作人員 (誰做了什麼)</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">功能模組</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">動作</th>
                  <th className="py-3 px-4 font-semibold">操作內容與異動說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800 font-sans">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Timestamp */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    {/* Operator */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-[10px]">
                          {log.operatorName.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span>{log.operatorName}</span>
                            <span className="text-[10px] text-stone-400 font-mono">({log.operatorEmployeeId})</span>
                          </div>
                          <div className="text-[10px] text-stone-400">{log.operatorRole}</div>
                        </div>
                      </div>
                    </td>

                    {/* Module */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-semibold">
                        {getModuleIcon(log.module)}
                        <span>{log.moduleLabel}</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getActionBadge(log.actionType, log.actionLabel)}
                    </td>

                    {/* Description & Details */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-stone-900">
                          {log.description}
                        </div>
                        {log.details && (
                          <div className="text-[11px] text-stone-500 font-mono bg-stone-50 px-2 py-1 rounded border border-stone-200/80 inline-block">
                            {log.details}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
