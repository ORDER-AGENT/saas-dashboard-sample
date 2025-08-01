'use client';

import { Task, TaskStatus } from '@/types/tasks';
import { Checkbox } from '@/components/ui/checkbox';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStatusBadgeClass } from '@/lib/utils';

type TaskTableProps = {
  tasks: { [key in TaskStatus]?: Task[] };
  showHeader?: boolean;
};

const taskGroupsConfig = [
  { status: TaskStatus.Todo, title: '未着手' },
  { status: TaskStatus.InProgress, title: '進行中' },
  { status: TaskStatus.InReview, title: '確認待ち' },
  { status: TaskStatus.Done, title: '完了' },
];

const TaskTable = ({ tasks, showHeader = true }: TaskTableProps) => {
  const taskGroups = taskGroupsConfig
    .map((group) => ({
      ...group,
      tasks: tasks[group.status] || [],
    }))
    .filter((group) => group.tasks.length > 0);

  return (
    <div className="space-y-8">
      {taskGroups.map((group) => (
        <div key={group.title} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{group.title}</h2>
            <a href="#" className="text-primary hover:underline">
              See More
            </a>
          </div>
          <Table>
            {showHeader && (
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox />
                  </TableHead>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {group.tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox
                      defaultChecked={
                        task.initialStatus === TaskStatus.Done ||
                        task.initialStatus === TaskStatus.InProgress
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="text-gray-600">{task.startDate}</TableCell>
                  <TableCell className="text-red-500">{task.endDate}</TableCell>
                  <TableCell className="text-gray-600">{task.member}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(
                        task.status,
                      )}`}
                    >
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                        <FaEdit />
                      </button>
                      <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                        <FaTrash />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default TaskTable; 