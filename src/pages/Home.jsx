import React from 'react'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import Bottombar from '../components/Bottombar'

const Home = () => {
  return (
    <div>
        <Bottombar/>
        {/* <Hero /> */}
        <Explore />
    </div>
  )
}   

export default Home