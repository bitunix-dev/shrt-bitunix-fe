"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Footer } from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import React from "react";

interface ClientLayoutsProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const ClientLayouts: React.FC<ClientLayoutsProps> = ({ children }) => {

  const pathname = usePathname();
  const showSidebar = pathname ? !['/login', '/register'].some(path => pathname.startsWith(path)) : false;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {showSidebar && (
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger className="text-white" />
              <div className="p-5 w-8xl mx-auto">{children}</div>
              <Footer />
            </main>
          </SidebarProvider>
        )}
        {!showSidebar && (
          <div>{children}</div>
        )}
      </QueryClientProvider>
    </>
  );
};
