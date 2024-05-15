import Link from 'next/link';
import React from 'react'


interface DecoratorsProps{
  id: string;
  title: String;
  description: String;

}


const Decorators:React.FC<DecoratorsProps> = ({title, description , id}) => {




  return (
    <>
    <Link href={`/Decorators/${id}`}>
    <div className='cursor-pointer border rounded-sm shadow-sm mx-2'>
     <div className='p-3'>
        <h1 className='font-semibold'>{title}</h1>
      <p className='text-sm'>{description}</p>
    </div>
    </div>
    </Link>
    </>
  )
}

export default Decorators
