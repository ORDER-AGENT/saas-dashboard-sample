import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface CardHeaderProps {
  title: string;
  dropdownItems?: React.ReactNode[];
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, dropdownItems }) => {
  return (
    <div className="flex justify-between items-center mb-4 relative">
      <h3 className="text-xl font-semibold">{title}</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700">
                <HiOutlineDotsHorizontal className="w-5 h-5" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="center"> {/* ドロップダウンのコンテンツ */}
          {dropdownItems && dropdownItems.length > 0 ? (
            dropdownItems.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))
          ) : (
            <>
              <DropdownMenuItem>ダミー</DropdownMenuItem>
              <DropdownMenuItem>ダミー2</DropdownMenuItem>
              <DropdownMenuSeparator /> {/* 区切り線 */}
              <DropdownMenuItem>ダミー3</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CardHeader;