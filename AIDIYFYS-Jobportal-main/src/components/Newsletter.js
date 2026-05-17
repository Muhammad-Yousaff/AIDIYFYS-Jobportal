import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6"

const Newsletter = () => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-bold mb-2 flex item-center gap-2'>
          <FaEnvelopeOpenText />
          Email me for more Jobs!
        </h3>
        <p className='text-primary/75 text-base mb-4'>Sure, if you're looking for more relevant job opportunities or have any questions,
          feel free to email us at Aidifys.com.
          We're here to help you with your job search journey!</p>
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <input type="email" name="email" id="email" placeholder='name@mail.com' className="w-full px-3 py-2 border focus:outline-none" />
          <input type="submit" value="Subscribe!" className="w-full px-5 py-2 border focus:outline-none bg-sky-500 rounded-sm text-white cursor-pointer font-semibold" />
        </div>
      </div>
      <div className='mt-20'>
        <h3 className='text-lg font-bold mb-2 flex item-center gap-2'>
          <FaRocket />
          Get noticed Faster!
        </h3>
        <p className='text-primary/75 text-base mb-4'>Sure, if you're looking for more relevant job opportunities or have any questions,
          feel free to email us at Aidifys.com.
          We're here to help you with your job search journey!</p>
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <input type="submit" value="Upload your Resume" className="w-full px-5 py-2 border focus:outline-none bg-sky-500 rounded-sm text-white cursor-pointer font-semibold" />
        </div>
      </div>
    </div>
  )
}

export default Newsletter