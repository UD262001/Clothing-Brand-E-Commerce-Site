import React from 'react'

const Loader = () => {
  return (
      <div className='flex justify-center items-center mt-25'>
          <p className='h-8 aspect-square border-4 border-t-gray-400 border-gray-700 rounded-full animate-spin'></p>
      </div>
  )
}

export default Loader
