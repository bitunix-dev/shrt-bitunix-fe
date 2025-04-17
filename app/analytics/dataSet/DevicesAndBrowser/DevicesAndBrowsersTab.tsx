import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Browsers } from "./Browsers";
import { Devices } from "./Devices";
import { BrowserData, DeviceData } from "@/app/Get/dataTypes";

interface DevicesAndBrowsersTabProps {
   dataBrowser: {
      currentPage: number;
      lastPage: number;
      data: BrowserData[];
      total: number;
    };
    setDataBrowser: React.Dispatch<
      React.SetStateAction<{
        currentPage: number;
        lastPage: number;
        data: BrowserData[];
        total: number;
      }>
    >;
    dataDevice: {
      currentPage: number;
      lastPage: number;
      data: DeviceData[];
      total: number;
    };
    setDataDevice: React.Dispatch<
      React.SetStateAction<{
        currentPage: number;
        lastPage: number;
        data: DeviceData[];
        total: number;
      }>
    >;
    isClickShortLink: boolean;
}

export const DevicesAndBrowsersTab:React.FC<DevicesAndBrowsersTabProps> = ({
  dataBrowser,
  setDataBrowser,
  dataDevice,
  setDataDevice,
  isClickShortLink
}) => {
  return (
    <Tabs defaultValue="devices">
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-max">
        <CardHeader>
          <TabsList className="bg-transparent gap-2 text-black py-5">
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="devices"
            >
              Devices
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="browsers"
            >
              Browsers
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="devices">
          <CardContent>
            <Devices data={dataDevice} setData={setDataDevice} isClickShortLink={isClickShortLink}/>
          </CardContent>
        </TabsContent>
        <TabsContent value="browsers">
          <CardContent>
            <Browsers data={dataBrowser} setData={setDataBrowser} isClickShortLink={isClickShortLink}/>
          </CardContent>  
        </TabsContent>
      </Card>
    </Tabs>
  );
};
