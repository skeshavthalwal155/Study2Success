import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
        <h1 className='text-center text-4xl font-semibold'>Get In Touch</h1>
        <p className='text-center dark:text-dark-richblack-300 text-light-richblack-300 mt-3'>We'd love to here for you, Please fill out this form.</p>
        <div className='mt-12 mx-auto'>
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection