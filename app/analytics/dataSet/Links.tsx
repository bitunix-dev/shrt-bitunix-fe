"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUrls } from "@/hooks/useGetUrls";
import * as React from "react";

export const Links = () => {
  const { data } = useGetUrls();
  const getFavicon = (url: string | URL) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (error) {
      console.error("Invalid URL:", url);
      return "/default-favicon.png";
    }
  };

  const FaviconWithFallback = ({ url }: { url: string | URL }) => {
    const [faviconExists, setFaviconExists] = React.useState(true);
    const faviconUrl = getFavicon(url);

    return (
      <div className="w-6 h-6 flex items-center justify-center mr-2">
        {faviconExists ? (
          <img
            src={faviconUrl}
            alt="Favicon URL"
            className="w-4 h-4 rounded-full border-2 border-green-400 p-0.5"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-green-400"></div>
        )}
      </div>
    );
  };
  return (
    <>
      <Tabs defaultValue="shortLinks">
        <Card className="bg-neutral-800 border border-neutral-800 text-white h-max box-border px-0">
          <CardHeader className="flex justify-between">
            <TabsList className="bg-transparent gap-2 text-black py-5">
              <TabsTrigger
                className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
                value="shortLinks"
              >
                Short links
              </TabsTrigger>
              <TabsTrigger
                className="bg-lime-500 hover:bg-lime-600 py-2 px-4"
                value="destinationUrl"
              >
                Destination URL
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="shortLinks">
            <CardContent>
              {data?.data?.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-700 text-white py-2 px-3 rounded-md flex items-center mb-2 justify-between box-border transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
                >
                  <div className="flex items-center w-[60%]">
                    <FaviconWithFallback url={item.destination_url} />
                    <p className="overflow-hidden">{item.short_link}</p>
                  </div>
                  <div className="font-bold flex gap-2 text-xs md:text-base">
                    {Number(item.clicks).toLocaleString("en-US")}
                    <p>clicks</p>
                  </div>
                </div>
              )) || <p>No short links available</p>}
            </CardContent>
          </TabsContent>
          <TabsContent value="destinationUrl">
            <CardContent>
              {data?.data?.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
                >
                  <span
                    className="hidden md:inline"
                    title={item.destination_url}
                  >
                    <div className="flex items-center">
                      <FaviconWithFallback url={item.destination_url} />
                      {item.destination_url.length > 50
                        ? `${item.destination_url.substring(0, 50)}...`
                        : item.destination_url}
                    </div>
                  </span>
                  <span className="font-bold">
                    {Number(item.clicks).toLocaleString("en-US")} clicks
                  </span>
                </div>
              )) || <p>No destination URLs available</p>}
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </>
  );
};
