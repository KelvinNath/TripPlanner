import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return ( 
    <div className='flex flex-col items-center mx-56 gap-9 '>
        <h1
        className='font-extrabold text-[50px] text-center mt-16'
        >
        <span className='text-[#f56551] '>Tailored by AI, Inspired by You</span> –  The Future of Travel!
        </h1>
        <p className='text-xl' text-gray-500 text-center> Let AI craft your perfect journey—personalized itineraries</p>

        <Link to={'/create-trip'}> 
        <Button>Get Started ,It's Free</Button>
        </Link>
       
    </div>
  )
}

export default Hero