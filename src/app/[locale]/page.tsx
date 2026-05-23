'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import HomeTab from '@/components/tabs/HomeTab';
import ConceptsTab from '@/components/tabs/ConceptsTab';
import ProductsTab from '@/components/tabs/ProductsTab';
import ResearchTab from '@/components/tabs/ResearchTab';
import PartnersTab from '@/components/tabs/PartnersTab';
import ShopTab from '@/components/tabs/ShopTab';
import Footer from '@/components/Footer';

export type Tab = 'story' | 'concepts' | 'products' | 'research' | 'partners' | 'shop';

const tabs: Tab[] = ['story', 'concepts', 'products', 'research', 'partners', 'shop'];

export default function HomePage() {
  const t = useTranslations('nav');
  const [activeTab, setActiveTab] = useState<Tab>('story');
  const [key, setKey] = useState(0);

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (tabs.includes(hash)) setActiveTab(hash);
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setKey(k => k + 1);
    window.history.replaceState(null, '', `#${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Hero */}
      {activeTab === 'story' && <HeroSection onCta={() => handleTabChange('concepts')} onPartner={() => handleTabChange('partners')} />}

      {/* Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div key={key} className="tab-content-enter">
          {activeTab === 'story' && <HomeTab />}
          {activeTab === 'concepts' && <ConceptsTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'research' && <ResearchTab />}
          {activeTab === 'partners' && <PartnersTab />}
          {activeTab === 'shop' && <ShopTab />}
        </div>
      </main>

      <Footer onTabChange={handleTabChange} />
    </div>
  );
}

function HeroSection({ onCta, onPartner }: { onCta: () => void; onPartner: () => void }) {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden border-b border-bold-border">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C9A256 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #C41E3A 0%, transparent 40%)`,
        }}
      />

      {/* Mongolian-inspired geometric accent */}
      <div className="absolute top-0 right-0 w-64 h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9A256 0px, #C9A256 1px,
            transparent 1px, transparent 20px
          )`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        {/* Mongolia-France flag accent */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[3px] bg-bold-red" />
          <span className="text-bold-muted text-sm tracking-[0.3em] uppercase font-light">
            Paris × Oulan-Bator
          </span>
          <div className="w-8 h-[3px] bg-bold-gold" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          style={{ whiteSpace: 'pre-line' }}>
          <span className="text-bold-light">{t('tagline').split('\n')[0]}</span>
          <br />
          <span className="text-gold-gradient">{t('tagline').split('\n')[1]}</span>
        </h1>

        <p className="text-bold-muted text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          {t('sub')}
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={onCta}
            className="px-8 py-4 bg-bold-gold text-bold-dark font-semibold text-sm tracking-wider uppercase
              hover:bg-bold-gold-light transition-all duration-200 rounded-sm"
          >
            {t('cta')}
          </button>
          <button
            onClick={onPartner}
            className="px-8 py-4 border border-bold-gold text-bold-gold font-semibold text-sm tracking-wider uppercase
              hover:bg-bold-gold hover:text-bold-dark transition-all duration-200 rounded-sm"
          >
            {t('partner_cta')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-bold-border max-w-lg">
          {[
            { n: '10+', label: 'Années d\'expérience' },
            { n: '5', label: 'Concepts actifs' },
            { n: '∞', label: 'Ambition' },
          ].map(s => (
            <div key={s.n}>
              <div className="text-2xl font-bold text-bold-gold">{s.n}</div>
              <div className="text-xs text-bold-muted mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
