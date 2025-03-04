export interface Tag {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      url_id: number;
      tag_id: number;
    };
  }
  
  export interface UrlData {
    id: number;
    destination_url: string;
    short_link: string;
    qr_code: string | null;
    source: string | null;
    medium: string | null;
    campaign: string;
    term: string;
    content: string;
    referral: string;
    clicks: number;
    created_at: string;
    updated_at: string;
    mixed_url: string;
    tags: Tag[];
  }
  
  export interface ApiResponse {
    data: UrlData[];
  }
  