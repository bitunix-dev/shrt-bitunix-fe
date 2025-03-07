import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Countries } from "./Countries";
import { Cities } from "./Cities";
import { Regions } from "./Regions";
import { Continents } from "./Continents";

export const RegionsTabs = () => {
  return (
    <Tabs defaultValue="country">
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-max">
        <CardHeader className="h-20 xl:h-10 mb-5">
          <TabsList className="bg-transparent gap-2 text-black py-5 grid grid-cols-3 lg:grid-cols-4">
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="country"
            >
              Country
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="city"
            >
              City
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="region"
            >
              Region
            </TabsTrigger>
            <TabsTrigger
              className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
              value="continent"
            >
              Continent
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="country">
          <CardContent>
            <Countries />
          </CardContent>
        </TabsContent>
        <TabsContent value="city">
          <CardContent>
            <Cities />
          </CardContent>
        </TabsContent>
        <TabsContent value="region">
          <CardContent>
            <Regions />
          </CardContent>
        </TabsContent>
        <TabsContent value="continent">
          <CardContent>
            <Continents />
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};
