import { useState, useCallback, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SearchBar from './SearchBar'
import Section from './Section'
import ImageGallery from './ImageGallery'
import pixabayAPI from '../services/pixabayAPI'
import { ThreeDots } from 'react-loader-spinner'
import Container from './Container'
import LoadMoreBtn from './LoadMoreBtn'
import ImageCard from './ImageCard'
import ImageModal from './ImageModal'

interface FormData {
  name: string
}

interface ImageItem {
  id: number
  webformatURL: string
  largeImageURL: string
  tags: string
}

function App() {
  const [searchImage, setSearchImage] = useState('')
  const [images, setImages] = useState<ImageItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [alt, setAlt] = useState<string | null>(null)

  const fetchImages = useCallback(
    async (searchValue: string, pageNumber: number) => {
      try {
        const data = await pixabayAPI(searchValue, pageNumber)

        if (data.hits.length === 0) {
          toast('No results were found for the given request!')
        }

        setImages((prevImages) => [...prevImages, ...data.hits])
        setIsLoading(false)
        setPage((prevPage) => prevPage + 1)
        scroll()
      } catch (error) {
        setIsLoading(false)
        toast((error as Error).message)
      }
    },
    []
  )

  useEffect(() => {
    if (!searchImage) return

    setIsLoading(true)
    setPage(1)
    setImages([])
    fetchImages(searchImage, 1)
  }, [searchImage, fetchImages])

  const handleSearch = (formdata: FormData) => {
    setSearchImage(formdata.name)
  }

  const updateImageGallery = () => {
    setIsLoading(true)
    fetchImages(searchImage, page)
  }

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    setShowModal(!showModal)
    setOriginalImage(target.dataset.set || null)
    setAlt(target.alt)
  }

  const closeModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Section>
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={openModal} />
        )}
        <Container>
          {isLoading && <ThreeDots color="#ca347f" height={80} width={80} />}
          {images.length > 0 && !isLoading && (
            <LoadMoreBtn onLoadMore={updateImageGallery} />
          )}
        </Container>
      </Section>
      <ToastContainer autoClose={3000} />
      {showModal && (
        <ImageModal onClose={closeModal}>
          <ImageCard
            src={originalImage || ''}
            alt={alt || ''}
            size="original"
          />
        </ImageModal>
      )}
    </>
  )
}

export default App
