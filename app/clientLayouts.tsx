'use client'


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";


interface ClientLayoutsProps {
    children: React.ReactNode
}

const queryClient = new QueryClient();

export const ClientLayouts:React.FC<ClientLayoutsProps> = ({
    children
}) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="w-full">
                        <SidebarTrigger />
                        <div className="p-3 w-6xl mx-auto">{children}</div>
                    </main>
                </SidebarProvider>
            </QueryClientProvider>
        </>
    )
}