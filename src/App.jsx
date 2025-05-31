// App.js
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Bottombar from './components/Bottombar'
import Home from './pages/Home'
import LogisticsPage from './pages/LogisticsPage'
import ErrandsPage from './pages/ErrandsPage'
import FeedbackPage from './pages/FeedbackPage'

// ScrollToTop component inside App.js
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<Home />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/errands" element={<ErrandsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
        <Footer />
        <Bottombar />
      </div>
    </Router>
  )
}

export default App