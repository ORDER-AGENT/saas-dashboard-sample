'use client';

import React, { useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaList, FaTableCellsLarge } from 'react-icons/fa6';
import { RiTimelineView } from 'react-icons/ri';
import ContentLayout from '@/components/ContentLayout';
import { useTasks } from '@/hooks/useTasks';
import { BeatLoader } from 'react-spinners';
import TaskTable from './TaskTable';
import TaskBoard from './TaskBoard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IoIosSearch } from 'react-icons/io';
import { Task } from '@/types/tasks';

export default function SchedulePage() {
  const {
    //tasks: scheduleTasks,
    groupedTasks,
    isLoading: isLoadingTasks,
  } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroupedTasks = useMemo(() => {
    if (!groupedTasks) return {};
    if (!searchTerm) return groupedTasks;

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered: { [key: string]: Task[] } = {};

    for (const status in groupedTasks) {
      if (Object.prototype.hasOwnProperty.call(groupedTasks, status)) {
        const tasks = groupedTasks[status as keyof typeof groupedTasks];
        if (tasks) {
          filtered[status] = tasks.filter(task =>
            task.title.toLowerCase().includes(lowercasedSearchTerm)
          );
        }
      }
    }
    return filtered;
  }, [groupedTasks, searchTerm]);

  const totalFilteredTasks = useMemo(() => {
    if (!filteredGroupedTasks) return 0;
    return Object.values(filteredGroupedTasks).reduce((sum, tasks) => sum + tasks.length, 0);
  }, [filteredGroupedTasks]);

  const renderContent = () => {
    if (isLoadingTasks) {
      return (
        <div className="flex items-center justify-center h-96">
          <BeatLoader color="#36d7b7" size={15} />
        </div>
      );
    }

    if (!isLoadingTasks && totalFilteredTasks === 0) {
      return (
        <div className="flex items-center justify-center h-96">
          <p>
            {searchTerm ? '検索条件に一致するタスクが見つかりません。' : 'タスクが見つかりません。'}
          </p>
        </div>
      );
    }

    return (
      <>
        <TabsContent value="list">
          <TaskTable tasks={filteredGroupedTasks} />
        </TabsContent>
        <TabsContent value="board">
          <TaskBoard tasks={filteredGroupedTasks} />
        </TabsContent>
        <TabsContent value="timeline">
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">Timeline View</h2>
            {/* Timeline コンテンツをここに追加 */}
            <p>ここにタイムラインのコンテンツが入ります。</p>
          </div>
        </TabsContent>
      </>
    );
  };

  return (
    <ContentLayout headerLeftContent={<h1 className="text-2xl font-bold">Task Preview</h1>}>
      <Tabs defaultValue="list">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm lg:h-[50px]">
            <TabsTrigger
              value="list"
              className="flex items-center space-x-2 px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-100 cursor-pointer"
            >
              <FaList className="size-4" />
              List
            </TabsTrigger>
            <TabsTrigger
              value="board"
              className="flex items-center space-x-2 px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-100 cursor-pointer"
            >
              <FaTableCellsLarge className="size-4" />
              Board
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="flex items-center space-x-2 px-4 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-100 cursor-pointer"
            >
              <RiTimelineView className="size-4" />
              Timeline
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search Tasks"
                className="pl-8 pr-4 py-2 border rounded-md bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <IoIosSearch className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
              + Add Task
            </Button>
          </div>
        </div>
        {renderContent()}
      </Tabs>
    </ContentLayout>
  );
} 