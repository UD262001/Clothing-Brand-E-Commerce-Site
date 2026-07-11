import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t border-zinc-200'>
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full max-w-[450px]' src={assets.about_img} alt="" />
        
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus culpa placeat harum aut, quisquam accusamus neque id rem tempore fugit asperiores libero odit qui vel quis nostrum perspiciatis saepe porro minima! Reiciendis eveniet similique quisquam quaerat hic ipsam, quis quibusdam veritatis modi atque numquam? Quae ut sequi et, sed corporis ipsam voluptates illum iusto sunt, laudantium deserunt fuga. Autem iste iure aliquid dolore. Porro deleniti laborum laudantium, dolor optio maiores magni incidunt id nulla itaque! Officiis repellat dolorem ut alias iusto, cum eligendi sed pariatur quo ab molestias hic perferendis quisquam commodi impedit dicta sapiente nisi tempore deleniti numquam! Officia!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ea eum aliquam rem praesentium quidem nemo! Provident, inventore. Tenetur nihil dolor sit quae quia corrupti exercitationem ex iusto facere perspiciatis voluptas molestias rem, rerum est consequatur vel reprehenderit! Accusamus saepe laborum ipsum alias provident repellat architecto? Excepturi eos nemo ad deserunt nobis vel? Illum adipisci laboriosam eos impedit nihil architecto illo iure odit tempora qui sunt nostrum numquam nam accusamus ratione voluptas, perspiciatis praesentium dolor eum atque repudiandae! Tempora cupiditate illum rem officia atque quibusdam ea necessitatibus fugit, nulla in minima architecto velit nobis, possimus odio consequuntur adipisci alias illo.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum dolor debitis provident quae obcaecati nulla dolore dolorem qui praesentium, minus a enim natus doloribus velit, voluptas ducimus asperiores iure nostrum quos saepe repellat aut accusamus inventore maxime? Voluptatibus culpa, nostrum quos et perspiciatis enim totam esse repellat laudantium qui accusantium?</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-zinc-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assuarance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint temporibus nostrum quos doloribus tempora suscipit itaque quisquam deleniti eligendi asperiores.
          </p>
        </div>

        <div className='border border-zinc-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint temporibus nostrum quos doloribus tempora suscipit itaque quisquam deleniti eligendi asperiores.
          </p>
        </div>

        <div className='border border-zinc-200 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint temporibus nostrum quos doloribus tempora suscipit itaque quisquam deleniti eligendi asperiores.
          </p>
        </div>

      </div>

      <NewsLetterBox/>

    </div>
  )
}

export default About
