'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Shirt, Box, Leaf, Zap, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const POD_PARTNERS = [
  {
    name: 'TPOP',
    role: 'Merch & Vêtements',
    desc: 'Impression française, zéro plastique, GOTS/OCS/OEKO-TEX certifié.',
    url: 'https://www.tpop.com',
    badges: ['🇫🇷 Made in France', 'Zero plastique', 'GOTS certifié', 'DTF écologique'],
    icon: Shirt,
    color: 'text-bold-gold',
    bg: 'bg-bold-gold/10',
  },
  {
    name: 'Sculpteo',
    role: 'Objets 3D & CNC',
    desc: 'Impression 3D et découpe laser à Paris. Nylon PA12 recyclable, énergie renouvelable.',
    url: 'https://www.sculpteo.com',
    badges: ['Paris-based', 'PA12 recyclable', 'RE-Cycleo', 'API disponible'],
    icon: Box,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20',
  },
  {
    name: 'Teemill',
    role: 'Mode circulaire',
    desc: 'Mode circulaire — les produits reviennent, sont recyclés, refaits. GOTS + SA8000.',
    url: 'https://teemill.com',
    badges: ['Circular fashion', 'GOTS', 'Renouvelable 100%', 'Retour & recycle'],
    icon: Leaf,
    color: 'text-green-400',
    bg: 'bg-green-900/20',
  },
];

export default function ShopTab() {
  const t = useTranslations('shop');
  const [email, setEmail] = useState('');
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNotifyStatus('loading');
    try {
      const supabase = createClient();
      await supabase.from('newsletter').insert([{ email, source: 'shop_notify' }]);
      setNotifyStatus('success');
      setEmail('');
    } catch {
      setNotifyStatus('error');
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-bold-light mb-2">{t('title')}</h2>
        <div className="w-16 h-[2px] bg-bold-gold mb-4" />
        <p className="text-bold-muted text-base max-w-2xl">{t('sub')}</p>
      </div>

      {/* Coming soon banner */}
      <div className="relative overflow-hidden bold-card rounded-sm p-8 text-center">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A256 0%, transparent 70%)' }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-bold-gold/20 text-bold-gold text-xs uppercase tracking-wider rounded-full mb-4">
            <Zap size={12} />
            {t('coming_soon')}
          </div>
          <h3 className="text-bold-light text-2xl font-bold mb-3">La boutique arrive bientôt</h3>
          <p className="text-bold-muted text-sm mb-8 max-w-md mx-auto">
            Merch éco-responsable, objets 3D uniques, collections capsules Bold Design.
          </p>

          {notifyStatus === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-bold-gold">
              <CheckCircle size={16} />
              <span className="text-sm">{t('notify_success')}</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder={t('notify_email')}
                className="flex-1 bg-bold-darker border border-bold-border rounded-sm px-4 py-2.5 text-sm text-bold-light
                  placeholder:text-bold-muted/50 focus:outline-none focus:border-bold-gold transition-colors"
              />
              <button
                type="submit" disabled={notifyStatus === 'loading'}
                className="px-5 py-2.5 bg-bold-gold text-bold-dark font-semibold text-sm rounded-sm
                  hover:bg-bold-gold-light transition-colors disabled:opacity-50"
              >
                {t('notify')}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* POD Partners */}
      <div>
        <h3 className="text-xs text-bold-muted uppercase tracking-widest mb-6">Partenaires POD Écologiques</h3>
        <div className="grid md:grid-cols-3 gap-5">
          {POD_PARTNERS.map(partner => (
            <div key={partner.name} className="bold-card rounded-sm p-6 flex flex-col gap-4">
              <div className={`w-10 h-10 ${partner.bg} rounded-sm flex items-center justify-center`}>
                <partner.icon size={18} className={partner.color} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-bold-light font-semibold">{partner.name}</h4>
                  <a href={partner.url} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-bold-muted hover:text-bold-gold transition-colors">
                    ↗
                  </a>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-bold-muted mb-2">{partner.role}</p>
                <p className="text-bold-muted text-xs leading-relaxed">{partner.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-bold-border">
                {partner.badges.map(badge => (
                  <span key={badge} className="text-[9px] uppercase tracking-wider px-2 py-1 bg-bold-border/50 text-bold-muted rounded-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stripe note */}
      <div className="bold-card rounded-sm p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-purple-900/20 rounded-sm flex items-center justify-center flex-shrink-0">
          <Zap size={18} className="text-purple-400" />
        </div>
        <div>
          <h4 className="text-bold-light font-semibold mb-1 text-sm">Stripe Payments</h4>
          <p className="text-bold-muted text-xs leading-relaxed">
            Paiements sécurisés via Stripe. À configurer avec votre compte Stripe — envoyez un email à
            <a href="mailto:g@luvlab.io" className="text-bold-gold hover:underline ml-1">g@luvlab.io</a>
            pour finaliser l'intégration.
          </p>
        </div>
      </div>
    </div>
  );
}
