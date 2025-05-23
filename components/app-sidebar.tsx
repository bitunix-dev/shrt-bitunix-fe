'use client'

import { Globe, BarChart } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { logout } from "@/services/authServices";
import { BtnLogout } from "./BtnLogout";

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
  SidebarFooter
} from "@/components/ui/sidebar";

import { Badge } from "@/components/ui/badge";

// Menu items.
const items = [
  {
    title: "Links",
    url: "/",
    icon: Globe,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
    comingSoon: false,
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
                    className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black my-0.5 px-4 flex justify-between"
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
      <SidebarFooter className="bg-neutral-950">
        {/* <Button onClick={() => handleLogout()} variant={'destructive'} className="">Log Out</Button> */}
        <BtnLogout/>
      </SidebarFooter>
    </Sidebar>
  );
}
