import ReactModal from 'react-modal'
import ImageCard from '../ImageCard'

interface ModalImage {
  url: string | null
  alt: string | null
}

interface ImageModalProps {
  image: ModalImage
  isOpen: boolean
  onClose: () => void
}

function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  const customStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      position: 'absolute',
      padding: 0,
      border: 'none',
      background: 'none',
      maxWidth: 'calc(100vw - 48px)',
      maxHeight: 'calc(100vh - 24px)',
      overflow: 'hidden',
      inset: 'auto'
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <ImageCard src={image.url || ''} alt={image.alt || ''} size="original" />
    </ReactModal>
  )
}

export default ImageModal
