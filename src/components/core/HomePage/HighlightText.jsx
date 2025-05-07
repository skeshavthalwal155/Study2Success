import React from 'react'

const HighlightText = ({ text }) => {
    return (
        <span className="font-bold text-[#227bf3] dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)]">
            {" "}
            {text}
        </span>
    )
}

export default HighlightText