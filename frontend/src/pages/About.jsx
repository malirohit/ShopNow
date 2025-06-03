import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div >

      <div className='text-2xl text-center pt-8 border-t' >
         <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'  >
         <img  className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ' >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nemo cupiditate est ad perferendis, quaerat molestias ipsum, temporibus, sequi harum at delectus autem recusandae alias repellat illum optio obcaecati. Enim.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque consequatur neque velit. Fugiat non, molestias dolore vel repellendus et culpa rem quia, illo explicabo quam. Nostrum aliquid vel exercitationem cum!</p>
             <b className='text-gray-800' >Our Mission</b>
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum suscipit facere sunt quo sequi animi, sapiente enim qui vitae libero nulla deleniti excepturi itaque explicabo exercitationem perferendis! Nemo, fugit minus!</p>
         </div>
      </div>

      <div className='text-2xl py-4' >
         <Title  text1={'WHY'} text2={'CHOOSE US'}  />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20' >
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ' >
            <b>Quality Assurance</b>
            <p className='text-gray-600' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur tenetur laudantium id voluptatem quo impedit ipsam debitis ea deserunt tempora voluptate minima vitae officia, aliquid harum sunt porro est quia.</p>
           </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ' >
            <b>Convinenece</b>
            <p className='text-gray-600' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur tenetur laudantium id voluptatem quo impedit ipsam debitis ea deserunt tempora voluptate minima vitae officia, aliquid harum sunt porro est quia.</p>
           </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ' >
            <b>Exceptional Customer Service</b>
            <p className='text-gray-600' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur tenetur laudantium id voluptatem quo impedit ipsam debitis ea deserunt tempora voluptate minima vitae officia, aliquid harum sunt porro est quia.</p>
           </div>

      </div>

       <NewsletterBox />

    </div>
  )
}

export default About
