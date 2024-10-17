'use client'

import React, { useState } from 'react'
import { Rate } from 'antd'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'
import { useAuth } from '@/app/authContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import axios from 'axios'

interface ReviewData {
  _id: string;
  content: string;
  username: string;
  userphoto: string;
  rating: number;
  tag: string;
  userId: string;
  createdAt: string;
}

interface ReviewRatingData {
  _id: string;
  name: string;
  rating: number;
  reviews: ReviewData[];
}

interface RatingReviewsProps {
  initialData: ReviewRatingData;
  category: string;
}

export default function ReviewRating({ initialData, category }: RatingReviewsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<ReviewData | null>(null)
  const [newRating, setNewRating] = useState(0)
  const [data, setData] = useState<ReviewRatingData>(initialData)
  const { user } = useAuth()

  const handleOpenDialog = (rating?: number) => {
    if (rating) setNewRating(rating)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingReview(null)
    setNewRating(0)
  }

  const handleSubmitReview = async (newReview: Omit<ReviewData, '_id' | 'userId' | 'createdAt'>) => {
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/userreview/${data._id}`,
        {
          ...newReview,
          category
        },
        config
      )
      // console.log(response.data.data.item.reviews[0], "🎉🎉🎉🎉🎉🎉🎉🎉🎉🐷posted")
      if (response.data.message === 'success') {
        const newReviewData = response.data.data.item.reviews[0]
        setData(prevData => ({
          ...prevData,
          reviews: [newReviewData, ...prevData.reviews],
          rating: calculateAverageRating([newReviewData, ...prevData.reviews])
        }))
      }
    } catch (error) {
      console.error('Error submitting review:', error)
    }
    handleCloseDialog()
  }

  const handleEditReview = (review: ReviewData) => {
    setEditingReview(review)
    setNewRating(review.rating)
    setIsDialogOpen(true)
  }

  const handleDeleteReview = async (_id: string) => {
    const token = localStorage.getItem("jwt_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/userreview/${initialData._id}?category=${category}`, config)
      setData(prevData => {
        const updatedReviews = prevData.reviews.filter(review => review._id !== _id)
        return {
          ...prevData,
          reviews: updatedReviews,
          rating: calculateAverageRating(updatedReviews)
        }
      })
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  const calculateAverageRating = (reviews: ReviewData[]): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  }

  return (
    <div id="Reviews" className="container border rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-2xl font-medium mb-6">Reviews & Ratings</h1>
      <div className="flex items-center gap-x-4 mb-6 rounded-lg">
        <div className="flex items-center border p-4 rounded-xl bg-green-600 ">
          <span className="text-white text-xl">{data.rating.toFixed(1)}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{data.reviews.length} Reviews</h2>
          <Rate disabled allowHalf defaultValue={data.rating} className="text-yellow-400" />
        </div>
      </div>

      {user && (
        <div className="mb-8 bg-gray-50 rounded-lg p-4">
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
      )}

      <h2 className="text-2xl font-medium mb-6">User Reviews</h2>
      {data.reviews.map((review) => (
        <div key={review._id} className="border-t py-6 relative">
          <div className="flex justify-between mb-4">
            <div className="flex gap-x-4 items-center">
              <Avatar>
                <AvatarImage src={review.userphoto || `https://api.dicebear.com/6.x/initials/svg?seed=${review.username}`} />
                <AvatarFallback>{review.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{review.username}</h3>
                <p className="text-sm text-gray-500">Posted on {new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Rate disabled allowHalf value={review.rating} className="text-yellow-400" />
              {user && user._id === review.userId && (
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
                    <DropdownMenuItem onClick={() => handleDeleteReview(review._id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">{review.tag}</h3>
          <p className="text-gray-600 mb-4">{review.content}</p>
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
            const newReview = {
              content: formData.get('content') as string,
              username: user?.name || 'Anonymous',
              userphoto: user?.image || '',
              rating: newRating,
              tag: formData.get('tag') as string,
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
                <Label htmlFor="tag" className="w-24">
                  Tag
                </Label>
                <Input
                  id="tag"
                  name="tag"
                  defaultValue={editingReview?.tag}
                  className="flex-1"
                />
              </div>
              <div className="flex items-start gap-4">
                <Label htmlFor="content" className="w-24 mt-2">
                  Review
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={editingReview?.content}
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