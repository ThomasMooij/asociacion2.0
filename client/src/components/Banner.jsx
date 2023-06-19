import React from 'react'

const Banner = ({title}) => {
  return (
    <header className='w-screen h-12 bg-[#dadacc] flex justify-center items-center'>
        <p className='text-black font-light text-2xl'>{title}</p>
    </header>
  )
}

export default Banner