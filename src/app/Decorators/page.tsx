import React from 'react'
import Decorators from './Decorators'
import getDecorator from '@/utils/decorator/getDecorator';


export const metadata = {
    title: "Wedding Decorators",
    description:
      "Transform your wedding venue with the best decorators. At Dream Wedding, connect with top-rated wedding decorators who can bring your vision to life. Whether you desire a traditional, modern, or unique theme, find the perfect decorator to make your special day beautiful and unforgettable.",
    alternates: {
      canonical: `/Decorators`
    },
  };
  


const page = async () => {

 const decoratorsData = await getDecorator()





    // const decoratorsData = [
    //     { id: "1", name: "Stage Decorators", desc: "lorem ipsum dolor sit amet" },
    //     { id: "2", name: "Mehndi ceremoney", desc: "lorem ipsum dolor sit amet" },
    //     { id: "3", name: "extra", desc: "lorem ipsum dolor sit amet" }
    // ]

    return (
        <div className='mx-2'>
            <div className='grid md:grid-cols-12 bg-slate-500 h-40 '>
                <div className='border rounded-r-[90px] bg-white md:col-span-8'>
                    <div className='pt-4 mx-2'>
                        <h1 className='text-3xl font-bold '>Book the things according to your needs</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-6 py-6 '>
                {decoratorsData.map((items:any) => (
                    <Decorators
                        key={items.id}
                        id={items.id}
                        title={items.name}
                        description={items.description}
                    />
                ))}

            </div>
        </div>
    )
}

export default page
