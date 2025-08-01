import { useState, useEffect, useMemo } from 'react';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Task, TaskStatus } from '@/types/tasks';

export const useTasks = () => {
  // convex/tasks.ts の get クエリを使用してタスクデータを取得します。
  const tasks = useQuery(api.tasks.get);
  const [minimumLoadingTimeReached, setMinimumLoadingTimeReached] = useState(false);

  useEffect(() => {
    // ローディング状態をシミュレートするために1秒後にタイマーをセットします。
    const timer = setTimeout(() => {
      setMinimumLoadingTimeReached(true);
    }, 1000);

    // クリーンアップ関数でタイマーをクリアします。
    return () => clearTimeout(timer);
  }, []);

  const groupedTasks = useMemo(() => {
    if (!tasks) return {};

    return {
      [TaskStatus.Todo]: tasks.filter((task) => task.initialStatus === TaskStatus.Todo),
      [TaskStatus.InProgress]: tasks.filter(
        (task) => task.initialStatus === TaskStatus.InProgress,
      ),
      [TaskStatus.InReview]: tasks.filter(
        (task) => task.initialStatus === TaskStatus.InReview,
      ),
      [TaskStatus.Done]: tasks.filter((task) => task.initialStatus === TaskStatus.Done),
    };
  }, [tasks]);

  // tasks が undefined であるか、最小ローディング時間が経過していない場合にローディング中と判断します。
  const isLoading = tasks === undefined || !minimumLoadingTimeReached;

  // タスクデータ、ローディング状態、エラー（ここではnull）を返します。
  // useQuery がエラーをスローする可能性があるため、明示的なエラーハンドリングはここでは行いません。
  return { tasks, groupedTasks, isLoading, error: null };
}; 