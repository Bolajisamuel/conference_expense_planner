import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import ConferenceEvent from './components/ConferenceEvent'

function App() {
  const [showProducts, setShowProducts] = useState(false)

  return showProducts ? (
    <ConferenceEvent />
  ) : (
    <LandingPage onGetStarted={() => setShowProducts(true)} />
  )
}

export default App