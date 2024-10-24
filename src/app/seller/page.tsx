'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import SellerForm from '@/components/seller/SellerForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useAuth } from '../authContext'
import Loading from '../loading'


export default function SellerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
       <Loading/>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to access the seller dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push('/auth/login')}>Log In</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl h-full max-h-[800px] flex flex-col">
        <CardHeader className="text-center">
          <CardTitle>Seller Dashboard</CardTitle>
          <CardDescription>Manage your seller account and listings</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {user.sellerRequest === "none" && (
            <SellerForm />
          )}
          {user.sellerRequest === "pending" && (
            <div className="flex flex-col items-center space-y-4 text-center">
              <Clock className="h-16 w-16 text-yellow-500" />
              <h2 className="text-xl font-semibold">Verification Pending</h2>
              <p>Your seller account is currently under review. This process typically takes up to 24 hours.</p>
            </div>
          )}
          {user.sellerRequest === "accepted" && (
            <div className="flex flex-col items-center space-y-4 text-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h2 className="text-xl font-semibold">Verification Successful</h2>
              <p>Congratulations! Your seller account has been verified.</p>
              <div className="space-x-4">
                <Button onClick={() => router.push('/seller/post')}>Create a Listing</Button>
                <Button variant="outline" onClick={() => router.push('/user/profile/dashboard')}>View Dashboard</Button>
              </div>
            </div>
          )}
          {user.sellerRequest === "rejected" && (
            <div className="flex flex-col items-center space-y-4 text-center">
              <AlertCircle className="h-16 w-16 text-red-500" />
              <h2 className="text-xl font-semibold">Verification Failed</h2>
              <p>Unfortunately, your seller account verification was not successful. Please contact support for more information.</p>
              <Button variant="outline" onClick={() => router.push('/support')}>Contact Support</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}