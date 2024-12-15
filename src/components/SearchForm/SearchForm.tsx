import { useState, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../Input'
import Button from '../Button'
import s from './SearchForm.module.css'

interface SearchFormProps {
  onSubmit: (data: { name: string }) => void
}

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [name, setName] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setName(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim() === '') {
      toast('Please enter something')
      return
    }
    onSubmit({ name })
    reset()
  }

  const reset = () => {
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className={s.SearchForm}>
      <Button type="submit" styles="search" />
      <Input
        name="search"
        type="text"
        placeholder="Search images and photos"
        value={name}
        id="search-input"
        autocomplete="off"
        autofocus
        onChange={handleInputChange}
      />
    </form>
  )
}

export default SearchForm
