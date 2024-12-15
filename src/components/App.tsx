import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SearchBar from './SearchBar'
import SearchForm from './SearchForm'
import Section from './Section'
import ImageGallery from './ImageGallery'

interface FormData {
  name: string
}

function App() {
  const [searchImage, setSearchImage] = useState('')

  const handleSubmitForm = (formdata: FormData) => {
    setSearchImage(formdata.name)
  }

  return (
    <>
      <SearchBar>
        <SearchForm onSubmit={handleSubmitForm} />
      </SearchBar>
      <ToastContainer autoClose={3000} />
      <Section>
        <ImageGallery searchImage={searchImage} />
      </Section>
    </>
  )
}

export default App
