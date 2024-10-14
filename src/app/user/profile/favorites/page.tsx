'use client'

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import InnerCardPage from "@/components/InnerCard/InnerCardPage"

interface FavoriteItem {
  _id: string
  name: string
  rating: number
  description?: string
  location?: {
    city: string
    pincode: string
    area: string
  }
  price: number | number[]
  capacity?: number
  services?: string[]
  gallery: {
    name: string
    photos: string[]
    _id: string
  }[]
  [key: string]: any
}

interface FavoriteData {
  Banquet: FavoriteItem[]
  Caterer: FavoriteItem[]
  Decorator: FavoriteItem[]
  Photographer: FavoriteItem[]
}

const FavoritesPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [favoriteData, setFavoriteData] = useState<FavoriteData>({
    Banquet: [],
    Caterer: [],
    Decorator: [],
    Photographer: []
  })

  useEffect(() => {
    fetchFavoriteItems()
  }, [])

  const fetchFavoriteItems = async () => {
    const token = localStorage.getItem("jwt_token")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/wishlist`, config)
      const wishlistData = response.data.data.wishlist
      setFavoriteData(wishlistData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching favorite items:", error)
      setError("Failed to fetch favorite items. Please try again later.")
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchFavoriteItems()
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Favorites
        </button>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-3xl sm:text-4xl font-bold">Favorites</CardTitle>
        <CardDescription>Your favorite banquet halls, caterers, decorators, and photographers</CardDescription>
        <button
          onClick={handleRefresh}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Favorites
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        {Object.entries(favoriteData).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold ">{category}s</h2>
            {items.length > 0 ? (
              <InnerCardPage
                data={items}
                link={category.toLowerCase()}
                category={category}
              />
            ) : (
              <p>No Favorite {category}s</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default FavoritesPage