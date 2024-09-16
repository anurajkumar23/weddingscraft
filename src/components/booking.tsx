'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDatePicker } from "@/components/calender-date-picker"
import { Clock } from "lucide-react"

export default function DecoratorBooking() {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date()
  })
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ]

  const handleDateSelect = (range: { from: Date; to: Date }) => {
    setDate(range)
  }

  const handleBooking = () => {
    console.log("Booking details:", { date, timeSlot, name, phone })
  
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Book Your Appointment</h2>
      
      <div className="space-y-2">
        <Label htmlFor="date">Select Date Range</Label>
        <CalendarDatePicker
          id="decorator-calendar"
          date={{ from: date.from, to: date.to }}
          onDateSelect={handleDateSelect}
          numberOfMonths={2}
          closeOnSelect={false}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Select Time</Label>
        <Select onValueChange={setTimeSlot}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Your Phone Number</Label>
        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="123-456-7890" />
      </div>

      <Button 
        onClick={handleBooking} 
        className="w-full bg-green-600"
        disabled={!date || !timeSlot || !name || !phone}
      >
        <Clock className="mr-2" />
        Confirm Booking
      </Button>

      {date.from && date.to && (
        <p className="text-sm text-muted-foreground text-center">
          Your appointment is scheduled for {date.from.toDateString()} to {date.to.toDateString()} at {timeSlot}
        </p>
      )}
    </div>
  )
}