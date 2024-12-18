import React from 'react'
import ImageCard from '../ImageCard'
import s from './ImageGallery.module.css'

interface Image {
  id: number
  webformatURL: string
  largeImageURL: string
  tags: string
}

interface ImageGalleryProps {
  images: Image[]
  onOpenModal: (e: React.MouseEvent<HTMLElement>) => void
}

function ImageGallery({ images, onOpenModal }: ImageGalleryProps) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    if (target.tagName === 'IMG') {
      onOpenModal(e)
    }
  }
  return (
    <ul className={s.ImageGallery} onClick={handleClick}>
      {images.map((image) => {
        return (
          <li key={image.id} className={s.item}>
            <ImageCard
              src={image.webformatURL}
              alt={image.tags}
              dataset={image.largeImageURL}
              size="preview"
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ImageGallery
