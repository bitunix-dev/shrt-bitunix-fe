import { clientApiRequest } from "@/services/clientApiRequest"
import {
  ApiResponseForTabsShrtLink,
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

interface setDataCountriesProps {
  setDataCountries: React.Dispatch<React.SetStateAction<{
    data: CountryData[];
    total: number;
    currentPage: number;
    lastPage: number;
  }>>;
  setDataCity: React.Dispatch<React.SetStateAction<{
    data: CityData[];
    total: number;
    currentPage: number;
    lastPage: number;
  }>>;
  setDataRegion: React.Dispatch<React.SetStateAction<{
    data: RegionData[];
    total: number;
    currentPage: number;
    lastPage: number;
  }>>;
  setDataContinents: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: ClickLocationData[];
    total: number;
  }>>;
  setDataBrowser: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: BrowserData[];
    total: number;
  }>>;
  setDataDevice: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: DeviceData[];
    total: number;
  }>>;
  setDataCampaign: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: CampaignData[];
    total: number;
  }>>;
  setDataContent: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: ContentData[];
    total: number;
  }>>;
  setDataMedium: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: MediumData[];
    total: number;
  }>>;
  setDataSource: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: SourceData[];
    total: number;
  }>>;
  setDataTerms: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    lastPage: number;
    data: TermData[];
    total: number;
  }>>;
  setIsClickShortLink: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleGetSpesifikShrtLink = async (
  param: string,
  {
    setDataCountries,
    setDataCity,
    setDataRegion,
    setIsClickShortLink,
    setDataContinents,
    setDataBrowser,
    setDataDevice,
    setDataCampaign,
    setDataContent,
    setDataMedium,
    setDataSource,
    setDataTerms,
  }: setDataCountriesProps
) => {
  try {
    const response = await clientApiRequest<ApiResponseForTabsShrtLink<CountryData>>({
      endpoint: `analytics/short-link/${param}`,
      method: "GET",
    });

    const countries = response.data.analytics.countries;
    const cities = response.data.analytics.cities;
    const regions = response.data.analytics.regions;
    const continents = response.data.analytics.continents;
    const browsers = response.data.analytics.browsers;
    const devices = response.data.analytics.devices;
    const campaigns = response.data.analytics.campaigns;
    const contents = response.data.analytics.contents;
    const mediums = response.data.analytics.mediums;
    const sources = response.data.analytics.sources;
    const terms = response.data.analytics.terms;

    setDataCountries({
      data: countries,          // ✅ sudah array
      total: 0,  // ✅ total dari panjang array
      currentPage: 1, // ✅ current page
      lastPage: 1, // ✅ last page`
    });

    setDataCity({
      data: cities, // ✅ data city kosong
      total: 0, // ✅ total city kosong
      currentPage: 1, // ✅ current page
      lastPage: 1, // ✅ last page 
    })

    setDataRegion({
      data: regions, // ✅ data region kosong
      total: 0, // ✅ total region kosong
      currentPage: 1, // ✅ current page
      lastPage: 1, // ✅ last page
    })

    setDataContinents({
      currentPage: 1,
      lastPage: 1,
      data: continents, // ✅ data continents
      total: 0, // ✅ total continents
    })

    setDataBrowser({
      currentPage: 1,
      lastPage: 1,
      data: browsers, // ✅ data browser kosong
      total: 0, // ✅ total browser kosong
    })

    setDataDevice({
      currentPage: 1,
      lastPage: 1,
      data: devices, // ✅ data device kosong
      total: 0, // ✅ total device kosong
    })

    setDataCampaign({
      currentPage: 1,
      lastPage: 1,
      data: campaigns, // ✅ data campaign kosong
      total: 0, // ✅ total campaign kosong
    })

    setDataContent({
      currentPage: 1,
      lastPage: 1,
      data: contents, // ✅ data content kosong
      total: 0, // ✅ total content kosong
    })

    setDataMedium({
      currentPage: 1,
      lastPage: 1,
      data: mediums, // ✅ data medium kosong
      total: 0, // ✅ total medium kosong
    })

    setDataSource({
      currentPage: 1,
      lastPage: 1,
      data: sources, // ✅ data source kosong
      total: 0, // ✅ total source kosong
    });

    setDataTerms({
      currentPage: 1,
      lastPage: 1,
      data: terms, // ✅ data terms kosong
      total: 0, // ✅ total terms kosong
    })

    setIsClickShortLink(true);
  } catch (error) {
    console.error("Error in handleGetSpesifikShrtLink:", error);
  }
};

