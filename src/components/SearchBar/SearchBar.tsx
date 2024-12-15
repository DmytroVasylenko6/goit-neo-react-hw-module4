import s from './SearchBar.module.css'
import { ReactNode } from 'react'

interface SearchbarProps {
  children: ReactNode
}

function Searchbar({ children }: SearchbarProps) {
  return <header className={s.Searchbar}>{children}</header>
}

export default Searchbar
