import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  Globe
} from 'lucide-react';

export const SocialShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, activePage } = useProducts();
  const [copied, setCopied] = useState(false);
  const [activePlatformTab, setActivePlatformTab] = useState<'threads' | 'facebook' | 'line'>('threads');

  if (!isShareModalOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.secement.com.tw';
  const ogTitle = '東南水泥股份有限公司 | 一型水泥．高爐石粉 官方品牌網';
  const ogDescription = '深耕台灣一甲子。專為預拌混凝土廠及建材經銷商提供CNS認證一型水泥與高爐石粉，提供24H穩定供料、專屬技術物性表與散裝槽車直配調度。';
  const ogImage = '/og-image.jpg';

  const shareTextForSocial = `${ogTitle}\n${ogDescription}\n${currentUrl}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenShare = (platform: 'threads' | 'facebook' | 'line') => {
    let targetUrl = '';
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(`${ogTitle} - 預拌混凝土廠與建材行大宗採購首選：${currentUrl}`);

    if (platform === 'threads') {
      targetUrl = `https://threads.net/intent/post?text=${encodedText}`;
    } else if (platform === 'facebook') {
      targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    } else if (platform === 'line') {
      targetUrl = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
    }

    window.open(targetUrl, '_blank', 'noopener,noreferrer,width=640,height=580');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-stone-900 border border-stone-700 rounded-xl shadow-2xl max-w-xl w-full text-stone-100 overflow-hidden relative animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">社群分享與預覽設定</h3>
              <p className="text-xs text-stone-400">符合 Open Graph 規範，分享到 Threads / Facebook / LINE 呈現精準品牌形象</p>
            </div>
          </div>
          <button
            id="close-share-modal-btn"
            onClick={() => setIsShareModalOpen(false)}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Platform preview switch tabs */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              即時社群預覽卡片切換
            </span>
            <div className="flex gap-1.5 bg-stone-950 p-1 rounded-lg border border-stone-800">
              <button
                onClick={() => setActivePlatformTab('threads')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activePlatformTab === 'threads' 
                    ? 'bg-stone-800 text-white font-bold shadow-sm' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Threads 預覽
              </button>
              <button
                onClick={() => setActivePlatformTab('facebook')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activePlatformTab === 'facebook' 
                    ? 'bg-blue-600/30 text-blue-300 font-bold border border-blue-500/40 shadow-sm' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Facebook 預覽
              </button>
              <button
                onClick={() => setActivePlatformTab('line')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activePlatformTab === 'line' 
                    ? 'bg-emerald-600/30 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                LINE 預覽
              </button>
            </div>
          </div>

          {/* Realistic Card Previews */}
          {activePlatformTab === 'threads' && (
            <div className="bg-black border border-stone-800 rounded-xl p-4 space-y-3 font-sans shadow-lg">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="font-semibold text-stone-200">secement_official</span>
                <span className="text-stone-600">· 剛剛</span>
              </div>
              <p className="text-sm text-stone-200">
                東南水泥股份有限公司：專為混凝土廠與建材行打造的大宗水泥與爐石粉穩定供料網絡。
              </p>
              {/* Threads Link Card */}
              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950 hover:border-stone-700 transition-colors">
                <div className="relative aspect-[16/9] w-full bg-stone-900 overflow-hidden">
                  <img 
                    src={ogImage} 
                    alt={ogTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute bottom-2 left-2 bg-stone-900/80 text-[10px] text-stone-300 px-2 py-0.5 rounded backdrop-blur-sm">
                    secement.com.tw
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-stone-500">secement.com.tw</p>
                  <h4 className="text-sm font-bold text-white line-clamp-1 mt-0.5">{ogTitle}</h4>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1">{ogDescription}</p>
                </div>
              </div>
            </div>
          )}

          {activePlatformTab === 'facebook' && (
            <div className="bg-[#18191a] border border-[#3a3b3c] rounded-xl p-4 space-y-3 font-sans shadow-lg text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-stone-700 flex items-center justify-center font-bold text-amber-400 text-xs">
                  東南
                </div>
                <div>
                  <div className="text-xs font-semibold">東南水泥股份有限公司</div>
                  <div className="text-[11px] text-stone-400">贊助內容 / 官方公告</div>
                </div>
              </div>
              <p className="text-sm text-stone-200">
                混凝土廠與建材行採購注意！東南水泥一型卜特蘭水泥與高爐石粉提供24H槽車快速提料與TAF試驗成績書。
              </p>
              {/* Facebook Link Card */}
              <div className="border border-[#3a3b3c] rounded-lg overflow-hidden bg-[#242526]">
                <div className="aspect-[1.91/1] w-full overflow-hidden bg-stone-900">
                  <img 
                    src={ogImage} 
                    alt={ogTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-3">
                  <div className="text-[11px] text-stone-400 uppercase tracking-wide">SECEMENT.COM.TW</div>
                  <div className="font-bold text-sm text-white line-clamp-1 mt-0.5">{ogTitle}</div>
                  <div className="text-xs text-stone-400 line-clamp-2 mt-1">{ogDescription}</div>
                </div>
              </div>
            </div>
          )}

          {activePlatformTab === 'line' && (
            <div className="bg-[#1e1e1e] border border-stone-800 rounded-xl p-4 space-y-3 font-sans shadow-lg">
              <div className="inline-block bg-[#00b900] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                LINE 訊息預覽
              </div>
              <div className="border border-stone-700 rounded-xl overflow-hidden bg-stone-900 max-w-sm">
                <div className="aspect-[16/9] w-full bg-stone-800">
                  <img 
                    src={ogImage} 
                    alt={ogTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{ogTitle}</h4>
                  <p className="text-xs text-stone-400 line-clamp-2 mt-1">{ogDescription}</p>
                  <p className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    secement.com.tw
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Share Action Buttons */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              立即分享至社群平台
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                id="share-to-threads-btn"
                onClick={() => handleOpenShare('threads')}
                className="w-full py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium rounded-lg border border-stone-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>發布至 Threads</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </button>

              <button
                id="share-to-facebook-btn"
                onClick={() => handleOpenShare('facebook')}
                className="w-full py-2.5 px-3 bg-blue-900/60 hover:bg-blue-800 text-blue-100 text-xs font-medium rounded-lg border border-blue-700/60 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>分享至 Facebook</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
              </button>

              <button
                id="share-to-line-btn"
                onClick={() => handleOpenShare('line')}
                className="w-full py-2.5 px-3 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 text-xs font-medium rounded-lg border border-emerald-700/60 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>轉傳至 LINE 群組</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
              </button>
            </div>
          </div>

          {/* Copy Link input box */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-300">
              官網專屬連結（可直接複製發送給混凝土廠同仁或採購窗口）：
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-stone-950 border border-stone-800 text-stone-300 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-amber-500"
              />
              <button
                id="copy-link-btn"
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>已複製！</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>複製連結</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Open Graph Meta details */}
          <div className="bg-stone-950 border border-stone-800/80 rounded-lg p-3 text-[11px] text-stone-400 space-y-1 font-mono">
            <div className="text-stone-300 font-sans font-semibold mb-1 text-xs">已注入之社交分享標記 (HTML Head)：</div>
            <div className="truncate"><span className="text-amber-400">&lt;meta property="og:title"</span> content="{ogTitle}" /&gt;</div>
            <div className="truncate"><span className="text-amber-400">&lt;meta property="og:image"</span> content="{ogImage}" /&gt;</div>
            <div className="truncate"><span className="text-amber-400">&lt;meta name="twitter:card"</span> content="summary_large_image" /&gt;</div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg cursor-pointer transition-colors"
          >
            完成關閉
          </button>
        </div>
      </div>
    </div>
  );
};
