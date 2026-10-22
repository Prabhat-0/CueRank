import Link from 'next/link'
import React from 'react'

const Button = ({padding="px-7.5 py-3.5",text,textStyle="text-inter font-semibold text-sm leading-0",bg="bg-white/5",border="border" ,blur="backdrop-blur-md",href="#"}) => {
  return (

   
        <Link href={href} className={`${padding} ${textStyle} ${bg} ${border} ${blur} w-fit h-full flex cursor-pointer rounded-full  items-center justify-center transition-all duration-300 ease-in-out hover:scale-95`}>{text}</Link>
  )
}

export default Button