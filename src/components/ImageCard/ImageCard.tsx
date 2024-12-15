import s from './ImageGalleryItem.module.css'
import classNames from 'classnames'

interface ImageCardProps {
  src: string
  dataset?: string
  alt: string
  size: 'original' | 'preview'
}

function ImageCard({ src, dataset, alt, size }: ImageCardProps) {
  const originalImg = s.original
  const previewImg = s.preview

  const style = [s.image]

  if (size === 'original') {
    style.push(originalImg)
  }

  if (size === 'preview') {
    style.push(previewImg)
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        data-set={dataset}
        className={classNames(style.join(' '))}
      />
    </>
  )
}

export default ImageCard
