'use client';
import React, { useState, useMemo } from 'react';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useMessages } from '@/hooks/useMessages';
import { BeatLoader } from 'react-spinners';

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const { messages, isLoading } = useMessages();

  const filteredMessages = useMemo(() => {
    if (!messages) return [];
    if (activeTab === 'all') return messages;
    return messages.filter(message => message.type === activeTab);
  }, [messages, activeTab]);

  const triggerClassName =
    'flex-1 rounded-none border-x-0 border-t-0 px-4 py-2 text-gray-500 hover:text-accent-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-primary data-[state=active]:shadow-none';

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
          <Tabs
            defaultValue="all"
            className="mb-4"
            onValueChange={value => setActiveTab(value)}
          >
            <TabsList className="w-full rounded-none bg-transparent p-0 border-b border-gray-200">
              <TabsTrigger
                value="all"
                className={triggerClassName}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="personal"
                className={triggerClassName}
              >
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className={triggerClassName}
              >
                Teams
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <BeatLoader color="#36d7b7" size={15} />
              </div>
            ) : (
              filteredMessages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-center p-2 mb-2 rounded-lg hover:bg-gray-100 cursor-pointer relative',
                    { 'bg-gray-100': message.active }
                  )}
                >
                  <img
                    src={message.avatar}
                    alt={message.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{message.name}</h3>
                      <span className="text-xs text-gray-500">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {message.lastMessage}
                    </p>
                  </div>
                  {message.online && (
                    <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      Online
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        {/* 右側のチャット会話画面部分 */}
        <div className="flex-1 p-4 flex flex-col">
          {/* ヘッダー */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <img src="https://github.com/shadcn.png" alt="John Carlio" className="w-10 h-10 rounded-full mr-3" />
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