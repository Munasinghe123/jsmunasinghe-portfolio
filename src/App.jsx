
import StarBackground from "./components/StartBackGround"
import CursorSnailTrail from "./components/CursorTrial"
import Header from "./components/Header"
import Footer from "./components/Footer"


import Hero from "./sections/Hero"
import About from "./sections/About"
import TechStack from "./sections/TechStack"
import Projects from "./sections/Projects"
import Contact from "./sections/Contact"



export default function  App(){

  return (
    <>
    <StarBackground/>
    <CursorSnailTrail/>
      <Header/>
      <Hero/>
      <About/>
      <TechStack/>
      <Projects/>
      <Contact/>
      <Footer/>
    </>
  )
}