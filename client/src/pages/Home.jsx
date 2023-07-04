import React, { useEffect, useState } from 'react'
import EventIndex from '../components/AgendaComponents/EventIndex'
import ClassIndex from '../components/ClassComponents/ClassIndex'
import Landing from '../components/Landing'
import NavBar from '../components/NavBar'
import Photos from '../components/PhotoComponents/Photos'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer'

const Home = () => {
  const [selectedPage, setSelectedPage] = useState('inicio')
  const [topPage , setTopPage] = useState(true)
  
  useEffect(()=> {
    
    const handleScroll = () => {
      if (window.scrollY === 0){
        setTopPage(true);
        setSelectedPage('inicio')
      }else{
        setSelectedPage('')
        setTopPage(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[])


  return (
    <> 
        <NavBar 
            topPage = {topPage}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
        />
        <Landing name={'welcome'}/>
        <ClassIndex />
        <EventIndex />
        <Photos />
        <Contact />
        <Footer />
    </>
  )
}

export default Home