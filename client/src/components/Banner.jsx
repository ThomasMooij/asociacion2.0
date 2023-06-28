import React from 'react'

const Banner = ({title}) => {
  return (
    <header className='w-full h-12 bg-[#dadacc] flex justify-center items-center rounded-full m-9 max-w-full md:w-[60%]'>
        <p className='text-black font-light text-2xl'>{title}</p>
    </header>
  )
}

export default Banner