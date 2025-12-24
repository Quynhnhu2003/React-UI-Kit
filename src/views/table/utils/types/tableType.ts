import { ReactNode } from "react";

export type Size = "sm" | "md" | "lg";
export type SortOrder = "asc" | "desc" | null;
export type Align = "left" | "center" | "right";
export type Variant = "default" | "bordered" | "ghost";

export interface Column<T> {
  // Generic để table dùng cho mọi loại data
  key: string;
  title: string;
  sortable?: boolean;
  dataIndex?: keyof T;
  width?: number | string;
  align?: Align;
  render?: (
    value: T[keyof T] | undefined,
    record: T,
    index: number
  ) => ReactNode;
  // cho phép custom cell (rất quan trọng)
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  
  searchable?: boolean;
  size?: Size;
  variant?: Variant;
  loading?: boolean;
  className?: string;
  emptyText?: string;
  pagination?: PaginationProps;
}

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  age: number;
}

