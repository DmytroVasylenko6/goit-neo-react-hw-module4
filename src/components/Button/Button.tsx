import s from './Button.module.css'
import classNames from 'classnames'

interface ButtonProps {
  text?: string
  listener?: () => void
  type: 'button' | 'submit' | 'reset'
  styles: 'search' | 'loadMore'
}

export default function Button({ text, listener, type, styles }: ButtonProps) {
  const style = [styles === 'search' ? s.buttonSearch : s.buttonLoadMore]

  return (
    <button
      className={classNames(style.join(' '))}
      type={type}
      onClick={listener}
    >
      {text}
    </button>
  )
}
