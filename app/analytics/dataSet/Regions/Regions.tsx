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
import { Countries } from "./Countries"


export const Regions = () => {
    return (
        <>
            <Tabs defaultValue="country">
                <Card className="bg-transparent text-white h-72">
                    <CardHeader>
                        <TabsList className="bg-lime-500 text-white">
                            <TabsTrigger className="bg-lime-500" value="country">Country</TabsTrigger>
                            <TabsTrigger className="bg-lime-500" value="destinatiouUrl">Destination URL</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <TabsContent value="country">
                        <CardContent>
                            <Countries/>
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="destinatiouUrl">
                        <CardContent>
                            <div className="bg-lime-300 text-black py-1 px-2 rounded-md flex justify-between">
                                <p>short.bitunixads.com/yo123</p>
                                <span>2</span>
                            </div>
                        </CardContent>
                    </TabsContent>
                </Card>
            </Tabs >
        </>
    )
}