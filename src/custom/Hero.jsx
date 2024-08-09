import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[40px] text-center mt-16'>

        <span className='text-[#4845d2]'>Transform Your Travel Experience</span><br></br>
        with AI-powered trip planning that takes care of every detail.</h1>
      <p className='text-xl text-gray-500 text-center'>
      Discover personalized itineraries and seamless adventures, tailored just for you.
      </p>
      <Link to={'/create-trip'}>
        <Button> Get Start </Button>

      </Link>

    </div>
  )
}

export default Hero
