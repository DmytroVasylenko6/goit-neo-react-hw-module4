import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GalleryContainer from '../GalleryContainer'
import ImageCard from '../ImageCard'
import Container from '../Container'
import Button from '../Button'
import pixabayAPI from '../../services/pixabayAPI'
import Modal from '../Modal'

interface ImageGalleryProps {
  searchImage: string
}

interface ImageItem {
  id: number
  webformatURL: string
  largeImageURL: string
  tags: string
}

function ImageGallery({ searchImage }: ImageGalleryProps) {
  const [images, setImages] = useState<ImageItem[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState('idle')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [alt, setAlt] = useState<string | null>(null)

  const fetchImages = useCallback((searchValue: string, pageNumber: number) => {
    pixabayAPI(searchValue, pageNumber)
      .then((imagess) => {
        if (imagess.hits.length === 0) {
          toast('No results were found for the given request!')
        }

        setImages((prevImages) => [...prevImages, ...imagess.hits])
        setStatus('resolved')
        setPage((prevPage) => prevPage + 1)
        scroll()
      })
      .catch((error) => {
        setError(error)
        setStatus('rejected')
      })
  }, [])

  useEffect(() => {
    if (!searchImage) return

    setStatus('pending')
    setPage(1)
    setImages([])
    fetchImages(searchImage, 1)
  }, [searchImage, fetchImages])

  const updateImageGallery = () => {
    setStatus('pending')
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
      {images.length > 0 && (
        <GalleryContainer images={images} listener={openModal} />
      )}
      {status === 'pending' && (
        <Container>
          <ThreeDots color="#ca347f" height={80} width={80} />
        </Container>
      )}

      {images.length > 0 && status !== 'pending' && (
        <Container>
          <Button
            type="button"
            text="load more"
            styles="loadMore"
            listener={updateImageGallery}
          />
        </Container>
      )}

      {status === 'rejected' && error && toast(error.message)}

      {showModal && (
        <Modal onClose={closeModal}>
          <ImageCard
            src={originalImage || ''}
            alt={alt || ''}
            size="original"
          />
        </Modal>
      )}
    </>
  )
}

ImageGallery.propTypes = {
  searchImage: PropTypes.string
}

export default ImageGallery
