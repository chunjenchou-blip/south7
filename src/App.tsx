import React from 'react';
import { ProductProvider, useProducts } from './context/ProductContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { BlogView } from './views/BlogView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SocialShareModal } from './components/SocialShareModal';
import { PhoneCall, Share2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activePage, setActivePage, setIsShareModalOpen } = useProducts();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-stone-800 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'products' && <ProductsView />}
        {activePage === 'blog' && <BlogView />}
        {activePage === 'contact' && <ContactView />}
        {activePage === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ProductDetailModal />
      <SocialShareModal />

      {/* Floating Fast Action Widget on mobile & desktop */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5 items-end">
        <button
          id="floating-share-btn"
          onClick={() => setIsShareModalOpen(true)}
          className="w-10 h-10 rounded-full bg-stone-900/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 shadow-lg flex items-center justify-center cursor-pointer transition-all hover:scale-105"
          title="社群分享預覽 (Threads / FB)"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {activePage !== 'contact' && (
          <button
            id="floating-quote-btn"
            onClick={() => setActivePage('contact')}
            className="px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline">大宗採購詢價 / 24H 槽車排班</span>
            <span className="sm:hidden">採購詢價</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ProductProvider>
      <MainAppContent />
    </ProductProvider>
  );
}
