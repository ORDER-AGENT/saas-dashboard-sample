'use client';

import React from 'react';
import { IconType } from 'react-icons';
import Image from 'next/image';
import Link from 'next/link';

// SidebarMenuItemコンポーネントのPropsの型定義
interface SidebarMenuItemProps {
  icon: IconType | string; // IconType または URL
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
  
  // メニュー項目全体のベーススタイル
  const itemBaseClasses = `
    flex items-center justify-start pl-5 relative overflow-hidden
    transition-all duration-150 ease-in-out
    ${isSelected ? 'text-blue-700' : 'text-gray-500/90 hover:text-gray-600'} // ホバー時のテキスト色を追加
    ${isMenuOpen ? 'h-[40px] w-full' : 'h-[40px] w-full'}
  `;


  // アイコン部分のスタイル
  const iconClasses = `
    flex-shrink-0 flex items-center justify-center size-6
    ${isMenuOpen ? 'mr-2' : 'mr-0'}
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
      onClick(); // クリックハンドラも実行
    } else {
      onClick(); // パスがない場合はクリックハンドラのみ実行
    }
  };

  const commonProps = {
    className: `${itemBaseClasses} ${isHovered ? 'bg-gray-100' : ''}
                  flex items-center justify-center p-0 rounded-md
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 // フォーカススタイル
                  disabled:pointer-events-none disabled:opacity-50 // 無効化スタイル
                  relative // ホバー擬似要素のためにrelativeを追加
                  `,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: handleClick,
  };

  // <a>と<Link>タグの子要素を共通化
  const childrenContent = (
    <>
      {isSelected && (
        <div className="absolute inset-y-0 left-0 w-[60px] bg-gradient-to-r from-[#ACA9FF]/40 to-transparent" />
      )}
      <div className={iconClasses}>
        {typeof Icon === 'string' ? (
          <Image
            src={Icon || '/default-link-icon.png'} // Iconを使用
            alt={text}
            width={0} // 幅を指定
            height={0} // 高さを指定
            sizes="100%"
            className="w-full h-auto"
            unoptimized={true}
          />
        ) : (
          <Icon className="size-6" /> // IconTypeの場合はコンポーネントとしてレンダリング
        )}
      </div>
      <span className={textClasses}>{text}</span>
      {/* ホバー時に表示する擬似要素 */}
      <div className={hoverClasses} />
    </>
  );

  return (
    <>
      {isExternal ? (
        <a href={path} target="_blank" rel="noopener noreferrer" {...commonProps}>
          {childrenContent}
        </a>
      ) : (
        <Link href={path} {...commonProps}>
          {childrenContent}
        </Link>
      )}
    </>
  );
}
