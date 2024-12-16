import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SearchBar from './SearchBar'
import Section from './Section'
import ImageGallery from './ImageGallery'

interface FormData {
  name: string
}

function App() {
  const [searchImage, setSearchImage] = useState('')

  const handleSearch = (formdata: FormData) => {
    setSearchImage(formdata.name)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Section>
        <ImageGallery searchImage={searchImage} />
      </Section>
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default App
