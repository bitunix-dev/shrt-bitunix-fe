import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    ChevronDown,
    Search,
} from "lucide-react";

import { Input } from "../ui/input";

import { Button } from "../ui/button";

interface HeaderProps {
    BtnCreate: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
    BtnCreate
}) => {
    return (
        <>
            <div className="md:flex items-center justify-between gap-3 py-4">
                <div className="flex gap-2 mb-2 md:mb-0">
                    <div className="w-full">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full" asChild>
                                <Button variant="outline">
                                    Filter <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>Status: Active</DropdownMenuItem>
                                <DropdownMenuItem>Status: Expired</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="w-full">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full" asChild>
                                <Button variant="outline">
                                    Display <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>Show all columns</DropdownMenuItem>
                                <DropdownMenuItem>Customize columns</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <div className="relative w-sm max-w-xl">
                        <Search className="absolute left-2 top-2.5 text-gray-500 w-4 h-4" />
                        <Input placeholder="Search..." className="pl-8" />
                    </div>
                    {BtnCreate}
                </div>
            </div>
        </>
    )
} 