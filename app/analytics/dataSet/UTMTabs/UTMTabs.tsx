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
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-72">
        <CardHeader>
          <TabsList className="bg-lime-500 text-white">
            <TabsTrigger className="bg-lime-500" value="source">
              Source
            </TabsTrigger>
            <TabsTrigger className="bg-lime-500" value="medium">
              Medium
            </TabsTrigger>
            <TabsTrigger className="bg-lime-500" value="campaign">
              Campaign
            </TabsTrigger>
            <TabsTrigger className="bg-lime-500" value="term">
              Term
            </TabsTrigger>
            <TabsTrigger className="bg-lime-500" value="content">
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
