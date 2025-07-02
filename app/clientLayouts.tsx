"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Footer } from "@/components/Footer/Footer";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientLayoutsProps {
  children: React.ReactNode;
}

// Component that uses hooks requiring QueryClient
const AuthenticatedContent: React.FC<{
  showSidebar: boolean;
  children: React.ReactNode;
  userName: string;
  avatar: string;
  isLoading: boolean;
}> = ({ showSidebar, children, userName, avatar, isLoading }) => {
  const router = useRouter();


  return (
    <>
      {showSidebar && (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-neutral-950">
            <header className="flex h-16 shrink-0 bg-neutral-950 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center justify-between w-full gap-2 px-4">
                <SidebarTrigger className="text-white" />
                <div className="flex items-center gap-3">
                  {isLoading ? (
                    <p className="text-white">Loading...</p>
                  ) : (
                    <>
                      <p className="text-white">Hi {userName || "Guest"}</p>
                      <Avatar>
                        <AvatarImage src={avatar} alt="avatar" />
                        <AvatarFallback>
                          {userName ? userName.charAt(0).toUpperCase() : "G"}
                        </AvatarFallback>
                      </Avatar>
                    </>
                  )}
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
      {!showSidebar && <div>{children}</div>}
    </>
  );
};

export const ClientLayouts: React.FC<ClientLayoutsProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const showSidebar = pathname
    ? !["/login", "/register"].some((path) => pathname.startsWith(path))
    : false;

  // Create a stable QueryClient instance
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  }), []);

  // Initialize state variables
  const [userName, setUserName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Get user data from localStorage
  useEffect(() => {
    const getUserData = () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem("user_data");
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || "");
          setAvatar(user.avatar || "");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (showSidebar) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [showSidebar]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthenticatedContent
          showSidebar={showSidebar}
          userName={userName}
          avatar={avatar}
          isLoading={isLoading}
        >
          {children}
        </AuthenticatedContent>
      </QueryClientProvider>
    </>
  );
};
