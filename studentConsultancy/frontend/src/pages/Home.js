import React from 'react'
import Header from '../components/Header';

//components
import Stats from '../components/Stats';
import Features from '../components/Features';
import WhyUs from '../components/WhyUs';
import Banner from '../components/Banner';
import PersonCard from '../components/PersonCard';
import Banner2 from '../components/Banner2';
import CategoryList from '../components/CategoryList';


const Home = () => {
  return (
    <div className='mt-24 mb-36 p-6 mx-auto max-w-sm sm:max-w-xl md:max-w-full lg:max-w-screen-xl space-y-8'>
      <Header />
      <PersonCard/>
      {/* <CategoryList/> */}
     
      <Features />
      <Banner2/>
      <WhyUs />
     
      <Banner />
      <Stats />
    </div>
  )
}

export default Home