import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Countries } from "./Countries";
import { Cities } from "./Cities";
import { Regions } from "./Regions";
import { Continents } from "./Continents";
import { CountryData, CityData, RegionData, ClickLocationData } from "@/app/Get/dataTypes";
import React from "react";


interface RegionsTabsProps {
  dataCountries: {
    currentPage: number;
    lastPage: number;
    data: CountryData[];
    total: number;
  };
  setDataCountries: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: CountryData[];
      total: number;
    }>
  >;
  dataCity: {
    currentPage: number;
    lastPage: number;
    data: CityData[];
    total: number;
  }
  setDataCity: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: CityData[];
      total: number;
    }>
  >;
  dataRegion: {
    currentPage: number;
    lastPage: number;
    data: RegionData[];
    total: number;
  }
  setDataRegion: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: RegionData[];
      total: number;
    }>
  >;
  dataContinents: {
    currentPage: number;
    lastPage: number;
    data: ClickLocationData[];
    total: number;
  }
  setDataContinents: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: ClickLocationData[];
      total: number;
    }>
  >;
  isClickShortLink: boolean;
}

export const RegionsTabs: React.FC<RegionsTabsProps> = ({
  dataCountries,
  setDataCountries,
  dataCity,
  setDataCity,
  dataRegion,
  setDataRegion,
  dataContinents,
  setDataContinents,
  isClickShortLink,
}) => {
  return (
    <Tabs defaultValue="country">
      <Card className="bg-neutral-800 border border-neutral-800 text-white h-max">
        <CardHeader className="h-20 xl:h-10 mb-5">
          <TabsList className="bg-transparent gap-2 text-black py-5 grid grid-cols-3 lg:grid-cols-4">
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="country"
            >
              Country
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="city"
            >
              City
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="region"
            >
              Region
            </TabsTrigger>
            <TabsTrigger
              className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
              value="continent"
            >
              Continent
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="country">
          <CardContent>
            <Countries data={dataCountries} setData={setDataCountries} isClickShortLink={isClickShortLink} />
          </CardContent>
        </TabsContent>
        <TabsContent value="city">
          <CardContent>
            <Cities data={dataCity} setData={setDataCity} isClickShortLink={isClickShortLink} />
          </CardContent>
        </TabsContent>
        <TabsContent value="region">
          <CardContent>
            <Regions data={dataRegion} setData={setDataRegion} isClickShortLink={isClickShortLink} />
          </CardContent>
        </TabsContent>
        <TabsContent value="continent">
          <CardContent>
            <Continents data={dataContinents} setData={setDataContinents} isClickShortLink={isClickShortLink}/>
          </CardContent>
        </TabsContent>
      </Card>
    </Tabs>
  );
};
