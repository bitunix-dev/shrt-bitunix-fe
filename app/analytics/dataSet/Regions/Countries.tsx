'use client'
import { useGetClicksCountries } from "@/hooks/useGetClicksCountries"

export const Countries = () => {
    const { data } = useGetClicksCountries();

    return (
        <>
            {data?.data?.map((item, index) => (
                <div key={index} className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2">
                    <p>{item.country}</p>
                    <span>{item.total_clicks}</span>
                </div>
            )) || <p>No country data available</p>}
        </>
    );
}