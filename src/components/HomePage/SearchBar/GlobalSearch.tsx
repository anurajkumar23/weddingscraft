'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDebounce } from '@/hooks/useDebounce'
import searchAll from '@/utils/GlobalSearch/GlobalSearch'
import { Search, X } from 'lucide-react'

type GlobalSearchProps = {
  initialQuery: string
  initialResults: Record<string, any[]>
}

export default function Component({ initialQuery, initialResults }: GlobalSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState(initialResults)
  const [searchMade, setSearchMade] = useState(false) 
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()

  useEffect(() => {
    if (debouncedQuery) {
      setSearchMade(true) 
      searchAll(debouncedQuery).then((res) => {
        setResults(res)
      })
    } else {
      setSearchMade(false) 
      setResults({})
    }
  }, [debouncedQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`)
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults({})
    setSearchMade(false) 
  }

  const hasResults = Object.values(results).some(category => category.length > 0)

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
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      {searchMade && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {hasResults ? (
            Object.entries(results).map(([category, items]) => (
              items.length > 0 && (
                <div key={category} className="p-4 border-b border-gray-200 last:border-b-0">
                  <h3 className="text-sm font-semibold text-gray-700 capitalize mb-2">{category}</h3>
                  <ul className="space-y-2">
                    {items.slice(0, 3).map((item) => (
                      <li key={item._id}>
                        <Link 
                          href={`/${(() => {
                            switch(category) {
                              case 'banquets': return 'Banquet';
                              case 'caterers': return 'Caterer';
                              case 'decorators': return 'Decorator';
                              case 'photographers': return 'Photographer';
                              default: return 'Banquet';
                            }
                          })()}/${item._id}`} 
                          className="text-blue-600 hover:underline block py-1 px-2 rounded hover:bg-gray-100 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))
          ) : (
            <div className="p-4 text-center text-gray-700">
              No data found
            </div>
          )}
        </div>
      )}
    </form>
  )
}
