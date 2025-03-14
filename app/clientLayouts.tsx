"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Footer } from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

interface ClientLayoutsProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ClientLayouts: React.FC<ClientLayoutsProps> = ({ children }) => {
  const pathname = usePathname();
  const showSidebar = pathname ? !['/login', '/register'].some(path => pathname.startsWith(path)) : false;
  
  // Initialize state variables
  const [userName, setUserName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  // Access localStorage safely in useEffect after component is mounted
  useEffect(() => {
    // This only runs in the browser, after the component mounts
    const storedUserName = localStorage.getItem("userName") || "";
    const storedAvatar = localStorage.getItem("avatar") || "";
    
    setUserName(storedUserName);
    setAvatar(storedAvatar);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {showSidebar && (
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-neutral-950">
              <header className="flex h-16 shrink-0 bg-neutral-950 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center justify-between w-full gap-2 px-4">
                  <SidebarTrigger className="text-white" />
                  <div className="flex items-center gap-3">
                    <p className="text-white">Hi {userName}</p>
                    <Avatar>
                      <AvatarImage src={avatar} alt="avatar" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </header>
              <main className="w-full">
                <div className="p-5 w-8xl mx-auto">{children}</div>
                <Footer />
              </main>
            </SidebarInset>
          </SidebarProvider>
        )}
        {!showSidebar && (
          <div>{children}</div>
        )}
      </QueryClientProvider>
    </>
  );
};