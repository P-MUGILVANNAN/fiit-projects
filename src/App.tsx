import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Consultations from "./pages/Consultations"
import Workshops from "./pages/Workshops"
import Hardware from "./pages/Hardware"
import Contact from "./pages/Contact"
import FloatingButtons from "./components/FloatingButtons"
import ScrollToTop from './components/ScrollToTop'
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/hardware" element={<Hardware />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <FloatingButtons />
        <Footer />
      </div>
    </Router>
  )
}

export default App
