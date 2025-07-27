'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaList, FaTableCellsLarge, /*FaCalendarDay,*/ FaRegCircle, FaCircleCheck, FaHourglassHalf } from 'react-icons/fa6';
import { RiTimelineView } from 'react-icons/ri';
import ContentLayout from '@/components/ContentLayout';
import Card from '@/components/Card';
import TaskCard from '@/components/TaskCard';

export default function SchedulePage() {
  return (
    <ContentLayout headerLeftContent={<h1 className="text-2xl font-bold">スケジュール</h1>}>
      <Tabs defaultValue="board">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm lg:h-[50px]">
          <TabsTrigger
            value="list"
            className="flex items-center space-x-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--theme)] data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-100"
          >
            <FaList className="size-4" />
            リスト
          </TabsTrigger>
          <TabsTrigger
            value="board"
            className="flex items-center space-x-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--theme)] data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-100"
          >
            <FaTableCellsLarge className="size-4" />
            ボード
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="flex items-center space-x-2 px-4 py-2 rounded-md data-[state=active]:bg-[var(--theme)] data-[state=active]:text-white data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-100"
          >
            <RiTimelineView className="size-4" />
            タイムライン
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">ToDo (List View)</h2>
              {/* ToDo のリストコンテンツをここに追加 */}
              <p>Dashboard Design</p>
              <p>Landing page Design</p>
              <p>E-Shop Mobile App</p>
              <p>Dashboard Design</p>
            </div>
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">In Progress (List View)</h2>
              {/* In Progress のリストコンテンツをここに追加 */}
              <p>Dashboard Design</p>
              <p>Landing page Design</p>
              <p>E-Shop Mobile App</p>
            </div>
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">In Review (List View)</h2>
              {/* In Review のリストコンテンツをここに追加 */}
              <p>Dashboard Design</p>
              <p>E-Shop Mobile App</p>
            </div>
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">Done (List View)</h2>
              {/* Done のリストコンテンツをここに追加 */}
              <p>Dashboard Design</p>
              <p>Landing page Design</p>
              <p>E-Shop Mobile App</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="board">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* ToDo Column */}
            <div className="space-y-4"> {/* space-y-4 を追加 */}
              <h2 className="text-xl font-semibold mb-4">未着手</h2>
              <TaskCard
                title="Dashboard Design"
                initialStatus="todo"
                dropdownItems={[]}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Low</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">On Track</span>
                  </div>
                  <p className="text-sm text-gray-500">Discussion for management dashboard ui design</p>
                </div>
              </TaskCard>
            </div>

            {/* In Progress Column */}
            <div className="space-y-4"> {/* space-y-4 を追加 */}
              <h2 className="text-xl font-semibold mb-4">進行中</h2>
              <TaskCard
                title="Dashboard Design"
                initialStatus="in-progress"
                dropdownItems={[]}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">High</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">On Track</span>
                  </div>
                  <p className="text-sm text-gray-500">Discussion for management dashboard ui design</p>
                </div>
              </TaskCard>
            </div>

            {/* In Review Column */}
            <div className="space-y-4"> {/* space-y-4 を追加 */}
              <h2 className="text-xl font-semibold mb-4">確認待ち</h2>
              <TaskCard
                title="Dashboard Design"
                initialStatus="in-review"
                dropdownItems={[]}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Medium</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">On Track</span>
                  </div>
                  <p className="text-sm text-gray-500">Review and feedback for dashboard UI</p>
                </div>
              </TaskCard>
              <TaskCard
                title="E-Shop Mobile App"
                initialStatus="in-review"
                dropdownItems={[]}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">High</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">On Track</span>
                  </div>
                  <p className="text-sm text-gray-500">User acceptance testing for mobile app</p>
                </div>
              </TaskCard>
            </div>
            {/* Done Column */}
            <div className="space-y-4"> {/* space-y-4 を追加 */}
              <h2 className="text-xl font-semibold mb-4">完了</h2>
              <TaskCard
                title="Dashboard Design"
                initialStatus="done"
                dropdownItems={[]}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Closed</span>
                  </div>
                  <p className="text-sm text-gray-500">Final dashboard design completed and approved</p>
                </div>
              </TaskCard>
              <TaskCard
                title="Landing page Design"
                initialStatus="done"
                dropdownItems={[]}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Closed</span>
                  </div>
                  <p className="text-sm text-gray-500">Landing page design finalized</p>
                </div>
              </TaskCard>
              <TaskCard
                title="E-Shop Mobile App"
                initialStatus="done"
                dropdownItems={[]}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Closed</span>
                  </div>
                  <p className="text-sm text-gray-500">Mobile app development completed</p>
                </div>
              </TaskCard>
            </div>
          </div>
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