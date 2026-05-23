'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Handshake, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function PartnersTab() {
  const t = useTranslations('partners');
  const ft = useTranslations('partners.form');

  const [form, setForm] = useState({
    name: '', email: '', company: '', type: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const supabase = createClient();
      const { error } = await supabase.from('partner_requests').insert([{
        name: form.name,
        email: form.email,
        company: form.company,
        partnership_type: form.type,
        message: form.message,
      }]);

      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', company: '', type: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const partnerTypes = ft.raw('types') as string[];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-bold-light mb-2">{t('title')}</h2>
        <div className="w-16 h-[2px] bg-bold-gold mb-4" />
        <p className="text-bold-muted text-base max-w-2xl">{t('sub')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Why + Looking for */}
        <div className="space-y-8">
          <div className="bold-card rounded-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-bold-gold/10 rounded-sm flex items-center justify-center">
                <Handshake size={18} className="text-bold-gold" />
              </div>
              <h3 className="text-bold-light font-semibold text-sm uppercase tracking-wider">{t('why_title')}</h3>
            </div>
            <ul className="space-y-3">
              {(t.raw('why') as string[]).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={15} className="text-bold-gold mt-0.5 flex-shrink-0" />
                  <span className="text-bold-muted text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bold-card rounded-sm p-8">
            <h3 className="text-bold-light font-semibold text-sm uppercase tracking-wider mb-6">{t('looking_for')}</h3>
            <ul className="space-y-3">
              {(t.raw('looking') as string[]).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-bold-gold mt-2 flex-shrink-0" />
                  <span className="text-bold-muted text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="bold-card rounded-sm p-8">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
              <CheckCircle size={48} className="text-bold-gold" />
              <p className="text-bold-light font-semibold text-lg">{ft('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-bold-muted block mb-2">{ft('name')}</label>
                  <input
                    type="text" required
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-bold-darker border border-bold-border rounded-sm px-4 py-2.5 text-sm text-bold-light
                      focus:outline-none focus:border-bold-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-bold-muted block mb-2">{ft('email')}</label>
                  <input
                    type="email" required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-bold-darker border border-bold-border rounded-sm px-4 py-2.5 text-sm text-bold-light
                      focus:outline-none focus:border-bold-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-bold-muted block mb-2">{ft('company')}</label>
                <input
                  type="text"
                  value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full bg-bold-darker border border-bold-border rounded-sm px-4 py-2.5 text-sm text-bold-light
                    focus:outline-none focus:border-bold-gold transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-bold-muted block mb-2">{ft('type')}</label>
                <select
                  value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-bold-darker border border-bold-border rounded-sm px-4 py-2.5 text-sm text-bold-light
                    focus:outline-none focus:border-bold-gold transition-colors"
                >
                  <option value="">—</option>
                  {partnerTypes.map((type: string) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-bold-muted block mb-2">{ft('message')}</label>
                <textarea
                  required rows={4}
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-bold-darker border border-bold-border rounded-sm px-4 py-2.5 text-sm text-bold-light
                    focus:outline-none focus:border-bold-gold transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={14} />
                  {ft('error')}
                </div>
              )}

              <button
                type="submit" disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-bold-gold text-bold-dark
                  font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-bold-gold-light
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    <Send size={14} />
                    {ft('submit')}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
