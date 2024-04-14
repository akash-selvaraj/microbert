import Image from 'next/image'
import React from 'react'

const Mascot = () => {
  return (
    <div>
        <Image
            src = '/mascot.jpeg'
            width = '300'
            height = '300'
            alt = 'Mascot of Microbert'
            className='rounded-lg'
        />
    </div>
  )
}

export default Mascot
