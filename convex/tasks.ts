import { v, type Infer } from 'convex/values';
import { query } from "./_generated/server";
import { defineSchema, defineTable } from 'convex/server';

// TaskType の定義をエクスポートします。
export const TaskType = v.object({
  id: v.string(),
  title: v.string(),
  initialStatus: v.union(
    v.literal('todo'),
    v.literal('inProgress'),
    v.literal('inReview'),
    v.literal('done')
  ),
  description: v.string(),
  priority: v.union(
    v.literal('Low'),
    v.literal('Medium'),
    v.literal('High'),
    v.literal('Closed')
  ),
  status: v.union(
    v.literal('Pending'),
    v.literal('Running'),
    v.literal('Done')
  ),
  startDate: v.string(),
  endDate: v.string(),
  member: v.string(),
});

type Task = Infer<typeof TaskType>;

// ダミーデータ
const dummyTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Ui Design',
    initialStatus: 'todo',
    description: 'Discussion for management dashboard ui design',
    priority: 'Low',
    status: 'Pending',
    startDate: '03/12/2021',
    endDate: '5/12/2021',
    member: '5 Member',
  },
  {
    id: 'task-2',
    title: 'Logo Design',
    initialStatus: 'todo',
    description: 'Design for the main landing page',
    priority: 'Medium',
    status: 'Pending',
    startDate: '03/12/2021',
    endDate: '5/12/2021',
    member: '5 Member',
  },
  {
    id: 'task-3',
    title: 'Grapich Design',
    initialStatus: 'inProgress',
    description: 'Development of the e-shop mobile application',
    priority: 'High',
    status: 'Running',
    startDate: '03/12/2021',
    endDate: '5/12/2021',
    member: '5 Member',
  },
  {
    id: 'task-4',
    title: 'Web Design',
    initialStatus: 'inProgress',
    description: 'Review and feedback for user authentication flow',
    priority: 'Medium',
    status: 'Running',
    startDate: '03/12/2021',
    endDate: '5/12/2021',
    member: '5 Member',
  },
  {
    id: 'task-5',
    title: 'User Auth Flow',
    initialStatus: 'inReview',
    description: 'Review and feedback for user authentication flow',
    priority: 'Medium',
    status: 'Running',
    startDate: '03/12/2021',
    endDate: '5/12/2021',
    member: '5 Member',
  },
  {
    id: 'task-6',
    title: 'API Integration',
    initialStatus: 'inReview',
    description: 'Integrate third-party API for payment processing',
    priority: 'High',
    status: 'Running',
    startDate: '03/12/2021',
    endDate: '5/12/2021',
    member: '5 Member',
  },
  {
    id: 'task-7',
    title: 'Logo Design',
    initialStatus: 'done',
    description: 'Integrate third-party API for payment processing',
    priority: 'High',
    status: 'Done',
    startDate: '01/12/2021',
    endDate: '3/12/2021',
    member: '5 Member',
  },
];

export default defineSchema({
  tasks: defineTable({
    id: v.string(),
    title: v.string(),
    initialStatus: v.union(
      v.literal('todo'),
      v.literal('inProgress'),
      v.literal('inReview'),
      v.literal('done')
    ),
    description: v.string(),
    priority: v.union(
      v.literal('Low'),
      v.literal('Medium'),
      v.literal('High'),
      v.literal('Closed')
    ),
    status: v.union(
      v.literal('Pending'),
      v.literal('Running'),
      v.literal('Done')
    ),
    startDate: v.string(),
    endDate: v.string(),
    member: v.string(),
  }).index('by_status', ['initialStatus']),
});

export const get = query({
  handler: async () => {
    // ここでダミーデータを返します。実際にはデータベースから取得する処理になります。
    return dummyTasks;
  },
}); 