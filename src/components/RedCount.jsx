import React from 'react'

export default function RedCount({count}) {
  return (
    <div className='rounded-[50%] w-3 h-3 text-white bg-red-500 absolute top-[-4px] right-[-12px] flex justify-center items-center' style={{fontSize: '8px'}}>
       {count}
    </div>
  )
}
