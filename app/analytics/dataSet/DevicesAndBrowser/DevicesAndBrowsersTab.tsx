import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Browsers } from "./Browsers";
import { Devices } from "./Devices";

export const DevicesAndBrowsersTab = () => {
  return (
    <Tabs defaultValue="devices">
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-72">
        <CardHeader>
          <TabsList className="bg-lime-500 text-white">
            <TabsTrigger className="bg-lime-500" value="devices">
              Devices
            </TabsTrigger>
            <TabsTrigger className="bg-lime-500" value="browsers">
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
