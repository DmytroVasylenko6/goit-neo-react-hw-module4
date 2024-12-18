import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SearchBar from './SearchBar'
import Section from './Section'
import ImageGallery from './ImageGallery'
import pixabayAPI from '../services/pixabayAPI'
import { ThreeDots } from 'react-loader-spinner'
import Container from './Container'
import LoadMoreBtn from './LoadMoreBtn'
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
  const [modalImage, setModalImage] = useState<{
    url: string | null
    alt: string | null
  }>({
    url: null,
    alt: null
  })

  useEffect(() => {
    if (!searchImage) return

    async function fetchImages() {
      try {
        setIsLoading(true)
        const data = await pixabayAPI(searchImage, page)

        if (data.hits.length === 0) {
          toast('No results were found for the given request!')
          return
        }

        setImages((prevImages) =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        )

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        })
      } catch (error) {
        toast((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [searchImage, page])

  const handleSearch = ({ name }: FormData) => {
    setSearchImage(name)
    setPage(1)
    setImages([])
  }

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  const toggleModal = (
    imageUrl: string | null = null,
    imageAlt: string | null = null
  ) => {
    setShowModal((prev) => !prev)
    if (imageUrl && imageAlt) {
      setModalImage({ url: imageUrl, alt: imageAlt })
    }
  }

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    toggleModal(target.dataset.set, target.alt)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Section>
        {images.length > 0 && (
          <ImageGallery images={images} onOpenModal={handleOpenModal} />
        )}
        <Container>
          {isLoading && <ThreeDots color="#ca347f" height={80} width={80} />}
          {images.length > 0 && !isLoading && (
            <LoadMoreBtn onLoadMore={handleLoadMore} />
          )}
        </Container>
      </Section>
      <ToastContainer autoClose={3000} />
      <ImageModal isOpen={showModal} image={modalImage} onClose={toggleModal} />
    </>
  )
}

export default App
