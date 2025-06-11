import { useState } from 'react'
import UrlShortenerForm from './components/UrlShortenerForm'
import Result from './components/Result'
import type { ShortenedUrlData } from './types'
import './App.css'

function App() {
  const [isFormView, setIsFormView] = useState(true)
  const [shortenedUrlData, setShortenedUrlData] = useState<ShortenedUrlData | undefined>()

  return (
    <>
      {
        isFormView
          ? <UrlShortenerForm setIsFormView={setIsFormView} setShortenedUrlData={setShortenedUrlData} />
          : <Result shortenedUrlData={shortenedUrlData} />
      }
    </>
  )
}

export default App
