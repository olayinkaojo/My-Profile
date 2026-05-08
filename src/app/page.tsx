import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Testimonials from "@/components/Testimonials"
import Stack from "@/components/Stack"
import Projects from "@/components/Projects"
import Security from "@/components/Security"
import Writing from "@/components/Writing"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Testimonials />
      <Stack />
      <Projects />
      <Security />
      <Writing />
      <Contact />
      <Footer />
    </main>
  )
}
