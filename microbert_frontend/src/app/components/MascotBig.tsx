import Image from 'next/image'
import React from 'react'

const MascotBig = () => {
  return (
    <div className='w-full h-full'>
        <Image
            src='/mascot.jpeg'
            alt='Mascot of Microbert'
            className='p-5 min-h-full align-items-center rounded-full'
            width={300}
            height={300}
        />
    </div>
  )
}

export default MascotBig
