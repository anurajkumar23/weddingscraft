import CardPage from '@/components/Caterers/page'
import React from 'react'

const page = () => {

  const cards = [
    { color: 'bg-gradient-to-l from-indigo-400 to-purple-700', name: 'Starter' },
    { color: 'bg-gradient-to-r from-amber-500 to-pink-500', name: 'Basic' },
    { color: 'bg-gradient-to-r from-emerald-400 to-cyan-400', name: 'Deluxe' }
];

  return (
    <div className='py-6 mx-8'>
      <div className='md:grid grid-cols-3 gap-4 '>
      {cards.map((card, index) => (
                <CardPage key={index} color={card.color} name={card.name} />
            ))}
        </div>
    </div>
  )
}

export default page
