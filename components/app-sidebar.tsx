import { Link, Scissors, Tag } from "lucide-react";
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

// Menu items.
const items = [
  {
    title: "Links",
    url: "#",
    icon: Link,
  },
  {
    title: "Shorten Link",
    url: "#shorten",
    icon: Scissors,
  },
  {
    title: "UTM Builder",
    url: "#utm-builder",
    icon: Tag,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="text-white">
      <SidebarContent className="bg-neutral-950 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white text-md mb-3">
            <Image
              src={'https://res.cloudinary.com/dilb4d364/image/upload/v1741247207/logo_file-01_lif9pq.png'}
              width={200}
              height={100}
              alt="logo"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="bg-lime-500 text-black my-0.5 px-4"
                  >
                    <a
                      href={item.url}
                      className="flex items-center gap-2 text-sm"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
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
