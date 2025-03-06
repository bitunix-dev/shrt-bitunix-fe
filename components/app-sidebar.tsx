import { Link, BarChart } from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInformation,
} from "@/components/ui/sidebar";

import { Badge } from "@/components/ui/badge";

// Menu items.
const items = [
  {
    title: "Links",
    url: "/",
    icon: Link,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
    comingSoon: true,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="text-white">
      <SidebarContent className="bg-neutral-950 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-md my-4 mx-4">
            <Image
              src={
                "https://res.cloudinary.com/dilb4d364/image/upload/v1741247207/logo_file-01_lif9pq.png"
              }
              width={200}
              height={100}
              alt="logo"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="bg-lime-500 hover:bg-lime-600 text-black my-0.5 px-4 flex justify-between"
                  >
                    <a
                      href={item.url}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="flex items-center gap-1">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.comingSoon && (
                        <Badge className="bg-lime-600 float-end">Soon</Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarInformation />
      </SidebarContent>
    </Sidebar>
  );
}
