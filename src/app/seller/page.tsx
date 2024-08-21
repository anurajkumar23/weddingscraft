"use client"
import SellerForm from '@/components/seller/SellerForm'
import { useEffect, useState } from 'react'
import { currentUser } from '@/utils/user/getcurrentuser'
import { useAuth } from '../authContext'


const Page = () => {
  const{user}=useAuth()
 
  return (

    <div className='w-full h-full'>
    {user && user.sellerRequest!=="none" && user.sellerRequest!=="accepted" ? ( <div>
      your seller account is on Pending state. It will take 24 hrs to verify.
    </div>):(<div >
        <SellerForm/>
        </div> ) }
     
    </div>
  )
}

export default Page
