import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirements, setRequirements] = useState("");
  const [requirementsList, setRequirementsLists] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementsLists(course?.instructions)
    }
    register(name, { required: true })
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirements) {
      setRequirementsLists([...requirementsList, requirements])
      setRequirements('')
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementsLists = [...requirementsList];
    updatedRequirementsLists.splice(index, 1)
    setRequirementsLists(updatedRequirementsLists)
  }
  return (
    <div className='flex flex-col space-y-2'>
      <label htmlFor={name} className='text-sm dark:text-dark-richblack-5 text-light-richblack-5'>
        {label} <sup className='dark:text-dark-pink-200 text-light-pink-200'>*</sup>
      </label>
      <div className='flex flex-col items-start space-y-2'>
        <input
          type='text'
          id={name}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className='form-style w-full rounded-[0.5rem] bg-light-richblack-800 dark:bg-dark-richblack-800 p-[12px] text-richblack-5'
          />
        <button
          type='button'
          onClick={handleAddRequirement}
          className='font-semibold cursor-pointer dark:text-dark-yellow-50 text-light-richblack-5 '
        >
          Add
        </button>
      </div>
      {
        requirementsList.length > 0 && (
          <ul className='mt-2 list-inside list-disc'>
            {
              requirementsList.map((requirement, index)=>(
                <li key={index} className='flex items-center dark:text-dark-richblack-5 text-light-richblack-5'>
                  <span>{requirement}</span>
                  <button
                    type='button'
                    className='ml-2 text-xs dark:text-pure-dark-greys-300 text-pure-light-greys-300 cursor-pointer'
                    onClick={()=>{handleRemoveRequirement(index)}}
                  >
                    clear
                  </button>
                </li>
              ))
            }
          </ul>
        )}
        {
          errors[name] && (
            <span className='ml-2 text-xs tracking-wide dark:text-dark-pink-200 text-red-500'>{label} is required</span>
          )
        }
    </div>
  )
}

export default RequirementField