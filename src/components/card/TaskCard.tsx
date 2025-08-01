'use client';

import React, { ReactNode, useState } from 'react';
import CardHeader from '@/components/card/CardHeader';
import CardBase from '@/components/card/CardBase';
import { FaRegCircle, FaCircleCheck } from 'react-icons/fa6';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  //DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types/tasks';

interface TaskCardProps {
  title: string;
  children: ReactNode;
  //dropdownItems?: ReactNode[];
  onStatusChange?: (newStatus: TaskStatus) => void;
  initialStatus: Task['initialStatus'];
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  children,
  initialStatus,
  onStatusChange,
}) => {
  const [status, setStatus] = useState<TaskStatus>(initialStatus as TaskStatus);

  const statusIcons: Record<TaskStatus, React.ReactElement> = {
    [TaskStatus.Todo]: <FaRegCircle className="size-5 text-ring" />,
    [TaskStatus.InProgress]: <FaCircleCheck className="size-5 text-primary" />,
    [TaskStatus.InReview]: <FaCircleCheck className="size-5 text-green-500" />,
    [TaskStatus.Done]: <FaCircleCheck className="size-5 text-ring" />,
  };

  const statusTexts: Record<TaskStatus, string> = {
    [TaskStatus.Todo]: '未着手',
    [TaskStatus.InProgress]: '進行中',
    [TaskStatus.InReview]: 'レビュー中',
    [TaskStatus.Done]: '完了',
  };

  // Define dropdownItems before it's used
  const dropdownItems = [
    <DropdownMenuItem key="edit">
      <FiEdit className="h-4 w-4 mr-2" />
      編集
    </DropdownMenuItem>,
    <DropdownMenuItem key="delete" className="text-red-500">
      <FiTrash2 className="h-4 w-4 mr-2" />
      削除
    </DropdownMenuItem>,
  ];

  const handleStatusChange = (newStatus: TaskStatus) => {
    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const statusDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          {statusIcons[status]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Pass the actual status values to onSelect */}
        <DropdownMenuItem onSelect={() => handleStatusChange(TaskStatus.Todo)}>
          {statusIcons.todo}
          {statusTexts.todo}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleStatusChange(TaskStatus.InProgress)}
        >
          {statusIcons.inProgress}
          {statusTexts.inProgress}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleStatusChange(TaskStatus.InReview)}
        >
          {statusIcons.inReview}
          {statusTexts.inReview}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleStatusChange(TaskStatus.Done)}>
          {statusIcons.done}
          {statusTexts.done}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <CardBase>
      <CardHeader title={title} leftAdornment={statusDropdown} dropdownItems={dropdownItems} />
      {children}
    </CardBase>
  );
};

export default TaskCard;