import { MapPin, Search } from "lucide-react"
import GlobalSearch from "./GlobalSearch"

type SearchBarProps = {
  initialQuery: string
  initialResults: Record<string, any[]>
}

const SearchBar = ({ initialQuery, initialResults }: SearchBarProps) => {
  return (
    <div className=" py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
          Discover Your Dream Wedding
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg hidden md:flex items-center px-4 py-3 w-full md:w-auto">
            <MapPin className="text-red-600 mr-2" />
            <span className="text-lg font-medium text-gray-800">Patna</span>
          </div>
          <div className="w-full md:w-3/5">
            <GlobalSearch initialQuery={initialQuery} initialResults={initialResults} />
          </div>
          <button className="bg-zinc-800 hidden md:block text-white px-8 py-4 rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300 w-full md:w-auto">
            <Search className="inline-block mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar