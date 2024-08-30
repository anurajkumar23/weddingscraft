

import {
    Command,
    CommandInput,
} from "@/components/ui/command";
import { MapPin } from "lucide-react";

const SearchBar = () => {
    return (
        <div>
            <div className="justify-center text-center items-center py-16">
                <h1 className="text-3xl font-bold text-white ">Discover everything you need</h1>
                <div className="min-h-[51px]  flex mt-4 gap-x-4 justify-center container">
                    <div className="bg-white shadow-sm rounded-sm w-1/5 items-center px-2 justify-star flex gap-x-1 ">
                        <MapPin />
                        <h1 className="text-lg">Patna</h1></div>
                    <div className="rounded-sm  bg-white w-1/3">
                        <Command>
                            <CommandInput className="h-full w-full" placeholder="Type a command or search..." />
                        </Command>   
                    </div>
                    <button
                    className="text-white overflow-hidden gap-2.5 self-stretch px-10  rounded-md bg-zinc-800 max-md:px-5"
                    > Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
