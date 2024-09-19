'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
import { ChevronDown, ChevronUp, X } from "lucide-react"

export interface FilterProps {
  showFilters: boolean
  onApplyFilters: (filters: Filters) => void
}

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

const Filter = React.memo(({ showFilters, onApplyFilters }: FilterProps) => {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleFilterChange = useCallback((name: keyof Filters, value: boolean | string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [])

  useEffect(() => {
    onApplyFilters(filters)
  }, [filters, onApplyFilters])

  if (!showFilters) return null

  return (
    <div className="bg-background rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="filter-content"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span className="sr-only">{isExpanded ? 'Collapse filters' : 'Expand filters'}</span>
        </Button>
      </div>
      <div id="filter-content" className={`space-y-4 ${isExpanded ? '' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rating"
              checked={filters.rating}
              onCheckedChange={(checked) => handleFilterChange('rating', checked as boolean)}
            />
            <Label htmlFor="rating">Ratings (4 stars & up)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="budgetFriendly"
              checked={filters.budgetFriendly}
              onCheckedChange={(checked) => handleFilterChange('budgetFriendly', checked as boolean)}
            />
            <Label htmlFor="budgetFriendly">Budget-friendly</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={filters.pincode}
              onChange={(e) => handleFilterChange('pincode', e.target.value)}
              placeholder="Enter pincode"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortBy">Sort By</Label>
            <Select onValueChange={(value) => handleFilterChange('sortBy', value)} value={filters.sortBy}>
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
          <Button onClick={() => onApplyFilters(filters)}>Apply Filters</Button>
        </div>
      </div>
    </div>
  )
})

Filter.displayName = 'Filter'

export default Filter