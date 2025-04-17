'use client'
import { LineChart } from "@/components/chart/LineChart";
import { Links } from "./dataSet/Links";
import { RegionsTabs } from "./dataSet/Regions/RegionsTabs";
import { DevicesAndBrowsersTab } from "./dataSet/DevicesAndBrowser/DevicesAndBrowsersTab";
import { UTMTabs } from "./dataSet/UTMTabs/UTMTabs";
import { BarChart } from "lucide-react";
import { useState } from "react";
import {
  CountryData,
  CityData,
  RegionData,
  ClickLocationData,
  BrowserData,
  DeviceData,
  CampaignData,
  ContentData,
  MediumData,
  SourceData,
  TermData,
} from "@/app/Get/dataTypes";

export default function Page() {
  const [isClickShortLink, setIsClickShortLink] = useState(false);
  const [dataCountries, setDataCountries] = useState<{
    currentPage: number;
    lastPage: number;
    data: CountryData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0,
  });
  const [dataCity, setDataCity] = useState<{
    currentPage: number;
    lastPage: number;
    data: CityData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0,
  });
  const [dataRegion, setDataRegion] = useState<{
    currentPage: number;
    lastPage: number;
    data: RegionData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0,
  });
  const [dataContinents, setDataContinents] = useState<{
    currentPage: number;
    lastPage: number;
    data: ClickLocationData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0,
  });
  const [dataBrowser, setDataBrowser] = useState<{
    currentPage: number;
    lastPage: number;
    data: BrowserData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });
  const [dataDevice, setDataDevice] = useState<{
    currentPage: number;
    lastPage: number;
    data: DeviceData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });
  const [dataCampaign, setDataCampaign] = useState<{
    currentPage: number;
    lastPage: number;
    data: CampaignData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });
  const [dataContent, setDataContent] = useState<{
    currentPage: number;
    lastPage: number;
    data: ContentData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });
  const [dataMedium, setDataMedium] = useState<{
    currentPage: number;
    lastPage: number;
    data: MediumData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });
  const [dataSource, setDataSource] = useState<{
    currentPage: number;
    lastPage: number;
    data: SourceData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });
  const [dataTerms, setDataTerms] = useState<{
    currentPage: number;
    lastPage: number;
    data: TermData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });
  return (
    <>
      <div className="flex items-center gap-2">
        <BarChart className="w-6 h-6 text-[var(--bitunix)]" />
        <h1 className="text-2xl font-bold text-[var(--bitunix)]">Analytics</h1>
      </div>
      <div className="mt-8">
        <LineChart />
      </div>
      <div className="grid md:grid-cols-2 gap-10 mt-10 mb-20">
        <Links
          setDataCountries={setDataCountries}
          setDataCity={setDataCity}
          setDataRegion={setDataRegion}
          setDataContinents={setDataContinents}
          setDataBrowser={setDataBrowser}
          setDataDevice={setDataDevice}
          setDataCampaign={setDataCampaign}
          setDataContent={setDataContent}
          setDataMedium={setDataMedium}
          setDataSource={setDataSource}
          setDataTerms={setDataTerms}
          setIsClickShortLink={setIsClickShortLink}
        />
        <RegionsTabs
          setDataCountries={setDataCountries}
          dataCountries={dataCountries}
          setDataCity={setDataCity}
          dataCity={dataCity}
          dataRegion={dataRegion}
          setDataRegion={setDataRegion}
          dataContinents={dataContinents}
          setDataContinents={setDataContinents}
          isClickShortLink={isClickShortLink}
        />
        <DevicesAndBrowsersTab
          dataBrowser={dataBrowser}
          setDataBrowser={setDataBrowser}
          dataDevice={dataDevice}
          setDataDevice={setDataDevice}
          isClickShortLink={isClickShortLink}
        />
        <UTMTabs 
          dataCampaign={dataCampaign}
          setDataCampaign={setDataCampaign}
          dataContent={dataContent}
          setDataContent={setDataContent}
          dataMedium={dataMedium}
          setDataMedium={setDataMedium}
          dataSource={dataSource}
          setDataSource={setDataSource}
          dataTerms={dataTerms}
          setDataTerms={setDataTerms}
          isClickShortLink={isClickShortLink}
        />
      </div>
    </>
  );
}
