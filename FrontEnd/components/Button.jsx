import React from 'react'

export default function Button({title, width, action, bgColor, textColor, click}) {
  return (
    <>
        <button type={action} onClick={click} className={`w-${width} rounded-lg py-1 px-4 bg-[${bgColor}] text-[${textColor}] font-semibold cursor-pointer `}>
            {title}
        </button>
    </>
  )
}
