'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaList, FaTableCellsLarge } from 'react-icons/fa6';
import { RiTimelineView } from 'react-icons/ri';
import ContentLayout from '@/components/ContentLayout';
import { useTasks } from '@/hooks/useTasks';
import { BeatLoader } from 'react-spinners';
import TaskTable from './TaskTable';
import TaskBoard from './TaskBoard';

export default function SchedulePage() {
  const { tasks: scheduleTasks, isLoading: isLoadingTasks } = useTasks();

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
        </div>
        <TabsContent value="list">
          {isLoadingTasks ? (
            <div className="flex items-center justify-center h-96">
              <BeatLoader color="#36d7b7" size={15} />
            </div>
          ) : scheduleTasks && scheduleTasks.length > 0 ? (
            <TaskTable tasks={scheduleTasks} />
          ) : (
            <div className="flex items-center justify-center h-96">
              <p>タスクが見つかりません。</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="board">
          {isLoadingTasks ? (
            <div className="flex items-center justify-center h-96">
              <BeatLoader color="#36d7b7" size={15} />
            </div>
          ) : scheduleTasks && scheduleTasks.length > 0 ? (
            <TaskBoard tasks={scheduleTasks} />
          ) : (
            <div className="flex items-center justify-center h-96">
              <p>タスクが見つかりません。</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="timeline">
          <div className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">Timeline View</h2>
            {/* Timeline コンテンツをここに追加 */}
            <p>ここにタイムラインのコンテンツが入ります。</p>
          </div>
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
} 