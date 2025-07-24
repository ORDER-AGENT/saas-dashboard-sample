import "./globals.css";

import RootLayoutClient from '@/components/RootLayoutClient';

// メタデータをエクスポート
export const metadata = {
  title: 'Next.js Sidemenu Sample',
  description: 'Next.js のサイドメニューのサンプルアプリケーションです。',
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