import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import s from './ImageModal.module.css'

const modalRoot = document.querySelector('#modal-root')

interface ImageModalProps {
  children: React.ReactNode
  onClose: () => void
}

function ImageModal({ children, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  }

  if (!modalRoot) return null

  return createPortal(
    <div className={s.Overlay} onClick={handleBackDropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot
  )
}

export default ImageModal
