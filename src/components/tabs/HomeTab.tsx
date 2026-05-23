'use client';

import { useTranslations } from 'next-intl';
import { Mountain, Utensils, Star } from 'lucide-react';

export default function HomeTab() {
  const t = useTranslations('story');

  return (
    <div className="max-w-4xl mx-auto space-y-16">

      {/* Title */}
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-bold-light mb-2">{t('title')}</h2>
        <div className="w-16 h-[2px] bg-bold-gold" />
      </div>

      {/* Story paragraphs */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <p className="text-bold-muted text-base leading-relaxed">{t('p1')}</p>
          <p className="text-bold-muted text-base leading-relaxed">{t('p2')}</p>
        </div>
        <div>
          {/* Quote */}
          <div className="border-l-2 border-bold-gold pl-6 py-2">
            <blockquote className="text-bold-light text-lg italic leading-relaxed">
              {t('quote')}
            </blockquote>
          </div>
          <p className="text-bold-muted text-base leading-relaxed mt-6">{t('p3')}</p>
        </div>
      </div>

      {/* Mission + Mongolia */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bold-card p-8 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-bold-gold/10 rounded-sm flex items-center justify-center">
              <Star size={18} className="text-bold-gold" />
            </div>
            <h3 className="text-bold-light font-semibold text-sm tracking-wider uppercase">
              {t('mission_title')}
            </h3>
          </div>
          <p className="text-bold-muted text-sm leading-relaxed">{t('mission')}</p>
        </div>

        <div className="bold-card p-8 rounded-sm relative overflow-hidden">
          {/* Mongolia flag colours */}
          <div className="absolute top-0 left-0 w-1 h-full bg-bold-red" />
          <div className="absolute top-0 left-1 w-1 h-full bg-bold-gold" />
          <div className="pl-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-bold-red/10 rounded-sm flex items-center justify-center">
                <Mountain size={18} className="text-bold-red" />
              </div>
              <h3 className="text-bold-light font-semibold text-sm tracking-wider uppercase">
                {t('mongolia_title')}
              </h3>
            </div>
            <p className="text-bold-muted text-sm leading-relaxed">{t('mongolia')}</p>
          </div>
        </div>
      </div>

      {/* Journey timeline */}
      <div>
        <h3 className="text-xs text-bold-muted uppercase tracking-widest mb-8">Parcours</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-bold-border" />
          {[
            { year: 'Mongolie', icon: Mountain, title: 'Naissance', desc: 'Né dans les steppes de Mongolie. Les racines qui définissent tout.', color: 'text-bold-red' },
            { year: 'Paris', icon: Utensils, title: 'Arrivée à Paris', desc: 'Découverte de la gastronomie française. Un monde de saveurs et de rigueur.', color: 'text-bold-gold' },
            { year: 'Formation', icon: Star, title: 'Expérience terrain', desc: 'Années dans les meilleures cuisines parisiennes. De la plonge à la direction.', color: 'text-bold-gold' },
            { year: 'Aujourd\'hui', icon: Star, title: 'Bold Design', desc: 'Création d\'objets et de concepts pour révolutionner la restauration.', color: 'text-bold-gold' },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 pb-10 relative">
              <div className={`w-8 h-8 rounded-full bg-bold-card border border-bold-border flex items-center justify-center flex-shrink-0 relative z-10`}>
                <item.icon size={14} className={item.color} />
              </div>
              <div>
                <span className={`text-xs uppercase tracking-wider font-medium ${item.color}`}>{item.year}</span>
                <h4 className="text-bold-light font-medium mt-1 mb-1">{item.title}</h4>
                <p className="text-bold-muted text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
