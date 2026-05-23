import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';

const intlMiddleware = createMiddleware(routing);

// Detect locale from IP geolocation
async function detectLocaleFromIP(request: NextRequest): Promise<string | null> {
  // Check for cached geo locale cookie
  const cached = request.cookies.get('geo-locale')?.value;
  if (cached) return cached;

  // Use Vercel's built-in geo headers
  const country = request.headers.get('x-vercel-ip-country');
  if (country) {
    const countryLocaleMap: Record<string, string> = {
      MN: 'mn', // Mongolia
      FR: 'fr', // France
      BE: 'fr', // Belgium
      CH: 'fr', // Switzerland (French)
      LU: 'fr', // Luxembourg
      CN: 'zh', // China
      TW: 'zh', // Taiwan
      HK: 'zh', // Hong Kong
      SA: 'ar', // Saudi Arabia
      AE: 'ar', // UAE
      EG: 'ar', // Egypt
      ES: 'es', // Spain
      MX: 'es', // Mexico
      AR: 'es', // Argentina
      BR: 'pt', // Brazil
      PT: 'pt', // Portugal
      DE: 'de', // Germany
      AT: 'de', // Austria
      JP: 'ja', // Japan
      KR: 'ko', // Korea
      RU: 'ru', // Russia
      IN: 'hi', // India
    };
    return countryLocaleMap[country] || null;
  }

  return null;
}

export async function proxy(request: NextRequest) {
  // Auth callback - skip
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return NextResponse.next();
  }

  // Handle admin routes
  if (request.nextUrl.pathname.includes('/admin')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll() {},
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Detect locale from IP if no locale cookie/preference set
  const hasLocalePref = request.cookies.get('NEXT_LOCALE')?.value;
  if (!hasLocalePref) {
    const geoLocale = await detectLocaleFromIP(request);
    if (geoLocale) {
      const response = intlMiddleware(request);
      if (response) {
        response.cookies.set('geo-locale', geoLocale, { maxAge: 86400 });
        return response;
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
