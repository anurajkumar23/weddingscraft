import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rate } from "antd";

interface UserDataProps {
    key: string
    user: string
    ratings: number
    post: string
    heading: string
    description: string
}

const UserReview: React.FC<UserDataProps> = ({
    key,
    user,
    ratings,
    post,
    heading,
    description
}) => {
    return (
        <div>
            <hr/>
        <div key={key} className='py-6'>
            <div className='justify-between flex'>
                <div className='flex gap-x-4'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className='flex items-center font-semibold' > {user} </h1>
                </div>
                <h1 className='flex items-center text-gray-600 font-thin'>Sent on {post}</h1>
            </div>
            <Rate disabled allowHalf defaultValue={ratings} className='py-4' />
            <h1 className='text-xl font-medium'>{heading}</h1>
            <h1 className='py-1 font-sans text-gray-600' >{description}</h1>
        </div>
        </div>
    )
}

export default UserReview
