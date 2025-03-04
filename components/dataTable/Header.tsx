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

export const Header:React.FC<HeaderProps> = ({
    BtnCreate
}) => {
    return (
        <>
            <div className="flex items-center justify-between py-4">
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Filter <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Status: Active</DropdownMenuItem>
                            <DropdownMenuItem>Status: Expired</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
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
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 text-gray-500 w-4 h-4" />
                        <Input placeholder="Search..." className="pl-8 max-w-sm" />
                    </div>
                    {BtnCreate}
                </div>
            </div>
        </>
    )
} 