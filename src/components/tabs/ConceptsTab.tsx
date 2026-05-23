'use client';

import { useTranslations } from 'next-intl';
import { ShoppingBag, Coffee, Truck, Star, Flag, ArrowRight } from 'lucide-react';

const CONCEPTS = [
  {
    key: 'street' as const,
    icon: ShoppingBag,
    color: 'text-bold-gold',
    bg: 'bg-bold-gold/10',
    border: 'border-bold-gold/30',
    tags: ['Street food', 'Fast casual', 'Rue de Paris'],
  },
  {
    key: 'bistro' as const,
    icon: Coffee,
    color: 'text-bold-light',
    bg: 'bg-bold-border/50',
    border: 'border-bold-border',
    tags: ['Bistrot', 'Vin naturel', 'Carte courte'],
  },
  {
    key: 'foodtruck' as const,
    icon: Truck,
    color: 'text-bold-gold',
    bg: 'bg-bold-gold/10',
    border: 'border-bold-gold/30',
    tags: ['Mobile', 'Events', 'Marchés'],
  },
  {
    key: 'gastro' as const,
    icon: Star,
    color: 'text-bold-gold-light',
    bg: 'bg-yellow-900/10',
    border: 'border-yellow-700/20',
    tags: ['Fine dining', 'Tasting menu', 'Fusion'],
  },
  {
    key: 'mongolia' as const,
    icon: Flag,
    color: 'text-bold-red',
    bg: 'bg-bold-red/10',
    border: 'border-bold-red/30',
    tags: ['Oulan-Bator', 'Formation', 'Export'],
    featured: true,
  },
];

export default function ConceptsTab() {
  const t = useTranslations('concepts');

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-bold-light mb-2">{t('title')}</h2>
        <div className="w-16 h-[2px] bg-bold-gold mb-4" />
        <p className="text-bold-muted text-base max-w-2xl">{t('sub')}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CONCEPTS.map(concept => (
          <div
            key={concept.key}
            className={`bold-card rounded-sm p-7 flex flex-col gap-5 ${
              concept.featured ? 'md:col-span-2 lg:col-span-1 border-bold-red/40 bg-gradient-to-br from-bold-red/5 to-bold-card' : ''
            }`}
          >
            <div className={`w-12 h-12 ${concept.bg} rounded-sm flex items-center justify-center`}>
              <concept.icon size={22} className={concept.color} />
            </div>

            <div className="flex-1">
              <h3 className="text-bold-light font-semibold text-lg mb-2">{t(`${concept.key}.title`)}</h3>
              <p className="text-bold-muted text-sm leading-relaxed">{t(`${concept.key}.desc`)}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {concept.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-2 py-1 bg-bold-border/50 text-bold-muted rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bold-card rounded-sm p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-bold-light font-semibold mb-1">Un projet en tête ?</h3>
          <p className="text-bold-muted text-sm">Discutons de votre concept de restauration.</p>
        </div>
        <a
          href="mailto:boldamar@hotmail.fr?subject=Concept Restauration"
          className="flex items-center gap-2 px-6 py-3 bg-bold-gold text-bold-dark font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-bold-gold-light transition-colors whitespace-nowrap"
        >
          {t('contact_concept')}
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
