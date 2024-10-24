'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDebounce } from '@/hooks/useDebounce'
import searchAll from '@/utils/GlobalSearch/GlobalSearch'
import { Search } from 'lucide-react'

type GlobalSearchProps = {
  initialQuery: string
  initialResults: Record<string, any[]>
}

const GlobalSearch = ({ initialQuery, initialResults }: GlobalSearchProps) => {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState(initialResults)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()

  useEffect(() => {
    if (debouncedQuery) {
      searchAll(debouncedQuery).then(setResults)
    } else {
      setResults({})
    }
  }, [debouncedQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for venues, caterers, decorators, or photographers..."
          className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-800 placeholder-gray-500"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {Object.keys(results).length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {Object.entries(results).map(([category, items]) => (
            <div key={category} className="p-4 border-b border-gray-200 last:border-b-0">
              <h3 className="text-sm font-semibold text-gray-700 capitalize mb-2">{category}</h3>
              <ul className="space-y-2">
                {items.slice(0, 3).map((item) => (
                  <li key={item._id}>
                    <Link href={`/${category}/${item._id}`} className="text-blue-600 hover:underline block py-1 px-2 rounded hover:bg-gray-100 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* <div className="p-4">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              View all results
            </button>
          </div> */}
        </div>
      )}
    </form>
  )
}

export default GlobalSearch