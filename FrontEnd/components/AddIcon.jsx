import React from 'react'
import addIcon from '../src/assets/addIcon.svg'

export default function AddIcon() {
    
  return (
    <>
    <button type='submit' className="cursor-pointer h-11 px-4 py-3 bg-[#7ed0ec] rounded-md ">
        <img src={addIcon} alt="" className='h-full ' />
    </button>
    </>
  )
}
