'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Lock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ALLOWED_EMAILS = [
  'boldamar@hotmail.fr',
  'g@luvlab.io',
  'gordoncyrus@gmail.com',
  'info@luvlab.io',
];

export default function LoginPage() {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const normalised = email.toLowerCase().trim();
    if (!ALLOWED_EMAILS.includes(normalised)) {
      setStatus('error');
      setErrorMsg(t('error'));
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: normalised,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: false,
        },
      });

      if (error) {
        // For first-time users, try with creation
        const { error: error2 } = await supabase.auth.signInWithOtp({
          email: normalised,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error2) throw error2;
      }
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || t('error'));
    }
  };

  return (
    <div className="min-h-screen bg-bold-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 bg-bold-gold rounded-sm" />
            <div className="absolute inset-[3px] bg-bold-dark rounded-sm flex items-center justify-center">
              <span className="text-bold-gold font-black text-xl">B</span>
            </div>
          </div>
        </div>

        <div className="bold-card rounded-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-bold-gold/10 rounded-sm flex items-center justify-center">
              <Lock size={18} className="text-bold-gold" />
            </div>
            <div>
              <h1 className="text-bold-light font-semibold">{t('title')}</h1>
              <p className="text-bold-muted text-xs">{t('sub')}</p>
            </div>
          </div>

          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle size={40} className="text-bold-gold mx-auto mb-4" />
              <p className="text-bold-light font-medium mb-1">{t('success')}</p>
              <p className="text-bold-muted text-xs mt-2">{email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-bold-muted block mb-2">
                  {t('email')}
                </label>
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-bold-darker border border-bold-border rounded-sm px-4 py-3 text-sm text-bold-light
                    placeholder:text-bold-muted/40 focus:outline-none focus:border-bold-gold transition-colors"
                  placeholder="boldamar@hotmail.fr"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle size={14} />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit" disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-bold-gold text-bold-dark
                  font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-bold-gold-light
                  transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                {status === 'loading' ? '...' : t('submit')}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="flex items-center justify-center gap-2 text-xs text-bold-muted hover:text-bold-gold transition-colors">
            <ArrowLeft size={12} />
            {t('back')}
          </a>
        </div>
      </div>
    </div>
  );
}
