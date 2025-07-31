'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/users';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FaStar, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="hover:border-accent-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="hover:border-accent-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <div className="flex items-center cursor-pointer" onClick={column.getToggleSortingHandler()}>
        Id
        {column.getIsSorted() === 'asc' ? (
          <FaAngleUp className="w-3 h-3 ml-1 text-gray-500" />
        ) : column.getIsSorted() === 'desc' ? (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        ) : (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        )}
      </div>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex items-center cursor-pointer" onClick={column.getToggleSortingHandler()}>
        Name
        {column.getIsSorted() === 'asc' ? (
          <FaAngleUp className="w-3 h-3 ml-1 text-gray-500" />
        ) : column.getIsSorted() === 'desc' ? (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        ) : (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        {/*
        <img
          src={row.original.avatar}
          alt={row.original.name}
          className="w-8 h-8 rounded-full mr-2"
        />*/}
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <div className="flex items-center cursor-pointer" onClick={column.getToggleSortingHandler()}>
        Email
        {column.getIsSorted() === 'asc' ? (
          <FaAngleUp className="w-3 h-3 ml-1 text-gray-500" />
        ) : column.getIsSorted() === 'desc' ? (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        ) : (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-gray-600">
        <svg
          className="w-4 h-4 mr-1 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0018 4H2a2 2 0 00-.003 1.884z"></path>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
        </svg>
        {row.getValue('email')}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <div className="flex items-center cursor-pointer" onClick={column.getToggleSortingHandler()}>
        Date
        {column.getIsSorted() === 'asc' ? (
          <FaAngleUp className="w-3 h-3 ml-1 text-gray-500" />
        ) : column.getIsSorted() === 'desc' ? (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        ) : (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-gray-600">
        <svg
          className="w-4 h-4 mr-1 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
        {row.getValue('date')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <div className="flex items-center cursor-pointer" onClick={column.getToggleSortingHandler()}>
        Status
        {column.getIsSorted() === 'asc' ? (
          <FaAngleUp className="w-3 h-3 ml-1 text-gray-500" />
        ) : column.getIsSorted() === 'desc' ? (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        ) : (
          <FaAngleDown className="w-3 h-3 ml-1 text-gray-500" />
        )}
      </div>
    ),
    cell: ({ row }) => (
      <div
        className={`px-3 py-1 text-sm font-semibold rounded-full ${
          row.original.status === 'Complete'
            ? 'bg-green-100 text-green-800'
            : row.original.status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 justify-end">
        <FaStar
          className={`w-5 h-5 ${
            row.original.starred ? 'text-yellow-500' : 'text-input'
          } cursor-pointer`}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-secondary">
              <HiOutlineDotsHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuItem>
              <FiEdit className="h-4 w-4 mr-2" />
              編集
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <FiTrash2 className="h-4 w-4 mr-2" />
              削除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
  },
]; 