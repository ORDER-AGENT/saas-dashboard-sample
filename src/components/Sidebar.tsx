'use client';

import { TbLogin2, TbLogout2 } from 'react-icons/tb';
import React, { useState, useEffect } from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import SidebarContent from './SidebarContent';
import SidebarHeader from './SidebarHeader';
import { usePathname } from 'next/navigation';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
  getSidebarMenuItems,
  SidebarMenuItemType,
} from '@/data/sidebarMenuItems';

interface SidebarProps {
  onMenuToggleClick: () => void; // AppHeader に渡すためのプロップ
  isMenuOpen: boolean; // AppHeader に渡すためのプロップ
}

export default function Sidebar({ onMenuToggleClick, isMenuOpen }: SidebarProps) { // プロップスを整理
  // ステート変数の定義
  const router = useRouter(); // Next.jsのルーターフック
  const { status } = useSession(); // NextAuth.jsのセッション情報を取得
  const pathname = usePathname(); // 現在のパスを取得
  const [touchStartX, setTouchStartX] = useState(0); // スワイプ開始時のX座標を保持するステート
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // オーバーレイメニューの表示状態を制御する新しいステート
  const [isMenuOpenAnimation, setIsMenuOpenAnimation] = useState(false); // メニュー開閉アニメーション用の新しいステート

  // ログイン状態を判定
  const isLoggedIn = status === 'authenticated';

  // ログイン状態に基づいてロールを決定（暫定対応）
  const userRoles = isLoggedIn ? ['admin', 'guest'] : ['guest'];

  // ログイン/ログアウトメニュー項目をレンダリングするヘルパー関数
  const renderAuthMenuItem = (isMenuOpenForText: boolean, keyPrefix: string) => {
    const menuOpenState = isMenuOpenForText;
 
    return isLoggedIn ? (
      <SidebarMenuItem
        key={`${keyPrefix}logout`}
        icon={() => <TbLogout2 className="size-6" />}
        text="管理者ログアウト"
        isMenuOpen={menuOpenState}
        isSelected={selectedItem === 'logout'}
        isHovered={hoveredItem === 'logout'}
        onMouseEnter={() => setHoveredItem('logout')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => !isOverlayVisible ? handleMenuItemClick('logout') : handleOverlayItemClick('logout')}
        path="/"
        isExternal={false}
      />
    ) : (
      <SidebarMenuItem
        key={`${keyPrefix}admin`}
        icon={() => <TbLogin2 className="size-6" />}
        text="管理者"
        isMenuOpen={menuOpenState}
        isSelected={selectedItem === 'admin'}
        isHovered={hoveredItem === 'admin'}
        onMouseEnter={() => setHoveredItem('admin')}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => !isOverlayVisible ? handleMenuItemClick('admin') : handleOverlayItemClick('admin')}
        path="/admin"
        isExternal={false}
      />
    );
  };

  useEffect(() => {
    // オーバーレイメニューの表示状態を制御
    if (isLargeScreen !== null && !isLargeScreen && isMenuOpen) {
      // 大画面でなく、かつメニューが開いている場合、少し遅延させて表示状態をtrueにする
      // これにより、DOMにマウントされた後にアニメーションが開始される
      const timer = setTimeout(() => {
        setIsOverlayVisible(true);
      }, 50); // 短い遅延（例: 50ms）
      return () => clearTimeout(timer); // クリーンアップ
    } else {
      // それ以外の場合（メニューが閉じている、または大画面の場合）は直ちに非表示状態にする
      setIsOverlayVisible(false);
    }

    // SidebarMenuItemのテキストアニメーションを制御（閉じきるまではテキストを消さないように）
    let timer: NodeJS.Timeout;
    if (!isMenuOpen || isLargeScreen === false) {
      // メニューが閉じている、または大画面ではない場合、アニメーション終了を待ってから非表示にする
      timer = setTimeout(() => {
        setIsMenuOpenAnimation(false);
      }, 150); // SidebarMenuItemのテキストトランジション時間に合わせて調整 (0.15s)
    }
    else if (isMenuOpen && isLargeScreen === true) {
      setIsMenuOpenAnimation(true);
    }
    return () => clearTimeout(timer); // クリーンアップ

  }, [isMenuOpen, isLargeScreen]); // isMenuOpen と isLargeScreen に依存

  // 選択中のアイテムキーとホバー中のアイテムキーを管理
  const [selectedItem, setSelectedItem] = useState<string>('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // 静的なメニュー項目データを定義
  const menuItems: SidebarMenuItemType[] = getSidebarMenuItems(userRoles);

  // すべてのメニュー項目を結合（動的メニューがある場合は追加）
  // const menuItems = [...staticMenuItems /*, ...dynamicMenuItems*/];

  // メニュー項目クリックハンドラを共通化
  const handleMenuItemClick = (key: string) => {
    setSelectedItem(key);
    if (key === 'admin') {
      // ログイン時に現在のパスをcallbackUrlとして渡す
      router.push(`/admin?callbackUrl=${encodeURIComponent(pathname)}`);
    } else if (key === 'logout') {
      // 現在のオリジン (プロトコル + ホスト名 + ポート) を callbackUrl に設定
      signOut({ callbackUrl: window.location.origin }); // NextAuth.jsのsignOutを使用し、ログアウト後にトップページへリダイレクト
    }
  };

  // オーバーレイメニューの項目クリック時にメニューを閉じるためのハンドラ
  const handleOverlayItemClick = (key: string) => {
    handleMenuItemClick(key);
    onMenuToggleClick(); // メニューを閉じる
  };

  // スワイプ開始時の処理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // スワイプ終了時の処理
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50; // スワイプと判定する閾値（ピクセル）

    if (swipeDistance > swipeThreshold && !isMenuOpen) {
      // 右にスワイプしてメニューが閉じている場合、メニューを開く
      onMenuToggleClick();
    } else if (swipeDistance < -swipeThreshold && isMenuOpen) {
      // 左にスワイプしてメニューが開いている場合、メニューを閉じる
      onMenuToggleClick();
    }
  };

  return (
    <>
      {/* 大中画面用サイドバー (md以上で表示) */}
      <div
        className={`hidden md:flex lg:flex flex-col fixed left-0 top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] bg-white flex-shrink-0 z-12 transition-all duration-150 ease-in-out
          ${isMenuOpen ? 'lg:w-[var(--sidebar-width-open)] md:w-[var(--sidebar-width-closed)]' : 'w-[var(--sidebar-width-closed)]'}`}
      >

        {/* メニュー項目をループでレンダリングするエリア */}
        <div className="absolute top-0 bottom-[var(--header-height)] left-0 w-full overflow-y-auto overflow-x-hidden flex flex-col items-start">
          <SidebarContent
            menuItems={menuItems}
            selectedItem={selectedItem}
            hoveredItem={hoveredItem}
            onMouseEnter={setHoveredItem}
            onMouseLeave={setHoveredItem}
            handleMenuItemClick={handleMenuItemClick}
            isMenuOpenForContent={isMenuOpenAnimation}
            isDynamicLoading={status === 'loading'}
          />
        </div>

        {/* ログイン/ログアウトボタンをサイドバー全体の最下部に追加 */}
        <div className="w-full h-[var(--header-height)] bg-white flex items-center z-10 mt-auto">
          {
            renderAuthMenuItem(isMenuOpen, 'desktop')
          }
        </div>
      </div>

      {/* 小〜中画面用オーバーレイメニュー */}
      {/* <div className="lg:hidden"> */}
      {isLargeScreen !== null && !isLargeScreen && (
        <>
          {/* オーバーレイメニュー背景*/}
          <div
            className={`fixed inset-0 z-14 bg-black/50 transition-opacity duration-150 ease-in-out ${isOverlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onMenuToggleClick}
          />
          <div
            className={`fixed top-0 left-0 h-[100dvh] w-[var(--sidebar-width-open)] bg-white z-16 flex flex-col items-start transition-transform duration-150 ease-in-out
              ${isOverlayVisible ? 'translate-x-0' : '-translate-x-full'}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
              <SidebarHeader onMenuToggleClick={onMenuToggleClick} />

              {/* メニュー項目をループでレンダリング（小画面用） */}
              <div className="flex-grow overflow-y-auto w-full">
                <SidebarContent
                  menuItems={menuItems}
                  selectedItem={selectedItem}
                  hoveredItem={hoveredItem}
                  onMouseEnter={setHoveredItem}
                  onMouseLeave={setHoveredItem}
                  handleMenuItemClick={handleOverlayItemClick}
                  isMenuOpenForContent={true}
                  isDynamicLoading={status === 'loading'}
                />
              </div>
              {/* ログイン/ログアウトボタンをサイドメニュー最下部に追加（小画面用） */}
              <div className="w-full h-[var(--header-height)] flex-shrink-0 bg-white mt-auto flex items-center">
                {
                  renderAuthMenuItem(true, 'mobile')
                }
            </div>
          </div>
        </>
      )}
    </>
  );
}