'use client';

import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/AppHeader';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery'; 

// ルートレイアウトのクライアントコンポーネント
export default function RootLayoutClient({
  children, // 子要素（ページコンポーネントなど）
}: {
  children: React.ReactNode;
}) {
  // サイドバーの開閉状態を管理。
  // デスクトップでの初回表示を考慮し、デフォルトで開いた状態にする
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

  // isMenuOpen の初期状態を isLargeScreen に応じて設定（Hydration後）
  useEffect(() => {
    if (isLargeScreen !== null && isSmallScreen !== null) { // 両方の状態が確定してから設定
      // 大画面の場合、メニューを開く
      setIsMenuOpen(isLargeScreen);
    }
  }, [isLargeScreen, isSmallScreen]);

  const handleMenuToggleClick = () => { // メニューの開閉をトグルする関数を追加
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* NextAuth.jsのセッションプロバイダ */}
      <SessionProvider>
        <div className="flex flex-col h-[100dvh]">
          {/* ヘッダー部分をコンポーネントとしてレンダリング */}
          <AppHeader
            onMenuToggleClick={handleMenuToggleClick}
          />

          <div className="flex flex-grow mt-[60px]">
            {/* サイドバーコンポーネント */}
            <Sidebar
              isMenuOpen={isMenuOpen}
              onMenuToggleClick={handleMenuToggleClick}
            />
            {/* メインコンテンツ領域 */}
            <main
              className={`flex-grow overflow-auto transition-[margin-left] duration-150 ease-in-out ${
                isMenuOpen ? 'lg:ml-[250px] md:ml-[60px]' : 'lg:ml-[60px] md:ml-[60px]'
              }`}
            >
              {children}
              {/* トースト通知表示エリア */}
              <Toaster />
            </main>
          </div>
        </div>
      </SessionProvider>
    </>
  );
} 