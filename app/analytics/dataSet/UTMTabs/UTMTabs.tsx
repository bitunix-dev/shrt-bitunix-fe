import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Source } from "./Source";
import { Medium } from "./Medium";
import { Campaign } from "./Campaign";
import { Term } from "./Term";
import { Content } from "./Content";

export const UTMTabs = () => {
  return (
    <Tabs defaultValue="source">
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-max">
        <CardHeader>
          <TabsList className="bg-transparent gap-2 text-black py-5">
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="source"
            >
              Source
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="medium"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="campaign"
            >
              Campaign
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="term"
            >
              Term
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="content"
            >
              Content
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="source">
          <CardContent>
            <Source />
          </CardContent>
        </TabsContent>
        <TabsContent value="medium">
          <CardContent>
            <Medium />
          </CardContent>
        </TabsContent>
        <TabsContent value="campaign">
          <CardContent>
            <Campaign />
          </CardContent>
        </TabsContent>
        <TabsContent value="term">
          <CardContent>
            <Term />
          </CardContent>
        </TabsContent>
        <TabsContent value="content">
          <CardContent>
            <Content />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};
