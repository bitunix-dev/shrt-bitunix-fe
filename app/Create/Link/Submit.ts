import { clientApiRequest } from "@/services/clientApiRequest"

interface DataBody {
    destination_url: string;
    tags: string[];
    short_link?: string;
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    referral?: string;
    vipCode?: string;
}

interface SubmitProps {
    dataBody: DataBody
}

interface ApiResponse {
    status: number;
    message: string;
    data: any; // Replace `any` with a more specific type if known
}

export const SubmitCreate = async ({dataBody}: SubmitProps): Promise<ApiResponse> => {
    try{
        const response: ApiResponse = await clientApiRequest({
            endpoint: 'urls',
            method: 'POST',
            body: dataBody
        })

        return response
    } catch (error) {
        console.log(error)
        throw error; // ✅ Throw the original error instead of creating a new generic one
    }
}