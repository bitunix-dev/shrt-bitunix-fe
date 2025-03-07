import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Browsers } from "./Browsers";
import { Devices } from "./Devices";

export const DevicesAndBrowsersTab = () => {
  return (
    <Tabs defaultValue="devices">
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-max">
        <CardHeader>
          <TabsList className="bg-transparent gap-2 text-black py-5">
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="devices"
            >
              Devices
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="browsers"
            >
              Browsers
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="devices">
          <CardContent>
            <Devices />
          </CardContent>
        </TabsContent>
        <TabsContent value="browsers">
          <CardContent>
            <Browsers />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};
