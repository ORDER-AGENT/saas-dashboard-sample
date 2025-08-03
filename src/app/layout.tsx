import "./globals.css";

import { cookies } from 'next/headers';
import RootLayoutClient from '@/components/RootLayoutClient';
import { Analytics } from "@vercel/analytics/next"

// メタデータをエクスポート
export const metadata = {
  title: 'SAAS Sample',
  description: 'Next.js の SAAS サンプルアプリケーションです。',
};

// ルートレイアウトコンポーネント
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sidebarCookie = cookieStore.get('sidebarOpenState');

  // Cookieが存在すればその値を、なければデフォルトでtrue（開いた状態）とする
  const initialIsMenuOpen = sidebarCookie ? sidebarCookie.value === 'true' : true;

  return (
    <html lang="ja">
      <body>
        <RootLayoutClient initialIsMenuOpen={initialIsMenuOpen}>
          {children}
          <Analytics />
        </RootLayoutClient>
      </body>
    </html>
  );
} 