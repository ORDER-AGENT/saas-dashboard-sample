import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusBadgeClass(value: string): string {
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
