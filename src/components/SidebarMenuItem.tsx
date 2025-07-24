'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { IconType } from 'react-icons'; // IconType をインポート

// SidebarMenuItemコンポーネントのPropsの型定義
interface SidebarMenuItemProps {
  icon: IconType; // IconTypeを直接使用
  text: string; // メニュー項目テキスト
  isMenuOpen: boolean; // メニューが開いているか
  isSelected: boolean; // 選択されているか
  isHovered: boolean; // ホバーされているか
  onMouseEnter: () => void; // マウスエンター時のハンドラ
  onMouseLeave: () => void; // マウスリーブ時のハンドラ
  onClick: () => void; // クリック時のハンドラ
  path: string; // リンク先パス
  isExternal: boolean; // 外部リンクかどうかのフラグ
}

export default function SidebarMenuItem({
  icon: Icon,
  text,
  isMenuOpen,
  isSelected,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  path,
  isExternal,
}: SidebarMenuItemProps) {
  const router = useRouter(); // useRouterフックを使用

  // メニュー項目全体のベーススタイル
  const itemBaseClasses = `
    flex items-center justify-start pl-5 relative overflow-hidden
    transition-all duration-150 ease-in-out
    ${isSelected ? 'text-blue-700' : 'text-gray-500/90 hover:text-gray-600'} // ホバー時のテキスト色を追加
    ${isMenuOpen ? 'h-[40px] w-full' : 'h-[40px] w-full'}
  `;

  // Buttonコンポーネントに適用するバリアントとサイズ
  const buttonVariant = isSelected ? 'ghost' : 'ghost'; // isSelectedに応じてスタイルを変更
  const buttonSize = 'lg';

  // アイコン部分のスタイル
  const iconClasses = `
    flex-shrink-0 flex items-center justify-center
    ${isMenuOpen ? 'w-[24px] mr-2' : 'mw-[24px] mr-0'}
  `;

  // テキスト部分のスタイル
  const textClasses = `
    text-base overflow-hidden transition-all duration-150 ease-in-out
    ${isMenuOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 pointer-events-none'}
  `;

  // ホバー時の擬似要素のスタイル
  const hoverClasses = `
    absolute top-1/2 -translate-y-1/2 z-[-1] transition-all duration-150 ease-in-out
    ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    ${isMenuOpen
      ? 'left-3 right-3 h-[32px] bg-gray-200 rounded-lg' // メニューが開いている場合
      : 'left-1/2 -translate-x-1/2 w-[40px] h-[40px] bg-gray-200 rounded-full' // メニューが閉じている場合
    }
  `;

  const handleClick = () => {
    // 外部リンクの場合は新しいタブで開く
    if (isExternal && path) {
      window.open(path, '_blank');
      onClick(); // クリックハンドラも実行
    } else if (path) {
      router.push(path); // 内部リンクの場合はルーターで遷移
      onClick(); // クリックハンドラも実行
    } else {
      onClick(); // パスがない場合はクリックハンドラのみ実行
    }
  };

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      className={`${itemBaseClasses} ${isHovered ? 'bg-gray-100' : ''}`} // isSelectedのグラデーションクラスを削除
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isSelected && (
        <div className="absolute inset-y-0 left-0 w-[60px] bg-gradient-to-r from-[#ACA9FF]/40 to-transparent" />
      )}
      <div className={iconClasses}>
        <Icon className="size-6" />
      </div>
      <span className={textClasses}>{text}</span>
      {/* ホバー時に表示する擬似要素 */}
      <div className={hoverClasses} />
    </Button>
  );
}
