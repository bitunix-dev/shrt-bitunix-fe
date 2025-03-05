export interface LinkPreview {
  image: string | null;
  title: string;
  description: string;
}

export interface UrlData {
  destination_url: string; // ✅ URL utama
  tags: string[]; // ✅ Array tags (misalnya ["referral", "customer relation"])
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  referral: string;
  preview?: LinkPreview | null; // ✅ Tambahkan preview untuk metadata
}

export interface ApiResponse {
  data: UrlData[];
}
