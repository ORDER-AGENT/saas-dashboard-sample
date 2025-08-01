'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ContentLayout from '@/components/ContentLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IoIosSearch } from 'react-icons/io'; // IoIosSearch をインポート
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { columns as userColumns } from './columns';
import { useUsers } from '@/hooks/useUsers'; // useUsers フックをインポート
import SimpleSpinner from '@/components/loader/SimpleSpinner';
import { cn } from '@/lib/utils'; // cn をインポート

export default function UsersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // カスタムフックからユーザーデータとローディング状態、エラーを取得
  const { users: convexUsers, isLoading: isLoadingUsers, error } = useUsers();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const columns = React.useMemo(() => userColumns, []);

  // 検索キーワードでユーザーデータをフィルタリング
  const filteredUsers = React.useMemo(() => {
    if (!convexUsers) return [];
    if (!searchTerm) return convexUsers;

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return convexUsers.filter(user =>
      user.name.toLowerCase().includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm) ||
      user.id.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [convexUsers, searchTerm]);

  const table = useReactTable({
    data: filteredUsers, // フィルタリングされたデータを使用
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (status === 'loading' || status === 'unauthenticated') {
    return null; // データがロードされるまで何も表示しない
  }

  return (
    <ContentLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ユーザー情報</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-2 border rounded-md bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" /> {/* SVGをIoIosSearchに置き換え */}
          </div>
          <Button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
            + Add New
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Table className="mb-2 border-separate border-spacing-y-1">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-white/0">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={`${header.column.id === 'select' ? 'w-[50px]' : ''} ${header.column.id === 'actions' ? 'text-right' : ''} font-semibold text-gray-700`}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
            </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {/* データの状態に応じて表示を切り替える */}
            {error ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                  データの読み込み中にエラーが発生しました: {error}
                </TableCell>
              </TableRow>
            ) : isLoadingUsers ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24"> {/* ここから flex/items-center/justify-center を削除 */}
                  <div className="w-full h-full flex items-center justify-center"> {/* 新しい div を追加し、これにセンタリングのスタイルを適用 */}
                    <SimpleSpinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : convexUsers && convexUsers.length === 0 ? ( // convexUsersが存在するかどうかを確認
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  ユーザーデータがありません。
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group hover:drop-shadow-md transition-shadow mb-2 rounded-xl overflow-hidden" // group クラスを追加
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        row.getIsSelected() ? "bg-muted" : "bg-white",
                        //"group-[data-state=selected]:bg-muted",
                        //"group-hover:bg-muted/50", // 親のホバー状態に反応して背景色を変更
                        //"p-4",      // パディング任意
                        cell.column.id === 'select' && 'w-[50px]',
                        cell.column.id === 'actions' && 'text-right',
                        cellIndex === 0 && 'rounded-l-xl',
                        cellIndex === row.getVisibleCells().length - 1 && 'rounded-r-xl'
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
  );
}