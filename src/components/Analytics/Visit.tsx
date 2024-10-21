'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useInterval } from 'react-use'
import { useAuth } from '@/app/authContext'

interface VisitData {
  _id: string
  categoryId: string
  years: {
    year: string
    monthlyVisits: {
      month: string
      visits: number
      _id: string
    }[]
    _id: string
  }[]
}

export async function VisitCounter(category: string, categoryId: string) {
  const [visitData, setVisitData] = useState<VisitData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastVisitTime, setLastVisitTime] = useState<number>(0)
  const [allowedOptions, setAllowedOptions] = useState<string[]>([])

  const { user } = useAuth()

  useEffect(() => {
    if (user?.sellerRequest === 'accepted' && user?.draft?.governmentInfo?.allowed) {
      setAllowedOptions(user.draft.governmentInfo.allowed)
    }
  }, [user])
  console.log(allowedOptions)

  const fetchVisitData = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/visit/${category}/${categoryId}`)
      setVisitData(response.data.data)
      return { visitData: response.data.data, error: null }
    } catch (err) {
      const errorMsg = 'Failed to fetch visit data'
      console.error(errorMsg, err)
      setError(errorMsg)
      return { visitData: null, error: errorMsg }
    }
  }, [category, categoryId])

  const updateVisitCount = useCallback(async () => {
    const currentTime = Date.now()
    if (currentTime - lastVisitTime >= 30000) { // 30 seconds
      try {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/visit/${category}/${categoryId}`)
        setLastVisitTime(currentTime)
        fetchVisitData()
      } catch (err) {
        const errorMsg = 'Failed to update visit count'
        console.error(errorMsg, err)
        setError(errorMsg)
      }
    }
  }, [category, categoryId, lastVisitTime, fetchVisitData])

  useEffect(() => {
    fetchVisitData()
  }, [fetchVisitData])

  useInterval(() => {
    updateVisitCount()
  }, 30000)

  return { visitData, error }
}
