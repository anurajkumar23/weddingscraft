'use client'

import { useState, useEffect } from 'react'
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { useDebounce } from '@/hooks/useDebounce'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type SearchResult = {
  id: string
  name: string
  type: 'Banquet' | 'Caterer' | 'Decorator' | 'Photographer'
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()

  useEffect(() => {
    if (debouncedQuery) {
      searchAll(debouncedQuery)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  const searchAll = async (searchQuery: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
      const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') || '' : ''

      const endpoints = [
        { path: 'banquet', type: 'Banquet' },
        { path: 'caterer', type: 'Caterer' },
        { path: 'decor', type: 'Decorator' },
        { path: 'photographer', type: 'Photographer' }
      ]

      const searches = endpoints.map(endpoint =>
        axios.get(`${API_URL}/${endpoint.path}?search=${searchQuery}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      )

      const responses = await Promise.all(searches)
      const allResults: SearchResult[] = responses.flatMap((response, index) => {
        if (response.data && response.data.message === 'success' && Array.isArray(response.data.data)) {
          return response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: endpoints[index].type as SearchResult['type'],
          }))
        }
        return []
      })

      // Sort results by relevance
      const sortedResults = allResults.sort((a, b) => {
        const aRelevance = calculateRelevance(a.name, searchQuery)
        const bRelevance = calculateRelevance(b.name, searchQuery)
        return bRelevance - aRelevance
      })

      setResults(sortedResults.slice(0, 10)) // Limit to top 10 results
    } catch (error) {
      console.error('Error in global search:', error)
      setResults([])
    }
  }

  const calculateRelevance = (name: string, query: string): number => {
    const lowerName = name.toLowerCase()
    const lowerQuery = query.toLowerCase()
    if (lowerName === lowerQuery) return 1
    if (lowerName.startsWith(lowerQuery)) return 0.8
    if (lowerName.includes(lowerQuery)) return 0.6
    return 0
  }

  const handleSelect = (result: SearchResult) => {
    router.push(`/${result.type.toLowerCase()}/${result.id}`)
  }

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Search for venues, caterers, decorators, or photographers..."
        value={query}
        onValueChange={setQuery}
      />
      {results.length > 0 && (
        <CommandList>
          {results.map((result) => (
            <CommandItem key={result.id} onSelect={() => handleSelect(result)}>
              <span>{result.name}</span>
              <span className="ml-2 text-sm text-muted-foreground">({result.type})</span>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  )
}