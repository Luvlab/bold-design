'use client';

import { useTranslations } from 'next-intl';
import { Search, ExternalLink, Image } from 'lucide-react';

const RESEARCH_ITEMS = [
  {
    key: 'wood_geek',
    source: 'Wood Geek Store',
    sourceUrl: null,
    category: 'Bois & matériaux',
    notionId: '8bb9f7f7-8ebe-4c07-adab-96943e5ce41e',
  },
  {
    key: 'walmart_hardwood',
    source: 'Walmart',
    sourceUrl: null,
    category: 'Bois & matériaux',
    notionId: '42dff31e-8175-4ee3-bd71-cac101aa685a',
  },
  {
    key: 'ramasse_monnaie',
    source: 'HelloPro',
    sourceUrl: 'https://materiel.hellopro.fr/coupelle-ramasse-monnaie-inox-rectangulaire-avec-clip-2059988-3001541-produit.html',
    category: 'Accessoires table',
    notionId: '7ac5621a-454f-4d7c-93ad-196670658a11',
  },
  {
    key: 'porte_addition',
    source: 'Référence pro',
    sourceUrl: null,
    category: 'Accessoires table',
    notionId: '230ee9bd-abba-4748-901d-71834e024a11',
  },
];

export default function ResearchTab() {
  const t = useTranslations('research');

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-bold-light mb-2">{t('title')}</h2>
        <div className="w-16 h-[2px] bg-bold-gold mb-4" />
        <p className="text-bold-muted text-base max-w-2xl">{t('sub')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {RESEARCH_ITEMS.map(item => (
          <div key={item.key} className="bold-card rounded-sm overflow-hidden">
            {/* Category tag */}
            <div className="bg-bold-gold/10 border-b border-bold-border px-5 py-2 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-bold-gold">{item.category}</span>
              <div className="flex items-center gap-1.5 text-[10px] text-bold-muted">
                <Search size={10} />
                <span>Notion Research</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-bold-border/50 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Image size={16} className="text-bold-muted" />
                </div>
                <div className="flex-1">
                  <h3 className="text-bold-light font-semibold mb-1">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-bold-muted text-sm leading-relaxed">
                    {t(`items.${item.key}.desc`)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-bold-border">
                <span className="text-xs text-bold-muted">Source: {item.source}</span>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-bold-gold hover:text-bold-gold-light transition-colors"
                  >
                    <ExternalLink size={11} />
                    Voir
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add research note */}
      <div className="text-center py-8 border border-dashed border-bold-border rounded-sm">
        <Search size={24} className="text-bold-muted mx-auto mb-3 opacity-50" />
        <p className="text-bold-muted text-sm">Données importées depuis Notion. En cours d'expansion.</p>
      </div>
    </div>
  );
}
