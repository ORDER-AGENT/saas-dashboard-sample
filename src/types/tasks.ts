// convex/tasks.ts で定義された TaskType を参照して Task 型を定義します。
// もし convex/tasks.ts がまだ存在しない、または TaskType がエクスポートされていない場合は、
// ここで直接型を定義する必要があります。

// 例として、convex/tasks.ts からエクスポートされている TaskType をインポートする場合：
// import { TaskType } from '@/convex/tasks';
// export type Task = TaskType;

// もし TaskType がエクスポートされていない、または直接定義したい場合は以下のようにします：
export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  InReview = 'inReview',
  Done = 'done',
}

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Closed = 'Closed',
}

export enum TaskRunStatus {
  Pending = 'Pending',
  Running = 'Running',
  Done = 'Done',
}

export type Task = {
  id: string;
  title: string;
  initialStatus: `${TaskStatus}`;
  description: string;
  priority: `${TaskPriority}`;
  status: `${TaskRunStatus}`;
  startDate: string;
  endDate: string;
  member: string;
}; 