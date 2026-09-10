import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { BlogPost, BlogCategory } from '../../types';
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Clock, 
  Save, 
  X, 
  Tag, 
  FileText, 
  ExternalLink,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

export const BlogManagerTab: React.FC = () => {
  const { 
    blogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost, 
    toggleBlogPostPublish,
    setActivePage,
    setSelectedBlogPostId 
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<BlogCategory>('technical');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formAuthor, setFormAuthor] = useState('東南水泥技術研發處');
  const [formAuthorRole, setFormAuthorRole] = useState('材料研發工程團隊');
  const [formCoverImage, setFormCoverImage] = useState('/src/assets/images/sec_cement_hero_1789004287364.jpg');
  const [formTags, setFormTags] = useState('CNS 61, 混凝土配比, 施工技術');
  const [formReadTime, setFormReadTime] = useState('5 分鐘閱讀');
  const [formIsPublished, setFormIsPublished] = useState(true);

  const openNewPostForm = () => {
    setEditingPostId(null);
    setFormTitle('');
    setFormCategory('technical');
    setFormSummary('');
    setFormContent(`## 技術重點摘要\n\n在此輸入技術重點與施工背景...\n\n### 試驗方法與配比設計\n- 取代率控制：建議 30%～40%\n- 水膠比 W/B：0.40\n\n### 結論與現場建議\n依據 CNS 檢驗標準實施試拌驗證。`);
    setFormAuthor('東南水泥技術研發處');
    setFormAuthorRole('技術工程師');
    setFormCoverImage('/src/assets/images/sec_cement_hero_1789004287364.jpg');
    setFormTags('一型水泥, 水淬高爐石粉, 配比試驗');
    setFormReadTime('5 分鐘閱讀');
    setFormIsPublished(true);
    setIsFormOpen(true);
  };

  const openEditPostForm = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormSummary(post.summary);
    setFormContent(post.content);
    setFormAuthor(post.author);
    setFormAuthorRole(post.authorRole);
    setFormCoverImage(post.coverImage);
    setFormTags(post.tags.join(', '));
    setFormReadTime(post.readTime);
    setFormIsPublished(post.isPublished);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingPostId(null);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('請輸入專欄文章標題');
      return;
    }
    if (!formSummary.trim()) {
      alert('請填寫文章導讀摘要');
      return;
    }

    const tagList = formTags
      .split(/[,，]/)
      .map(t => t.trim())
      .filter(Boolean);

    const categoryLabels: Record<BlogCategory, string> = {
      technical: '工程技術規範',
      mix_design: '混凝土配比研發',
      project: '重大工程實績',
      esg: '永續低碳水泥',
      news: '廠區營運最新公告'
    };

    if (editingPostId) {
      updateBlogPost(editingPostId, {
        title: formTitle.trim(),
        category: formCategory,
        categoryLabel: categoryLabels[formCategory],
        summary: formSummary.trim(),
        content: formContent.trim(),
        author: formAuthor.trim(),
        authorRole: formAuthorRole.trim(),
        coverImage: formCoverImage.trim(),
        tags: tagList,
        readTime: formReadTime.trim(),
        isPublished: formIsPublished
      });
    } else {
      const slug = formTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30) || `article-${Date.now()}`;
      addBlogPost({
        title: formTitle.trim(),
        slug,
        category: formCategory,
        categoryLabel: categoryLabels[formCategory],
        summary: formSummary.trim(),
        content: formContent.trim(),
        author: formAuthor.trim(),
        authorRole: formAuthorRole.trim(),
        coverImage: formCoverImage.trim(),
        tags: tagList,
        readTime: formReadTime.trim(),
        isPublished: formIsPublished
      });
    }

    closeForm();
  };

  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`確定要刪除專欄文章《${title}》嗎？刪除後無法復原，並將記錄於系統操作日誌中。`)) {
      deleteBlogPost(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>工程技術專欄 & 文章管理</span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            發布與維護前台「技術專欄」文章，提供混凝土廠技術人員配比試驗、水化熱曲線分析與工程實績指南。所有新增與修改皆自動寫入操作日誌。
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('blog')}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-stone-500" />
            <span>預覽前台專欄頁</span>
          </button>
          <button
            onClick={openNewPostForm}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>新增專欄文章</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Drawer */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  {editingPostId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
                <div>
                  <h4 className="text-base font-bold text-stone-900">
                    {editingPostId ? '編輯技術專欄文章' : '撰寫新技術專欄文章'}
                  </h4>
                  <p className="text-xs text-stone-500">儲存後即時同步更新前台技術專欄列表</p>
                </div>
              </div>
              <button onClick={closeForm} className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSavePost} className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">文章標題 *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="例如：巨積混凝土水化熱抑制實務：以水淬高爐石粉最佳化配比分析"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">專欄分類 *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as BlogCategory)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900"
                  >
                    <option value="technical">工程技術規範</option>
                    <option value="mix_design">混凝土配比研發</option>
                    <option value="project">重大工程實績</option>
                    <option value="esg">永續低碳水泥</option>
                    <option value="news">廠區營運最新公告</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700">核心導讀摘要 (Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="簡短摘要（約 60～120 字），呈現於文章列表卡片及前台首頁導讀..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700">專欄內文 (支援分段與 Markdown 標題 ## / ### / 清單) *</label>
                  <span className="text-[11px] text-stone-400">可用 ## 主標題、### 次標題、- 清單項目</span>
                </div>
                <textarea
                  rows={9}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="文章詳細內容..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-xs text-stone-900 font-mono leading-relaxed focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">撰文作者/單位 *</label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">作者職稱/角色</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">預估閱讀時間</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">文章標籤 (用逗號隔開)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="CNS 61, 巨積混凝土, 水化熱"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">封面圖片網址 / 預設圖</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setFormCoverImage('/src/assets/images/sec_cement_type1_1789005287685.jpg')}
                      className="px-2.5 py-1 text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg whitespace-nowrap"
                    >
                      一型水泥圖
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormCoverImage('/src/assets/images/sec_slag_powder_1789004312307.jpg')}
                      className="px-2.5 py-1 text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg whitespace-nowrap"
                    >
                      爐石粉圖
                    </button>
                  </div>
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-900 block">文章發布狀態</span>
                  <span className="text-[11px] text-stone-500">
                    {formIsPublished ? '公開發布（所有訪客皆可在前台專欄瀏覽）' : '內部草稿（僅後台夥伴可見）'}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPublished}
                    onChange={(e) => setFormIsPublished(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
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
                  <span>{editingPostId ? '儲存並同步文章' : '立即發表專欄文章'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Articles Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700">
            全部專欄文章清單（共 {blogPosts.length} 篇）
          </span>
          <span className="text-xs text-stone-400">
            點擊發布狀態可快速切換前台公開或草稿
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4 font-semibold">文章標題 / 摘要</th>
                <th className="py-3.5 px-4 font-semibold">分類</th>
                <th className="py-3.5 px-4 font-semibold">撰寫單位 / 作者</th>
                <th className="py-3.5 px-4 font-semibold">發布日期 / 瀏覽</th>
                <th className="py-3.5 px-4 font-semibold text-center">狀態</th>
                <th className="py-3.5 px-4 font-semibold text-right">操作管理</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {blogPosts.map(post => (
                <tr key={post.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-4 px-4 max-w-md">
                    <div className="flex items-start gap-3">
                      <img
                        src={post.coverImage}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-14 h-10 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="font-bold text-stone-900 hover:text-amber-600 line-clamp-1">
                          {post.title}
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1">
                          {post.summary}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-semibold">
                      {post.categoryLabel}
                    </span>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-semibold text-stone-900">{post.author}</div>
                    <div className="text-[11px] text-stone-400">{post.authorRole}</div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-stone-500">
                    <div>{post.publishedAt}</div>
                    <div className="text-stone-400">{post.views} 次閱覽</div>
                  </td>

                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => toggleBlogPostPublish(post.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1 mx-auto ${
                        post.isPublished
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                      }`}
                      title="點擊切換發布狀態"
                    >
                      {post.isPublished ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>已公開發布</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-stone-500" />
                          <span>內部草稿</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedBlogPostId(post.id);
                          setActivePage('blog');
                        }}
                        className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
                        title="前台檢視"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditPostForm(post)}
                        className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg cursor-pointer"
                        title="編輯文章"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="刪除文章"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
