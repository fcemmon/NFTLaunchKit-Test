import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectors } from '../utils/web3React';
import { setupNetwork } from '../utils/wallet'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  
  const login = useCallback(
    (connectorID) => {
      const connector = connectors[connectorID]
      if (connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              localStorage.setItem('force', 'false')
              localStorage.setItem('wallet', connectorID)
              activate(connector)
            }
          } else {
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              console.log('No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector
                walletConnector.walletConnectProvider = null
              }
              console.log('Please authorize to access your account')
            } else {
              console.log(error.message)
            }
          }
        })
        localStorage.setItem('force', 'false')
        localStorage.setItem('wallet', connectorID)
      } else {
        console.log('The connector config is wrong')
      }
    },
    [activate, connectors]
  )

  const logout = useCallback(() => {
    localStorage.setItem('force', 'true')
    if (localStorage.getItem('wallet') === 'walletconnect') {
      connectors.walletconnect.close()
      connectors.walletconnect.walletConnectProvider = null
    }
    deactivate()
  }, [deactivate, localStorage, connectors])

  return { login, logout }
}

export default useAuth
