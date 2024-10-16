'use client'

import React, { useState, useEffect } from 'react'
import { Rate } from 'antd'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Star } from 'lucide-react'
import { useAuth } from '@/app/authContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ReviewData {
  id: string
  user: string
  date: string
  heading: string
  ratings: number
  description: string
}

interface BanquetData {
  _id: string
  name: string
  rating: number
  reviews: ReviewData[]
}

interface ReviewRatingProps {
  data: BanquetData
}

export default function Component({ data }: ReviewRatingProps = { data: { _id: '', name: '', rating: 0, reviews: [] } }) {
  const [reviews, setReviews] = useState<ReviewData[]>(data.reviews)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<ReviewData | null>(null)
  const [newRating, setNewRating] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    console.log('Current reviews:', reviews)
  }, [reviews])

  const handleOpenDialog = (rating?: number) => {
    if (rating) setNewRating(rating)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingReview(null)
    setNewRating(0)
  }

  const handleSubmitReview = (newReview: ReviewData) => {
    console.log('Submitting review:', newReview)
    if (editingReview) {
      setReviews(reviews.map(review =>
        review.id === editingReview.id ? { ...newReview, id: review.id } : review
      ))
    } else {
      setReviews([...reviews, { ...newReview, id: Date.now().toString() }])
    }
    // Here you would typically send the new/updated review to your backend
    handleCloseDialog()
  }

  const handleEditReview = (review: ReviewData) => {
    console.log('Editing review:', review)
    setEditingReview(review)
    setNewRating(review.ratings)
    setIsDialogOpen(true)
  }

  const handleDeleteReview = (id: string) => {
    console.log('Deleting review:', id)
    setReviews(reviews.filter(review => review.id !== id))
    // Here you would typically send a delete request to your backend
  }

  return (
    <div id="Reviews" className="container border rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-2xl font-medium mb-6">Reviews & Ratings</h1>
      <div className="flex items-center gap-x-4 mb-6 rounded-lg">
        <div className="flex items-center border p-4 rounded-xl bg-green-600 ">
          <span className="text-white text-xl">{data.rating.toFixed(1)}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{reviews.length} Reviews</h2>
          <Rate disabled allowHalf defaultValue={data.rating} className="text-yellow-400" />
        </div>
      </div>

      <div className="mb-8 bg-gray-50  rounded-lg">
        <h2 className="text-2xl font-normal mb-6">Write a Review</h2>
        <div className="flex flex-col md:flex-row gap-4 ">
          <Rate 
            className="text-4xl cursor-pointer text-yellow-400" 
            onChange={(value) => handleOpenDialog(value)}
          />
          <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-700 text-white">
            Write a Review
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-medium mb-6">User Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="border-t py-6 relative">
          <div className="flex justify-between mb-4">
            <div className="flex gap-x-4 items-center">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.user}`} />
                <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{review.user}</h3>
                <p className="text-sm text-gray-500">Posted on {review.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Rate disabled allowHalf value={review.ratings} className="text-yellow-400" />
              {user && user.name === review.user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 ml-2">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4 rotate-90" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditReview(review)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteReview(review.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">{review.heading}</h3>
          <p className="text-gray-600 mb-4">{review.description}</p>
          
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingReview ? 'Edit Review' : 'Post Your Review'}</DialogTitle>
            <DialogDescription>
              Share your experience with others. Your feedback is valuable to us.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const newReview: ReviewData = {
              id: editingReview?.id || Date.now().toString(),
              user: user?.name || 'Anonymous',
              date: new Date().toLocaleDateString(),
              heading: formData.get('heading') as string,
              ratings: newRating,
              description: formData.get('description') as string
            }
            handleSubmitReview(newReview)
          }}>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="rating" className="w-24">
                  Rating
                </Label>
                <Rate
                  allowHalf
                  value={newRating}
                  onChange={setNewRating}
                  className="text-yellow-400"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="heading" className="w-24">
                  Heading
                </Label>
                <Input
                  id="heading"
                  name="heading"
                  defaultValue={editingReview?.heading}
                  className="flex-1"
                />
              </div>
              <div className="flex items-start gap-4">
                <Label htmlFor="description" className="w-24 mt-2">
                  Review
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingReview?.description}
                  className="flex-1"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                {editingReview ? 'Update' : 'Post'} Review
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}