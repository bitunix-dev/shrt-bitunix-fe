export interface LinkPreview {
  image: string | null;
  title: string;
  description: string;
}

// ✅ Struktur untuk data klik berdasarkan URL
export interface UrlData {
  destination_url: string; 
  tags: string[]; 
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  referral: string;
  preview?: LinkPreview | null; 
}

// ✅ Struktur data klik berdasarkan lokasi
export interface ClickLocationData {
  id: number;
  country?: string;
  city?: string;
  region?: string;
  continent?: string;
  total_clicks: number;
}

// ✅ Struktur data klik berdasarkan perangkat & browser
export interface ClickDeviceData {
  id: number;
  device?: string;
  browser?: string;
  total_clicks: number;
}

// ✅ Struktur data klik berdasarkan UTM
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

// ✅ Struktur utama untuk API Response
export interface ApiResponse<T = any> {
  status: number;
  data: T[];
}
