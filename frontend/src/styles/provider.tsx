import { FC, PropsWithChildren } from 'react'
import 'reseter.css/css/minireseter.css'
import { globalStyles } from './global'

export const StitchesProvider: FC<PropsWithChildren> = ({ children }) => {
  globalStyles()
  // currently, there is nothing provided, but in future this will likely to change
  return (<>{children}</>)
}
