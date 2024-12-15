import s from './Container.module.css'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

function Container({ children }: ContainerProps) {
  return <div className={s.container}>{children}</div>
}

export default Container
