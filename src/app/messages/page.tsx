import React from 'react';
import ContentLayout from '@/components/ContentLayout';
import { GoPlus } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FiSend, FiPaperclip, FiSmile, FiEdit, FiTrash2 } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';


export default function MessagesPage() {
  return (
    <ContentLayout>
      <div className="flex h-full">
        {/* 左側のメッセージリスト部分 */}
        <div className="w-1/3 border-r border-gray-200 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Message</h2>
            <Button size="icon" className="text-white bg-primary rounded-full">
              <GoPlus className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-2 border rounded-md bg-white"
            />
            <IoIosSearch className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex mb-4 border-b border-gray-200">
            {/* buttonをButtonコンポーネントに置き換え */}
            <Button variant="ghost" className="px-4 py-2 text-purple-600 border-b-2 border-purple-600 font-semibold rounded-none">All</Button>
            <Button variant="ghost" className="px-4 py-2 text-gray-500 hover:text-purple-600 rounded-none">Personal</Button>
            <Button variant="ghost" className="px-4 py-2 text-gray-500 hover:text-purple-600 rounded-none">Teams</Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Shelby Goode */}
            <div className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="https://github.com/evilrabbit.png" alt="Shelby Goode" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Shelby Goode</h3>
                  <span className="text-xs text-gray-500">1 min ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Lorem Ipsum is simply dummy text of the printing</p>
              </div>
            </div>

            {/* Robert Bacins */}
            <div className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="https://github.com/vercel.png" alt="Robert Bacins" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Robert Bacins</h3>
                  <span className="text-xs text-gray-500">9 min ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Lorem Ipsum is simply dummy text of the printing</p>
              </div>
            </div>

            {/* John Carlio (アクティブ) */}
            <div className="flex items-center p-2 mb-2 rounded-lg bg-gray-100 cursor-pointer relative">
              <img src="https://github.com/shadcn.png" alt="John Carlio" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">John Carlio</h3>
                  <span className="text-xs text-gray-500">15 min ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Lorem Ipsum is simply dummy text of the printing</p>
              </div>
              {/* Online indicator */}
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full px-2 py-1">Online</span>
            </div>

            {/* Adriene Watson */}
            <div className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="https://github.com/tailwindcss.png" alt="Adriene Watson" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Adriene Watson</h3>
                  <span className="text-xs text-gray-500">21 min ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Lorem Ipsum is simply dummy text of the printing</p>
              </div>
            </div>

            {/* Jhon Deo */}
            <div className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="https://github.com/reactjs.png" alt="Jhon Deo" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Jhon Deo</h3>
                  <span className="text-xs text-gray-500">29 min ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Lorem Ipsum is simply dummy text of the printing</p>
              </div>
            </div>

            {/* Mark Ruffalo */}
            <div className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="https://github.com/nextjs.png" alt="Mark Ruffalo" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Mark Ruffalo</h3>
                  <span className="text-xs text-gray-500">45 min ago</span>
                </div>
                <p className="text-sm text-gray-600 truncate">Lorem Ipsum is simply dummy text of the printing</p>
              </div>
            </div>

            {/* Bethany Jackson */}
            <div className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <img src="https://github.com/nodejs.png" alt="Bethany Jackson" className="w-10 h-10 rounded-full mr-3" />
              <div className="flex-1">
                <h3 className="font-semibold">Bethany Jackson</h3>
                <p className="text-sm text-gray-600 truncate">Lorem Ipsum is simply dummy text of the printing</p>
              </div>
            </div>
          </div>
        </div>
        {/* 右側のチャット会話画面部分 */}
        <div className="flex-1 p-4 flex flex-col">
          {/* ヘッダー */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <img src="https://github.com/shadcn.png" alt="John Carlio" className="w-10 h-10 rounded-full mr-3" />
              <img src="https://via.placeholder.com/40" alt="John Carlio" className="w-10 h-10 rounded-full mr-3" />
              <div>
                <h3 className="font-semibold">John Carlio</h3>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <HiOutlineDotsHorizontal className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  {/* 元の閉じるアイコン */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  チャットを閉じる
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* メッセージエリア */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* 相手のメッセージ */}
            <div className="flex items-start mb-4">
              <img src="https://github.com/shadcn.png" alt="John Carlio" className="w-8 h-8 rounded-full mr-3" />
              <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                <p>Lorem Ipsum is simply</p>
                <p className="text-xs text-right mt-1">09:02 PM</p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <img src="https://github.com/shadcn.png" alt="John Carlio" className="w-8 h-8 rounded-full mr-3" />
              <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p className="text-xs text-right mt-1">09:02 PM</p>
              </div>
            </div>
            {/* 自分のメッセージ */}
            <div className="flex justify-end items-end mb-4">
              <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p className="text-xs text-right mt-1">09:04 PM</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-gray-400 hover:text-gray-600 ml-2"
                  >
                    <HiOutlineDotsHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <DropdownMenuItem>
                    <FiEdit className="h-4 w-4 mr-2" />
                    編集
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <FiTrash2 className="h-4 w-4 mr-2" />
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <img src="https://github.com/evilrabbit.png" alt="You" className="w-8 h-8 rounded-full ml-3" />
            </div>

          </div>

          {/* メッセージ入力フッター */}
          <div className="border-t border-gray-200 pt-4 flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 mr-3">
              <FiPaperclip className="h-6 w-6" />
            </Button>
            <Input
              type="text"
              placeholder="Type a message..."
              className="flex-1 py-2 px-4 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 ml-3">
              <FiSmile className="h-6 w-6" />
            </Button>
            <Button className="text-white bg-primary rounded-full p-2 ml-2" size="icon">
              <FiSend className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
} 