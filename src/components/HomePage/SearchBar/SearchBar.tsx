

import {
    Command,
    CommandInput,
} from "@/components/ui/command";
import { MapPin } from "lucide-react";

const SearchBar = () => {
    return (
        <div>
            <div className="justify-center text-center items-center md:py-16 py-6">
                <h1 className="md:text-3xl text-xl font-bold text-white ">Discover everything you need</h1>
                <div className="min-h-[51px]  flex mt-4 gap-x-4 justify-center container">
                    <div className="md:flex hidden bg-white shadow-sm rounded-sm w-1/5 items-center px-2 justify-start  gap-x-1 ">
                        <MapPin />
                        <h1 className="md:text-lg ">Patna</h1>
                    </div>
                    <div className="rounded-md shadow-xl md:h-auto bg-white md:w-1/3 w-2/3">
                        <Command>
                            <CommandInput className="md:h-full w-full" placeholder="Type a command or search..." />
                        </Command>
                    </div>
                    <button
                        className="hidden md:block text-white overflow-hidden gap-2.5 self-stretch px-10  rounded-md bg-zinc-800 max-md:px-5"
                    > Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
