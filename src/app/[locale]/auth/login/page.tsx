'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';

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
        const { error: error2 } = await supabase.auth.signInWithOtp({
          email: normalised,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error2) throw error2;
      }
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('error'));
    }
  };

  return (
    <div className="min-h-screen bg-bold-dark flex flex-col">

      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gold radial glow bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,162,86,0.08) 0%, transparent 70%)' }} />
        {/* Red radial glow top-right */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.07) 0%, transparent 70%)' }} />
        {/* Mongolian diagonal stripe pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #C9A256 0px, #C9A256 1px,
              transparent 1px, transparent 24px
            )`,
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <div className="w-full max-w-sm">

          {/* Wordmark */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              {/* Bold "B" logo */}
              <div className="w-14 h-14 relative flex-shrink-0">
                <div className="absolute inset-0 bg-bold-gold rounded-sm" />
                <div className="absolute inset-[3px] bg-bold-dark rounded-sm flex items-center justify-center">
                  <span className="text-bold-gold font-black text-2xl tracking-tighter">B</span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-bold-light font-black text-xl tracking-wider uppercase leading-none">Bold</div>
                <div className="text-bold-muted text-[10px] uppercase tracking-[0.3em] mt-0.5">Design Studio</div>
              </div>
            </div>
            <div className="w-8 h-[1px] bg-bold-gold mx-auto mb-4" />
            <p className="text-bold-muted text-xs uppercase tracking-[0.2em]">Paris × Ulaanbaatar</p>
          </div>

          {/* Card */}
          <div className="bold-card rounded-sm overflow-hidden">

            {/* Card top stripe */}
            <div className="h-[2px] bg-gradient-to-r from-bold-gold via-bold-gold/60 to-transparent" />

            <div className="p-8">
              <div className="mb-7">
                <h1 className="text-bold-light font-bold text-lg tracking-wide mb-1">{t('title')}</h1>
                <p className="text-bold-muted text-xs leading-relaxed">{t('sub')}</p>
              </div>

              {status === 'success' ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 mx-auto bg-bold-gold/10 rounded-sm flex items-center justify-center">
                    <CheckCircle size={28} className="text-bold-gold" />
                  </div>
                  <div>
                    <p className="text-bold-light font-semibold text-sm mb-1">{t('success')}</p>
                    <p className="text-bold-muted text-xs">{email}</p>
                  </div>
                  <p className="text-bold-muted text-[10px] uppercase tracking-wider opacity-60">
                    Check your inbox · Vérifiez votre boîte · Имэйлээ шалгана уу
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] text-bold-muted block mb-2">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-bold-darker border border-bold-border rounded-sm px-4 py-3 text-sm
                        text-bold-light placeholder:text-bold-muted/30 focus:outline-none
                        focus:border-bold-gold transition-colors duration-200"
                      placeholder="boldamar@hotmail.fr"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/5 border border-red-500/20 rounded-sm px-3 py-2.5">
                      <AlertCircle size={13} className="flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5
                      bg-bold-gold text-bold-dark font-bold text-xs uppercase tracking-[0.15em]
                      rounded-sm hover:bg-bold-gold-light transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="inline-block w-4 h-4 border-2 border-bold-dark/30 border-t-bold-dark rounded-full animate-spin" />
                    ) : (
                      <Send size={13} />
                    )}
                    {status === 'loading' ? '...' : t('submit')}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-7 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-bold-muted hover:text-bold-gold transition-colors duration-200"
            >
              <ArrowLeft size={11} />
              {t('back')}
            </a>
          </div>

          {/* Tagline */}
          <p className="text-center text-[9px] uppercase tracking-[0.25em] text-bold-muted/40 mt-8">
            Bold Design © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
