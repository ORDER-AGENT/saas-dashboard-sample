'use client';

import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import { BeatLoader } from 'react-spinners';
import { SidebarMenuItemType } from '@/data/sidebarMenuItems';

interface SidebarContentProps {
  menuItems: SidebarMenuItemType[]; // 型を SidebarMenuItemType[] に変更
  selectedItem: string;
  hoveredItem: string | null;
  onMouseEnter: (key: string) => void;
  onMouseLeave: (key: string | null) => void;
  handleMenuItemClick: (key: string) => void;
  isMenuOpenForContent: boolean; // コンテンツの表示/非表示を制御するisMenuOpen
  isDynamicLoading: boolean;
}

export default function SidebarContent({
  menuItems,
  selectedItem,
  hoveredItem,
  onMouseEnter,
  onMouseLeave,
  handleMenuItemClick,
  isMenuOpenForContent,
  isDynamicLoading,
}: SidebarContentProps) {
  // 静的なメニュー項目と動的なメニュー項目を分離
  const staticMenuItems = menuItems.filter(item => !item.isDynamic); // isDynamicを使用
  const dynamicMenuItems = menuItems.filter(item => item.isDynamic); // isDynamicを使用

  return (
    <>
      {/* メニュー項目をループでレンダリングするエリア */}
      <div className="flex-grow flex flex-col w-full">
        {/* 静的なメニュー項目を常に表示 */}
        {staticMenuItems.map((item) => (
          <SidebarMenuItem
            key={item.key}
            icon={item.icon}
            text={item.text}
            isMenuOpen={isMenuOpenForContent}
            isSelected={selectedItem === item.key}
            isHovered={hoveredItem === item.key}
            onMouseEnter={() => onMouseEnter(item.key)}
            onMouseLeave={() => onMouseLeave(null)}
            onClick={() => handleMenuItemClick(item.key)}
            path={item.path}
            isExternal={item.isDynamic}
          />
        ))}

        {/* 動的なメニュー項目はロード状態に応じて表示を切り替え */}
        {isDynamicLoading ? ( // isDynamicLoadingを使用
          <div className="flex items-center justify-center h-full w-full py-4">
            <BeatLoader color="#36d7b7" size={isMenuOpenForContent ? 15 : 10} /> {/* isMenuOpenForContentに応じてサイズを調整 */}
          </div>
        ) : (
          dynamicMenuItems.map((item) => (
            <SidebarMenuItem
              key={item.key}
              icon={item.icon}
              text={item.text}
              isMenuOpen={isMenuOpenForContent}
              isSelected={selectedItem === item.key}
              isHovered={hoveredItem === item.key}
              onMouseEnter={() => onMouseEnter(item.key)}
              onMouseLeave={() => onMouseLeave(null)}
              onClick={() => handleMenuItemClick(item.key)}
              path={item.path}
              isExternal={item.isDynamic}
            />
          ))
        )}
      </div>
    </>
  );
} 