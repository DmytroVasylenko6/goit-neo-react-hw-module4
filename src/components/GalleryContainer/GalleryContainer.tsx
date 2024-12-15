import s from './GalleryContainer.module.css'
import ImageCard from '../ImageCard'

interface Image {
  id: number
  webformatURL: string
  tags: string
  largeImageURL: string
}

interface GalleryContainerProps {
  images: Image[]
  listener: (event: React.MouseEvent<HTMLLIElement>) => void
}

function GalleryContainer({ images, listener }: GalleryContainerProps) {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image) => {
        return (
          <li key={image.id} className={s.item} onClick={listener}>
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

export default GalleryContainer
