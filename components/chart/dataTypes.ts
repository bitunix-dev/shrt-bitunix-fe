export interface ClickData {
    hour: string;
    clicks: number;
}

export interface ApiResponse {
    status: number;
    data: {
        clicks: ClickData[];
        total_clicks: number;
    };
}
