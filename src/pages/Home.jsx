import React from 'react'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import Bottombar from '../components/Bottombar'
import HandyRideFAQ from './Faq'

const Home = () => {
  return (
    <div>
        <Bottombar/>
        {/* <Hero /> */}
        <Explore />
        <HandyRideFAQ />
    </div>
  )
}   

export default Home