// Set of helper functions to facilitate wallet setup
import { NETWORK_CHAIN_ID, BASE_BSC_SCAN_URL } from '../config/constants';
import { nodes } from './getRpcUrl';
/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    let chainName = 'Invalid Net'
    if (NETWORK_CHAIN_ID === 56) {
      chainName = 'Binance Smart Chain Mainnet'
    } else if (NETWORK_CHAIN_ID === 97) {
      chainName = 'Binance Smart Chain Testnet'
    } else {
      chainName = 'Invalid Net'
    }
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${NETWORK_CHAIN_ID.toString(16)}`,
            chainName: chainName,
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18,
            },
            rpcUrls: [ nodes ],
            blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}