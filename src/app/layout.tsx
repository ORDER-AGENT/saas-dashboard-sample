import "./globals.css";

import RootLayoutClient from '@/components/RootLayoutClient';

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
        </RootLayoutClient>
      </body>
    </html>
  );
} 