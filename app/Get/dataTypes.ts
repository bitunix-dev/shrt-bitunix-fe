// Link Preview type definition
export interface LinkPreview {
  image: string | null;
  title: string;
  description: string;
}

// URL data structure
export interface UrlData {
  id?: number;
  destination_url: string; 
  short_link?: string;
  tags: string[] | {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      url_id: number;
      tag_id: number;
    };
  }[]; 
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
  referral: string | null;
  clicks?: number;
  created_at?: string;
  updated_at?: string;
  preview?: LinkPreview | null;
  qr_code?: string | null;
  mixed_url?: string;
}

// Location-based click data
export interface ClickLocationData {
  id: number;
  country?: string;
  country_flag?: string; // For country flags in UI
  city?: string;
  region?: string;
  continent?: string;
  total_clicks: number;
}

// Device and browser click data
export interface ClickDeviceData {
  id: number;
  device?: string;
  browser?: string;
  total_clicks: number;
}

// UTM parameter click data
export interface ClickUTMData {
  id: number;
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referral?: string;
  total_clicks: number;
}

// Pagination metadata structure
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

// Paginated data structure
export interface PaginatedData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// API Response that can handle both direct arrays and paginated data
export interface ApiResponse<T = any> {
  status: number;
  data: T[] | PaginatedData<T>;
}

// Type guard to check if a response is paginated
export function isPaginatedResponse<T>(data: T[] | PaginatedData<T>): data is PaginatedData<T> {
  return (data as PaginatedData<T>).current_page !== undefined;
}