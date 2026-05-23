'use client';

import { useTranslations } from 'next-intl';
import type { Tab } from '@/app/[locale]/page';

interface FooterProps {
  onTabChange: (tab: Tab) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bold-border bg-bold-darker mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 relative flex-shrink-0">
                <div className="absolute inset-0 bg-bold-gold rounded-sm" />
                <div className="absolute inset-[2px] bg-bold-darker rounded-sm flex items-center justify-center">
                  <span className="text-bold-gold font-black text-xs">B</span>
                </div>
              </div>
              <span className="text-bold-light font-semibold text-sm tracking-wider uppercase">Bold Design</span>
            </div>
            <p className="text-bold-muted text-sm leading-relaxed">{t('tagline')}</p>
            <div className="flex gap-2 mt-4">
              <div className="w-6 h-2 bg-bold-red rounded-full opacity-70" />
              <div className="w-6 h-2 bg-bold-gold rounded-full opacity-70" />
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs text-bold-muted uppercase tracking-widest mb-4">Navigation</h3>
            <nav className="space-y-2">
              {(['story', 'concepts', 'products', 'research', 'partners', 'shop'] as Tab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className="block text-sm text-bold-muted hover:text-bold-gold transition-colors"
                >
                  {nav(tab)}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs text-bold-muted uppercase tracking-widest mb-4">{t('contact')}</h3>
            <a
              href={`mailto:${t('email')}`}
              className="text-sm text-bold-muted hover:text-bold-gold transition-colors block mb-2"
            >
              {t('email')}
            </a>
            <p className="text-xs text-bold-muted mt-6 opacity-60">
              Khuselbold Amartuvshin<br />
              Paris, France
            </p>
          </div>
        </div>

        <div className="border-t border-bold-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-bold-muted opacity-50">
            © {year} Bold Design. {t('rights')}.
          </p>
          <div className="flex items-center gap-2 text-xs text-bold-muted opacity-50">
            <span>Built by</span>
            <a href="https://luvlab.io" target="_blank" rel="noopener noreferrer" className="hover:text-bold-gold transition-colors">
              luvlab.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
