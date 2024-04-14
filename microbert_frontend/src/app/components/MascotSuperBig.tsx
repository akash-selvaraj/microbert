import Image from 'next/image'
import React from 'react'

const MascotSuperBig = () => {
  return (
    <div>
        <Image
            src = '/mascot.jpeg'
            alt = 'Mascot of Microbert'
            className='rounded-lg'
            width='800'
            height='1000'
        />
    </div>
  )
}

export default MascotSuperBig
