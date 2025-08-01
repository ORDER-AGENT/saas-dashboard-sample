'use client';

import { Task, TaskStatus } from '@/types/tasks';
import TaskCard from '@/components/card/TaskCard';

type TaskBoardProps = {
  tasks: Task[];
};

// Helper function to determine badge class based on priority or status
function getStatusBadgeClass(value: string): string {
  switch (value) {
    case 'Low':
    case 'On Track':
      return 'bg-red-100 text-red-800';
    case 'Medium':
    case 'Delayed':
      return 'bg-yellow-100 text-yellow-800';
    case 'High':
    case 'Completed':
      return 'bg-blue-100 text-blue-800';
    case 'Closed':
    case 'In Review':
      return 'bg-purple-100 text-purple-800';
    case 'Pending':
      return 'bg-orange-100 text-orange-800';
    case 'Running':
      return 'bg-blue-100 text-blue-800';
    case 'Done':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

const TaskBoard = ({ tasks }: TaskBoardProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* ToDo Column */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">未着手</h2>
        {tasks
          .filter((task) => task.initialStatus === TaskStatus.Todo)
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              initialStatus={task.initialStatus}
            >
              <div className="flex flex-col gap-2">
                <div className="flex space-x-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.status
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

      {/* In Progress Column */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">進行中</h2>
        {tasks
          .filter((task) => task.initialStatus === TaskStatus.InProgress)
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              initialStatus={task.initialStatus}
            >
              <div className="flex flex-col gap-2">
                <div className="flex space-x-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.status
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

      {/* In Review Column */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">確認待ち</h2>
        {tasks
          .filter((task) => task.initialStatus === TaskStatus.InReview)
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              initialStatus={task.initialStatus}
            >
              <div className="flex flex-col gap-2">
                <div className="flex space-x-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.status
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

      {/* Done Column */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">完了</h2>
        {tasks
          .filter((task) => task.initialStatus === TaskStatus.Done)
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              initialStatus={task.initialStatus}
            >
              <div className="flex flex-col gap-2">
                <div className="flex space-x-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(
                      task.status
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
    </div>
  );
};

export default TaskBoard; 