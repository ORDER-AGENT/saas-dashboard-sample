'use client';

import React, { ReactNode, useState } from 'react';
import CardHeader from '@/components/card/CardHeader';
import CardBase from '@/components/card/CardBase';
import { FaRegCircle, FaCircleCheck, /*FaHourglassHalf*/ } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'done';

interface TaskCardProps {
  title?: string;
  children: ReactNode;
  dropdownItems?: ReactNode[];
  initialStatus: TaskStatus;
  onStatusChange?: (newStatus: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  children,
  dropdownItems,
  initialStatus,
  onStatusChange,
}) => {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>(initialStatus);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'todo':
        return <FaRegCircle className="size-5 text-gray-400" />;
      case 'in-progress':
        return <FaCircleCheck className="size-5 text-[var(--theme)]" />; // --theme を使用
      case 'in-review':
        return <FaCircleCheck className="size-5 text-green-500" />; // FaHourglassHalf と緑色を維持
      case 'done':
        return <FaCircleCheck className="size-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const statusDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          {getStatusIcon(currentStatus)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuItem onClick={() => handleStatusChange('todo')}>
          <FaRegCircle className="size-4 mr-2 text-gray-400" /> 未着手
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('in-progress')}>
          <FaCircleCheck className="size-4 mr-2 text-[var(--theme)]" /> 進行中
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('in-review')}>
          <FaCircleCheck className="size-4 mr-2 text-green-500" /> 確認待ち
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('done')}>
          <FaCircleCheck className="size-4 mr-2 text-gray-400" /> 完了
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <CardBase>
      {title && (
        <CardHeader
          title={title}
          dropdownItems={dropdownItems}
          leftAdornment={statusDropdown}
        />
      )}
      {children}
    </CardBase>
  );
};

export default TaskCard; 