import { redirect } from 'next/navigation';

// Root redirects to default locale (fr) — handled by next-intl middleware
export default function RootPage() {
  redirect('/fr');
}
