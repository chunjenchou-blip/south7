import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { BlogPost, BlogCategory } from '../types';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Tag, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  X, 
  Share2, 
  FileText, 
  Building2, 
  Layers, 
  Sparkles,
  PhoneCall,
  Settings
} from 'lucide-react';

export const BlogView: React.FC = () => {
  const { 
    blogPosts, 
    activePage, 
    setActivePage, 
    selectedBlogPostId, 
    setSelectedBlogPostId,
    setIsShareModalOpen 
  } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(() => {
    if (selectedBlogPostId) {
      return blogPosts.find(p => p.id === selectedBlogPostId) || null;
    }
    return null;
  });

  // Only display published articles on frontend
  const publishedPosts = blogPosts.filter(p => p.isPublished);

  // Filter by category and search
  const filteredPosts = publishedPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query)) ||
      post.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const featuredPost = publishedPosts[0];

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: '全部專欄', count: publishedPosts.length },
    { id: 'technical', label: '工程技術規範', count: publishedPosts.filter(p => p.category === 'technical').length },
    { id: 'mix_design', label: '混凝土配比研發', count: publishedPosts.filter(p => p.category === 'mix_design').length },
    { id: 'project', label: '重大工程實績', count: publishedPosts.filter(p => p.category === 'project').length },
    { id: 'esg', label: '永續低碳水泥', count: publishedPosts.filter(p => p.category === 'esg').length },
    { id: 'news', label: '廠區營運最新公告', count: publishedPosts.filter(p => p.category === 'news').length }
  ];

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticle(post);
    setSelectedBlogPostId(post.id);
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    setSelectedBlogPostId(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans pb-24">
      {/* Top Breadcrumb & Page Banner */}
      <section className="bg-stone-900 text-white border-b border-stone-800 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-4 font-mono">
            <button 
              onClick={() => setActivePage('home')}
              className="hover:text-amber-400 cursor-pointer"
            >
              首頁
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-400">工程技術專欄 & 最新動態</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>東南水泥研發中心 · 工程技術智庫</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                水泥工程技術專欄 & 現場配比實務
              </h1>
              <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
                由東南水泥 TAF 國家級認證品保實驗室與技術研發團隊撰寫，深入剖析巨積混凝土水化熱抑制、需水量穩定性控制、高爐石粉減碳配比與重大建設供料實績。
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActivePage('admin')}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                title="前往後台發表新文章"
              >
                <Settings className="w-4 h-4 text-amber-400" />
                <span>後台發布/管理文章</span>
              </button>
              <button
                onClick={() => setActivePage('contact')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>配比諮詢 / 索取樣品</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Search & Category Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-stone-200 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋技術關鍵字（例如：水化熱、坍度、巨積混凝土、高爐石粉）..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-2">
              <span>已發布技術專欄共 <strong>{publishedPosts.length}</strong> 篇</span>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-amber-600 text-stone-950 font-bold' : 'bg-stone-200 text-stone-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Top Article (Shown when no active search/filter) */}
        {selectedCategory === 'all' && !searchQuery && featuredPost && (
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl overflow-hidden border border-stone-800 text-white shadow-lg grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider">
                    精選技術觀點
                  </span>
                  <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.publishedAt}
                  </span>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 
                  onClick={() => handleOpenArticle(featuredPost)}
                  className="text-xl sm:text-3xl font-extrabold text-white hover:text-amber-400 cursor-pointer transition-colors leading-tight"
                >
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-stone-300 leading-relaxed line-clamp-3">
                  {featuredPost.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredPost.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-stone-800 text-stone-300 text-xs border border-stone-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                    SEC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{featuredPost.author}</div>
                    <div className="text-[11px] text-stone-400">{featuredPost.authorRole}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenArticle(featuredPost)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all group"
                >
                  <span>閱讀完整報告</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-stone-800">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent lg:hidden"></div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>
                {selectedCategory === 'all' ? '所有發表文章與技術通報' : categories.find(c => c.id === selectedCategory)?.label}
              </span>
              <span className="text-xs text-stone-400 font-normal">（共 {filteredPosts.length} 篇）</span>
            </h3>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
              <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
              <h4 className="text-base font-bold text-stone-800">查無相符的文章</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                找不到符合搜尋關鍵字「{searchQuery}」的專欄文章，請嘗試更換分類或清除搜尋條件。
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
              >
                重設篩選條件
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col group cursor-pointer"
                  onClick={() => handleOpenArticle(post)}
                >
                  {/* Article Cover */}
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-amber-400 text-[11px] font-bold">
                        {post.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.publishedAt}</span>
                        <span>·</span>
                        <Eye className="w-3.5 h-3.5" />
                        <span>{post.views} 次閱讀</span>
                      </div>

                      <h4 className="text-base font-bold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>

                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-stone-50 text-stone-600 text-[10px] border border-stone-200">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-700">{post.author}</span>
                        </div>
                        <span className="text-amber-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>詳細內容</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Technical Guidance Bottom Banner */}
        <div className="bg-stone-900 text-stone-200 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>預拌混凝土廠專屬技術協同</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              需要針對特殊工程標案量身試拌混凝土配比嗎？
            </h4>
            <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
              東南水泥技術研發處配備 TAF 國家級標準實驗室，免費協助各大預拌廠客戶進行水化熱曲線預測、早期/28天強度比對試拌，並提供完整的專案抗裂配比分析報告。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-md text-center cursor-pointer transition-colors whitespace-nowrap"
            >
              申請免費技術配比諮詢
            </button>
          </div>
        </div>
      </div>

      {/* Article Detail Modal View */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="relative bg-white text-stone-900 rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  {activeArticle.categoryLabel}
                </span>
                <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                  {activeArticle.publishedAt} · {activeArticle.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                  title="分享此專欄文章"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCloseArticle}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
              
              {/* Article Title & Author Header */}
              <div className="space-y-4">
                <h1 className="text-xl sm:text-3xl font-extrabold text-stone-950 tracking-tight leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                      SEC
                    </div>
                    <div>
                      <div className="font-bold text-stone-900">{activeArticle.author}</div>
                      <div className="text-stone-500">{activeArticle.authorRole}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-stone-500 font-mono">
                    <span>發布日期：{activeArticle.publishedAt}</span>
                    <span>閱覽次數：{activeArticle.views}</span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="aspect-[16/9] max-h-[380px] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Summary Lead Box */}
              <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-2xl p-5 text-sm sm:text-base text-stone-800 leading-relaxed italic">
                <strong className="block text-xs uppercase tracking-wider text-amber-900 font-bold not-italic mb-1">
                  專欄核心導讀 (Abstract)
                </strong>
                {activeArticle.summary}
              </div>

              {/* Formatted Article Body */}
              <div className="prose max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-6">
                {activeArticle.content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-lg sm:text-xl font-extrabold text-stone-950 border-b border-stone-200 pb-2 pt-4">
                        {block.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (block.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-base sm:text-lg font-bold text-amber-800 pt-2">
                        {block.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (block.includes('\n- ')) {
                    const lines = block.split('\n');
                    const header = lines[0];
                    const items = lines.slice(1);
                    return (
                      <div key={idx} className="space-y-2">
                        {header && <p className="font-semibold text-stone-900">{header}</p>}
                        <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
                          {items.map((item, itemIdx) => (
                            <li key={itemIdx}>{item.replace(/^- /, '')}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  if (block.includes('\n1. ')) {
                    const lines = block.split('\n');
                    return (
                      <ol key={idx} className="list-decimal pl-5 space-y-2 text-stone-700">
                        {lines.map((line, lIdx) => (
                          <li key={lIdx}>{line.replace(/^\d+\. /, '')}</li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={idx} className="text-stone-700 leading-relaxed">
                      {block}
                    </p>
                  );
                })}
              </div>

              {/* Tags and Disclaimer */}
              <div className="pt-6 border-t border-stone-200 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-500 font-semibold">文章標籤：</span>
                  {activeArticle.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs border border-stone-200">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-stone-50 text-xs text-stone-500 leading-relaxed border border-stone-200">
                  <strong>免責聲明與著作權標示：</strong>本專欄所有技術文章、試驗數據與配比分析均為東南水泥股份有限公司智慧財產權。數據僅供各大預拌混凝土廠及營建承包商作為配比設計指引參考，實際施工應依工程契約規範及現地試拌報告為準。
                </div>
              </div>
            </div>

            {/* Modal Footer CTA Bar */}
            <div className="sticky bottom-0 bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600 text-center sm:text-left">
                <span>對本篇專欄配比有疑問？歡迎與東南水泥技術研發處交流洽詢</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    handleCloseArticle();
                    setActivePage('contact');
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>聯絡技術研發處</span>
                </button>
                <button
                  onClick={handleCloseArticle}
                  className="px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl border border-stone-300 cursor-pointer"
                >
                  關閉
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
