'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Globe, Lock } from 'lucide-react';
import type { Tab } from '@/app/[locale]/page';

const TAB_ORDER: Tab[] = ['story', 'concepts', 'products', 'research', 'partners', 'shop'];

const LOCALES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'mn', label: 'Монгол', flag: '🇲🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLocale = LOCALES.find(l => l.code === locale) || LOCALES[0];

  const handleLocaleChange = (newLocale: string) => {
    setLangOpen(false);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    // Replace locale prefix in path
    const segments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = LOCALES.map(l => l.code).includes(segments[0]);
    const pathWithoutLocale = hasLocalePrefix ? '/' + segments.slice(1).join('/') : pathname;
    const newPath = newLocale === 'fr' ? pathWithoutLocale || '/' : `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-bold-dark/95 backdrop-blur-sm border-b border-bold-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => onTabChange('story')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-bold-gold rounded-sm" />
              <div className="absolute inset-[2px] bg-bold-dark rounded-sm flex items-center justify-center">
                <span className="text-bold-gold font-black text-sm">B</span>
              </div>
            </div>
            <span className="text-bold-light font-semibold text-sm tracking-wider uppercase group-hover:text-bold-gold transition-colors">
              Bold Design
            </span>
          </button>

          {/* Desktop tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {TAB_ORDER.map(tab => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-3 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-200 rounded-sm ${
                  activeTab === tab
                    ? 'text-bold-gold bg-bold-gold/10'
                    : 'text-bold-muted hover:text-bold-light hover:bg-bold-border/50'
                }`}
              >
                {t(tab)}
              </button>
            ))}
          </nav>

          {/* Right side: Lang + Admin */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-xs text-bold-muted hover:text-bold-light transition-colors rounded-sm border border-transparent hover:border-bold-border"
              >
                <Globe size={13} />
                <span>{currentLocale.flag} {currentLocale.code.toUpperCase()}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-bold-card border border-bold-border rounded-sm shadow-2xl z-50 overflow-hidden">
                  {LOCALES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => handleLocaleChange(l.code)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${
                        l.code === locale
                          ? 'text-bold-gold bg-bold-gold/10'
                          : 'text-bold-muted hover:text-bold-light hover:bg-bold-border/50'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin */}
            <a
              href="/auth/login"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-bold-muted hover:text-bold-gold border border-bold-border hover:border-bold-gold transition-all rounded-sm"
            >
              <Lock size={11} />
              <span className="uppercase tracking-wider">{t('admin')}</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-bold-muted hover:text-bold-light transition-colors p-1"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-bold-border bg-bold-card">
          {TAB_ORDER.map(tab => (
            <button
              key={tab}
              onClick={() => { onTabChange(tab); setMobileOpen(false); }}
              className={`w-full text-left px-6 py-3 text-sm uppercase tracking-wider transition-colors ${
                activeTab === tab ? 'text-bold-gold' : 'text-bold-muted hover:text-bold-light'
              }`}
            >
              {t(tab)}
            </button>
          ))}
          <a href="/auth/login" className="block px-6 py-3 text-sm text-bold-muted hover:text-bold-gold uppercase tracking-wider border-t border-bold-border">
            {t('admin')}
          </a>
        </div>
      )}

      {/* Click-outside close for lang dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </header>
  );
}
