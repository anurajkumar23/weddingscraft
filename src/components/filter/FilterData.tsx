'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export interface Filters {
    rating: boolean
    budgetFriendly: boolean
    sortBy?: 'priceLowToHigh' | 'priceHighToLow'
    city?: string
    pincode?: string
}

const initialFilters: Filters = {
    rating: false,
    budgetFriendly: false,
    sortBy: undefined,
    city: "",
    pincode: ""
}

export default function OptimizedFilter() {
    const [filters, setFilters] = useState<Filters>(initialFilters)
    const router = useRouter()
    const searchParams = useSearchParams()

    // Load filters from URL params on initial render
    useEffect(() => {
        const newFilters: Filters = {
            rating: searchParams.get('rating') === 'true',
            budgetFriendly: searchParams.get('budgetFriendly') === 'true',
            sortBy: searchParams.get('sortBy') as Filters['sortBy'] || undefined,
            city: searchParams.get('city') || '',
            pincode: searchParams.get('pincode') || '',
        }
        setFilters(newFilters)
    }, [searchParams])

    const handleFilterChange = useCallback((name: keyof Filters, value: boolean | string) => {
        setFilters(prev => {
            const newFilters = { ...prev, [name]: value }
            updateURL(newFilters)
            return newFilters
        })
    }, [])

    const handleClearFilter = useCallback((name: keyof Filters) => {
        setFilters(prev => {
            const newFilters = { ...prev, [name]: initialFilters[name] }
            updateURL(newFilters)
            return newFilters
        })
    }, [])

    // Update URL with new filters
    const updateURL = useCallback((filters: Filters) => {
        const queryString = new URLSearchParams(
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '' && value !== false)
        ).toString()
        router.push(`?${queryString}`)
    }, [router])

    return (
        <div className="w-full ">
            <div className='max-w-xs mb-4'>
        <div 
          className='border border-gray-500 rounded-md p-2 flex items-center cursor-pointer' 
        >
          <SlidersHorizontal className='mr-2' size={24} />
          <span className='text-base font-medium'>Filters</span>
        </div>
      </div>
            <ScrollArea>
                <div className="flex w-max space-x-6 ">
                    <div className="flex gap-4 ">
                        {/* Rating Filter */}
                        <div className="flex items-center space-x-2 p-4 bg-slate-100 rounded-md border">
                            <Checkbox
                                id="rating"
                                checked={filters.rating}
                                onCheckedChange={(checked) => handleFilterChange('rating', !!checked)}
                            />
                            <Label htmlFor="rating" className="flex items-center">
                                Ratings (4 stars & up)
                                {filters.rating && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-2 p-0 h-auto"
                                        onClick={() => handleClearFilter('rating')}
                                    >
                                    </Button>
                                )}
                            </Label>
                        </div>

                        {/* Budget-friendly Filter */}
                        <div className="flex items-center space-x-2 bg-slate-100 rounded-md border p-4">
                            <Checkbox
                                id="budgetFriendly"
                                checked={filters.budgetFriendly}
                                onCheckedChange={(checked) => handleFilterChange('budgetFriendly', !!checked)}
                            />
                            <Label htmlFor="budgetFriendly" className="flex items-center">
                                Budget-friendly
                                {filters.budgetFriendly && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-2 p-0 h-auto"
                                        onClick={() => handleClearFilter('budgetFriendly')}
                                    >
                                    </Button>
                                )}
                            </Label>
                        </div>

                        {/* City Filter */}
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="city" className="whitespace-nowrap">City:</Label>
                            <div className="relative">
                                <Input
                                    id="city"
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange('city', e.target.value)}
                                    placeholder="Enter city name"
                                    className="pr-8"
                                />
                                {filters.city && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full p-0 px-2"
                                        onClick={() => handleClearFilter('city')}
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Clear city filter</span>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Pincode Filter */}
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="pincode" className="whitespace-nowrap">Pincode:</Label>
                            <div className="relative">
                                <Input
                                    id="pincode"
                                    value={filters.pincode}
                                    onChange={(e) => handleFilterChange('pincode', e.target.value)}
                                    placeholder="Enter pincode"
                                    className="pr-8"
                                />
                                {filters.pincode && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full p-0 px-2"
                                        onClick={() => handleClearFilter('pincode')}
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Clear pincode filter</span>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Sort By Filter */}
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="sortBy" className="whitespace-nowrap">Sort By:</Label>
                            <Select
                                onValueChange={(value) => handleFilterChange('sortBy', value as Filters['sortBy'])}
                                value={filters.sortBy}
                            >
                                <SelectTrigger id="sortBy" className="w-[180px]">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                                    <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                            {filters.sortBy && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-0 h-auto"
                                    onClick={() => handleClearFilter('sortBy')}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Clear sort filter</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
