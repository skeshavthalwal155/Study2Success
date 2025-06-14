import React from 'react'
import { RiSignalWifiErrorLine } from "react-icons/ri";
const NoInternet = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-red-400 w-[100vw] h-[100vh] overflow-y-hidden">
      <div className="bg-white rounded-full p-6 shadow-lg mb-6">
        <RiSignalWifiErrorLine className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-red-700 mb-2">No Internet Connection</h1>
      <p className="text-lg text-red-900 mb-6 text-center max-w-md">
        Oops! It looks like you're offline. Please check your internet connection and try again.
      </p>
      <button
        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow cursor-pointer hover:bg-red-700 transition"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>
  )
}

export default NoInternet