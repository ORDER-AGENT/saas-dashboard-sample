'use client';

import Sidebar from '@/components/menu/Sidebar';
import AppHeader from '@/components/AppHeader';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery'; 
import FooterMenu from '@/components/menu/FooterMenu';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

// ルートレイアウトのクライアントコンポーネント
export default function RootLayoutClient({
  children, // 子要素（ページコンポーネントなど）
}: {
  children: React.ReactNode;
}) {
  // サイドバーの開閉状態を管理。
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
 
  // isMenuOpen の初期状態を isLargeScreen に応じて設定（Hydration後）
  useEffect(() => {
    if (isLargeScreen !== null) {
      setIsMenuOpen(isLargeScreen);
    }
  }, [isLargeScreen]);

  const handleMenuToggleClick = () => { // メニューの開閉をトグルする関数を追加
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* NextAuth.jsのセッションプロバイダ */}
      <SessionProvider>
        <ConvexProvider client={convex}>
          <div className="flex flex-col h-[100dvh]">
            {/* ヘッダー部分をコンポーネントとしてレンダリング */}
            <AppHeader
              onMenuToggleClick={handleMenuToggleClick}
            />

            <div className={`flex flex-grow pt-[var(--header-height)] ${isSmallScreen ? 'pb-[var(--footer-menu-height)]' : ''}`}>
              {/* サイドバーコンポーネント */}
              <Sidebar
                isMenuOpen={isMenuOpen}
                onMenuToggleClick={handleMenuToggleClick}
              />
              {/* メインコンテンツ領域 */}
              <main
                className={`flex-grow overflow-auto transition-[margin-left] duration-[var(--sidebar-animation-duration)] ease-in-out ${
                  isMenuOpen ? 'lg:ml-[var(--sidebar-width-open)] md:ml-[var(--sidebar-width-closed)]' : 'lg:ml-[var(--sidebar-width-closed)] md:ml-[var(--sidebar-width-closed)]'
                }`}
              >
                {children}
                {/* トースト通知表示エリア */}
                <Toaster />
              </main>
            </div>
          </div>
          
          {isSmallScreen && (
            <FooterMenu />
          )}
        </ConvexProvider>
      </SessionProvider>
    </>
  );
} 