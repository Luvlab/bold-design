'use client';

import { useTranslations } from 'next-intl';
import { Package, CheckCircle, Circle, ExternalLink } from 'lucide-react';

const PRODUCTS_NOTION = [
  { name: 'Ramasse-monnaie inox rectangulaire avec clip', status: 'research', url: 'https://materiel.hellopro.fr/coupelle-ramasse-monnaie-inox-rectangulaire-avec-clip-2059988-3001541-produit.html' },
  { name: 'Porte-addition design', status: 'research', url: null },
  { name: 'Cendrier design', status: 'concept', url: null },
  { name: 'Bol olives / cacahouètes 60mm avec sous-tasse', status: 'concept', url: null },
  { name: 'Verre à bougie avec réceptoire de cire intérieur', status: 'concept', url: null },
  { name: 'Verre à sucre — Coupé 50/25/25', status: 'concept', url: null },
  { name: 'Tasse thé et café en verre', status: 'concept', url: null },
  { name: 'Verre bière 25cl et 50cl', status: 'concept', url: null },
  { name: 'Système réceptoire sous bouche bière à pression', status: 'concept', url: null },
  { name: 'Meuble accueil design', status: 'concept', url: null },
  { name: 'Meubles sur roulettes 446×1232mm', status: 'concept', url: null },
  { name: 'Meubles sur roulettes 504×1562mm', status: 'concept', url: null },
];

const STATUS_CONFIG = {
  research: { label: 'Recherche', color: 'text-bold-gold', dot: 'bg-bold-gold' },
  concept: { label: 'Concept', color: 'text-bold-muted', dot: 'bg-bold-muted' },
  dev: { label: 'En dev', color: 'text-blue-400', dot: 'bg-blue-400' },
  ready: { label: 'Prêt', color: 'text-green-400', dot: 'bg-green-400' },
};

export default function ProductsTab() {
  const t = useTranslations('products');

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-bold-light mb-2">{t('title')}</h2>
        <div className="w-16 h-[2px] bg-bold-gold mb-4" />
        <p className="text-bold-muted text-base max-w-2xl">{t('sub')}</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2 text-xs text-bold-muted">
            <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <span>{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS_NOTION.map((product, i) => {
          const cfg = STATUS_CONFIG[product.status as keyof typeof STATUS_CONFIG];
          return (
            <div key={i} className="bold-card rounded-sm p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="w-8 h-8 bg-bold-gold/10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Package size={14} className="text-bold-gold" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className={`text-[10px] uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
                </div>
              </div>

              <p className="text-bold-light text-sm font-medium leading-snug">{product.name}</p>

              {product.url && (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-bold-gold hover:text-bold-gold-light transition-colors"
                >
                  <ExternalLink size={11} />
                  Voir référence
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Materials checklist */}
      <div className="bold-card rounded-sm p-8">
        <h3 className="text-bold-light font-semibold mb-6 text-sm uppercase tracking-wider">
          {t('materials')} — Liste complète
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(t.raw('materiels_list') as string[]).map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-3">
              <Circle size={14} className="text-bold-border mt-0.5 flex-shrink-0" />
              <span className="text-bold-muted text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-bold-muted text-xs mt-6 italic opacity-60">{t('in_dev')}</p>
      </div>
    </div>
  );
}
