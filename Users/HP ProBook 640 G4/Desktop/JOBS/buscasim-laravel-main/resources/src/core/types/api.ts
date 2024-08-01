export interface BaseQuery {
  page?: number;
  order_by?: string;
  direction?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current: number;
    last_page: number;
  };
}

export interface ApiResponse {
  data?: any;
  message: string;
}
