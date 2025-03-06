'use client'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useGetUrls } from "@/hooks/useGetUrls"

export const Links = () => {
    const { data } = useGetUrls();

    return (
        <>
            <Tabs defaultValue="shortLinks">
                <Card className="bg-transparent text-white h-max">
                    <CardHeader>
                        <TabsList className="bg-lime-500 text-white">
                            <TabsTrigger className="bg-lime-500" value="shortLinks">Short links</TabsTrigger>
                            <TabsTrigger className="bg-lime-500" value="destinationUrl">Destination URL</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <TabsContent value="shortLinks">
                        <CardContent>
                            {data?.data?.map((item) => (
                                <div key={item.id} className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2">
                                    <p>{item.short_link}</p>
                                    <span>{item.clicks}</span>
                                </div>
                            )) || <p>No short links available</p>}
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="destinationUrl">
                        <CardContent>
                            {data?.data?.map((item) => (
                                <div key={item.id} className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between mb-2">
                                    <span
                                        className="hidden md:inline"
                                        title={item.destination_url}
                                    >
                                        {item.destination_url.length > 50
                                            ? `${item.destination_url.substring(0, 50)}...`
                                            : item.destination_url}
                                    </span>
                                    <span>{item.clicks}</span>
                                </div>
                            )) || <p>No destination URLs available</p>}
                        </CardContent>
                    </TabsContent>
                </Card>
            </Tabs >
        </>
    );
}
