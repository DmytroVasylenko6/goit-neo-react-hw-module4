import s from './Input.module.css'

interface InputProps {
  name: string
  value: string
  id: string
  placeholder: string
  type: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  pattern?: string
  autocomplete?: string
  autofocus?: boolean
}

function Input({
  name,
  value,
  id,
  placeholder,
  type,
  onChange,
  pattern,
  autocomplete,
  autofocus
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      className={s.input}
      pattern={pattern}
      autoComplete={autocomplete}
      autoFocus={autofocus}
    />
  )
}

export default Input
