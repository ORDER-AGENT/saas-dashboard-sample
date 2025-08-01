'use client';

import { Task, TaskStatus } from '@/types/tasks';
import TaskCard from '@/components/card/TaskCard';
import { getStatusBadgeClass } from '@/lib/utils';

type TaskBoardProps = {
  tasks: { [key in TaskStatus]?: Task[] };
};

const columnConfig = [
  { status: TaskStatus.Todo, title: '未着手' },
  { status: TaskStatus.InProgress, title: '進行中' },
  { status: TaskStatus.InReview, title: '確認待ち' },
  { status: TaskStatus.Done, title: '完了' },
];

const TaskBoard = ({ tasks }: TaskBoardProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {columnConfig.map(({ status, title }) => (
        <div key={status} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          {(tasks[status] || []).map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              initialStatus={task.initialStatus}
            >
              <div className="flex flex-col gap-2">
                <div className="flex space-x-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.priority,
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.status,
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            </TaskCard>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard; 