import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault(); // so that on submit it will not reload the webpage
    }
  return (
    <div className='text-center' >
        <p className='text-2xl font-medium text-gray-800' >Subscribe now and get 20% off</p>
        <p className='text-gray-400 mt-3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit magni doloribus sequi corporis? Voluptas mollitia impedit consequuntur nam, itaque voluptatem earum. Voluptatem tempore sit fugit ad doloremque laudantium iure qui.</p>
        <form  onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' action="">
            <input className='w-full sm:flex-1 outline-none ' type="email" placeholder='Enter your Email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10' >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox
