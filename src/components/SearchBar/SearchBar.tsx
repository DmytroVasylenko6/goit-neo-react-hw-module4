import s from './SearchBar.module.css'
import { useState, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from '../Input'
import Button from '../Button'

interface SearchbarProps {
  onSearch: (data: { name: string }) => void
}

function Searchbar({ onSearch }: SearchbarProps) {
  const [name, setName] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setName(value)
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim() === '') {
      toast('Please enter something')
      return
    }
    onSearch({ name })
    reset()
  }

  const reset = () => {
    setName('')
  }
  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSearch} className={s.SearchForm}>
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
    </header>
  )
}

export default Searchbar
