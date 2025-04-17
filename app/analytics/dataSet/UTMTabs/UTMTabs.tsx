import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Source } from "./Source";
import { Medium } from "./Medium";
import { Campaign } from "./Campaign";
import { Term } from "./Term";
import { Content } from "./Content";
import { CampaignData, ContentData, SourceData, TermData } from "@/app/Get/dataTypes";

interface UTMTabsProps {
  dataCampaign: {
    currentPage: number;
    lastPage: number;
    data: CampaignData[]; // Replace with actual type
    total: number;
  };
  setDataCampaign: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: CampaignData[]; // Replace with actual type
      total: number;
    }>
  >;
  dataContent: {
    currentPage: number;
    lastPage: number;
    data: ContentData[]; // Replace with actual type
    total: number;
  };
  setDataContent: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: ContentData[]; // Replace with actual type
      total: number;
    }>
  >;
  dataMedium: {
    currentPage: number;
    lastPage: number;
    data: ContentData[]; // Replace with actual type
    total: number;
  };
  setDataMedium: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: ContentData[]; // Replace with actual type
      total: number;
    }>
  >;
  dataSource: {
    currentPage: number;
    lastPage: number;
    data: SourceData[]; // Replace with actual type
    total: number;
  };
  setDataSource: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: SourceData[]; // Replace with actual type
      total: number;
    }>
  >;
  dataTerms: {
    currentPage: number;
    lastPage: number;
    data: TermData[]; // Replace with actual type
    total: number;
  };
  setDataTerms: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: TermData[]; // Replace with actual type
      total: number;
    }>
  >;
  isClickShortLink: boolean;
}

export const UTMTabs:React.FC<UTMTabsProps> = ({
  dataCampaign,
  setDataCampaign,
  dataContent,
  setDataContent,
  dataMedium,
  setDataMedium,
  dataSource,
  setDataSource,
  dataTerms,
  setDataTerms,
  isClickShortLink
}) => {
  return (
    <Tabs defaultValue="source">
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-max">
        <CardHeader className="h-20 xl:h-10 mb-5">
          {/* TabsList sekarang akan wrap ke bawah jika layar mengecil */}
          <TabsList className="bg-transparent gap-2 text-black py-5 grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="source"
            >
              Source
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="medium"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="campaign"
            >
              Campaign
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="term"
            >
              Term
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="content"
            >
              Content
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="source">
          <CardContent>
            <Source data={dataSource} setData={setDataSource} isClickShortLink={isClickShortLink}/>
          </CardContent>
        </TabsContent>
        <TabsContent value="medium">
          <CardContent>
            <Medium data={dataMedium} setData={setDataMedium} isClickShortLink={isClickShortLink}/>
          </CardContent>
        </TabsContent>
        <TabsContent value="campaign">
          <CardContent>
            <Campaign data={dataCampaign} setData={setDataCampaign} isClickShortLink={isClickShortLink}/>
          </CardContent>
        </TabsContent>
        <TabsContent value="term">s
          <CardContent>
            <Term data={dataTerms} setData={setDataTerms} isClickShortLink={isClickShortLink}/>
          </CardContent>
        </TabsContent>
        <TabsContent value="content">
          <CardContent>
            <Content data={dataContent} setData={setDataContent} isClickShortLink={isClickShortLink}/>
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};
