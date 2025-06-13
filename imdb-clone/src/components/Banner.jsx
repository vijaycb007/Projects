import React from 'react'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[87.5vh] bg-center bg-cover flex items-center' style={{backgroundImage: 'url(https://static0.gamerantimages.com/wordpress/wp-content/uploads/wm/2025/03/avengers-doomsday-release-date-delayed-rumored-cast-not-figured-out.jpg)'}}>
      <div className='absolute bottom-0 text-white text-2xl text-center w-full bg-blue-500/50 p-4'>Avengers : Doomsday</div>
    </div>
  )
}

export default Banner
