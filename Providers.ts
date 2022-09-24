import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'

const Providers: React.FC = ({ children }) => {
  const Web3ReactProviderDefault = dynamic(
    () => import('./components/defaultprovider'),
    { ssr: false }
  )
  return (
  	<Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactProviderDefault getLibrary={getLibrary}>
	     {children}
      </Web3ReactProviderDefault>
    </Web3ReactProvider>
  )
}

export default Providers
