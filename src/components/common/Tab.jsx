import React from 'react'

const Tab = ({tabData, field, setField}) => {
  return (
    <div
        style={{boxShadow:"inset 0px -1px 0px rgba(255,255,255,0.18)"}}
        className='flex dark:bg-dark-richblack-800 bg-light-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'
    >
        {
            tabData.map((tab)=>(
                <button
                    key={tab.id}
                    onClick={()=>setField(tab.type)}
                    className={`${field === tab.type
                        ? "dark:bg-dark-richblack-900 bg-light-richblack-900 dark:text-dark-richblack-5 text-light-richblack-5"
                        : "bg-transparent dark:text-dark-richblack-5 text-light-richblack-5"
                    } py-2 px-5 rounded-full transition-all duration-200 cursor-pointer`}
               >
                {tab?.tabName}
               </button>
            ))}        
    </div>
  )
}

export default Tab