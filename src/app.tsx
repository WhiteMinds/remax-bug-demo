import React, { createContext, useState } from 'react'
import $$TEA from '@/external/rangers'
console.log($$TEA)
// $$TEA.init({
//   app_id: 179712,
//   auto_report: true,
// })
// $$TEA.send()

interface AppContext {
  bindStatus: boolean,
}

const defaultAppContext = new Proxy({}, {
  get () {
    throw new Error('This object should never be called')
  }
}) as AppContext

export const AppContext = createContext<AppContext>(defaultAppContext)

const AppContextProvider = (props: {
  children?: React.ReactNode
}) => {
  const context = useAppContextValue()

  return (
    <AppContext.Provider value={context}>
      {props.children}
    </AppContext.Provider>
  )
}

export default class App extends React.Component {
  render () {
    return (
      <AppContextProvider>
        {this.props.children}
      </AppContextProvider>
    )
  }
}

function useAppContextValue () {
  const [bindStatus] = useState(false)

  return {
    bindStatus,
  }
}
