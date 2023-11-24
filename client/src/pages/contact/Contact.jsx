import React from 'react'

const Contact = () => {
  return (
    <>
    <div>
    <div className='container mx-auto p-4 md:p-8'>
        <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 p-4'>
            <iframe  title = "myFrame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1766.7292008841002!2d85.33802528869222!3d27.672223594050667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e5f9cfaed7%3A0xec6e0fae0c6cb7b4!2sKathford%20College%20of%20Engineering%20%26%20Management!5e0!3m2!1sen!2snp!4v1689841214464!5m2!1sen!2snp"
             width="100%" height="450" style={{border:0}} allowfullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='w-full md:w-1/2 p-4'></div>
        </div>
        </div>



        <div className="grid grid-cols-2 gap-4 p-4 border">
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block mb-2 font-semibold" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
        />
      </div>
      <div className="col-span-2">
        <label className="block mb-2 font-semibold" htmlFor="subject">
          Subject
        </label>
        <input
          className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject"
        />
      </div>
      <div className="col-span-2">
        <label className="block mb-2 font-semibold" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
          id="description"
          name="description"
          rows="4"
          placeholder="Write your message here"
        />
      </div>
      <div className="col-span-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>

    </div>
   

       
    
          
        
    

    </>
  )
}

export default Contact