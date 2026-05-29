import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';

const intlMiddleware = createMiddleware(routing);

// Country → locale mapping
const COUNTRY_LOCALE: Record<string, string> = {
  MN: 'mn', // Mongolia
  FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', CI: 'fr', SN: 'fr', CM: 'fr', // French
  CN: 'zh', TW: 'zh', HK: 'zh', SG: 'zh', // Chinese
  SA: 'ar', AE: 'ar', EG: 'ar', MA: 'ar', DZ: 'ar', IQ: 'ar', JO: 'ar', // Arabic
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', // Spanish
  BR: 'pt', PT: 'pt', AO: 'pt', MZ: 'pt', // Portuguese
  DE: 'de', AT: 'de', LI: 'de', // German
  JP: 'ja', // Japanese
  KR: 'ko', // Korean
  RU: 'ru', KZ: 'ru', BY: 'ru', // Russian
  IN: 'hi', // Hindi
};

// All supported locales from routing config
const SUPPORTED_LOCALES = routing.locales as readonly string[];
const DEFAULT_LOCALE = routing.defaultLocale;

/**
 * Get preferred locale:
 * 1. User-set cookie (NEXT_LOCALE) — respects manual language switcher
 * 2. IP geolocation (Vercel header x-vercel-ip-country)
 * 3. Accept-Language header
 * 4. Default (fr)
 */
function getPreferredLocale(request: NextRequest): { locale: string; source: 'cookie' | 'geo' | 'accept' | 'default' } {
  // 1. Check user-set cookie (set by language switcher)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return { locale: cookieLocale, source: 'cookie' };
  }

  // 2. Vercel geo header (accurate, free, no extra API call)
  const country = request.headers.get('x-vercel-ip-country');
  if (country && COUNTRY_LOCALE[country]) {
    const geoLocale = COUNTRY_LOCALE[country];
    if (SUPPORTED_LOCALES.includes(geoLocale)) {
      return { locale: geoLocale, source: 'geo' };
    }
  }

  // 3. Accept-Language header fallback
  const acceptLang = request.headers.get('accept-language');
  if (acceptLang) {
    const langs = acceptLang.split(',').map(l => l.split(';')[0].trim().split('-')[0].toLowerCase());
    for (const lang of langs) {
      if (SUPPORTED_LOCALES.includes(lang)) {
        return { locale: lang, source: 'accept' };
      }
    }
  }

  return { locale: DEFAULT_LOCALE, source: 'default' };
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip auth callback
  if (pathname.startsWith('/auth/callback')) {
    return NextResponse.next();
  }

  // 2. Guard admin routes
  if (pathname.includes('/admin')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => request.cookies.getAll(), setAll: () => {} } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Geo-IP locale redirect on first visit (no NEXT_LOCALE cookie set)
  const hasUserPref = request.cookies.get('NEXT_LOCALE')?.value;
  if (!hasUserPref) {
    const { locale, source } = getPreferredLocale(request);

    // Only redirect if not already on correct locale path
    const pathLocale = pathname.split('/')[1];
    const isAlreadyLocaled = SUPPORTED_LOCALES.includes(pathLocale);
    const currentLocale = isAlreadyLocaled ? pathLocale : DEFAULT_LOCALE;

    if (locale !== currentLocale && source !== 'default') {
      // Build redirect to locale-prefixed path
      const newPath = locale === DEFAULT_LOCALE
        ? pathname  // fr has no prefix (as-needed)
        : `/${locale}${pathname === '/' ? '' : pathname}`;

      const redirectUrl = new URL(newPath, request.url);
      redirectUrl.search = request.nextUrl.search;

      const response = NextResponse.redirect(redirectUrl, { status: 302 });
      // Set geo cookie so we don't redirect again this session
      response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 86400, sameSite: 'lax' });
      return response;
    }
  }

  // 4. Hand off to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
