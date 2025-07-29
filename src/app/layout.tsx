import "./globals.css";

import RootLayoutClient from '@/components/RootLayoutClient';
import { Analytics } from "@vercel/analytics/next"

// メタデータをエクスポート
export const metadata = {
  title: 'SAAS Sample',
  description: 'Next.js の SAAS サンプルアプリケーションです。',
};

// ルートレイアウトコンポーネント
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <RootLayoutClient>
          {children}
          <Analytics />
        </RootLayoutClient>
      </body>
    </html>
  );
} 