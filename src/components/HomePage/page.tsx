import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { MapPin } from "lucide-react";
import CategoryPage from "./category/page";

const HomePage = () => {
  return (
    <div>
      <div className="py-4 px-10">
        <h1 className="text-3xl font-bold italic ">Discover everything you need</h1>
        <div className="flex mt-4 gap-x-4">
          <div className="border-2 border-gray-800 rounded-sm w-1/5 items-center px-2 justify-star flex gap-x-1 ">
            <MapPin />
            <h1 className="text-lg">Patna</h1></div>
          <div className="rounded-sm border-2 border-gray-800 w-2/5">
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              {/* <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </CommandList> */}
            </Command>
          </div>
        </div>
      </div>

      <h1 className="font-semibold mt-3 px-10">Venue</h1>
      <CategoryPage />

    </div>
  );
};

export default HomePage;
