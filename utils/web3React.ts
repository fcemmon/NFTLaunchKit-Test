import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { MathWalletConnector } from '@harmony-react/mathwallet-connector';
import { BscConnector } from '@binance-chain/bsc-connector';
import { Web3Provider } from '@ethersproject/providers';
import { NETWORK_CHAIN_ID } from '../config/constants';
import getRpcUrl from './getRpcUrl';

const POLLING_INTERVAL = 12000
const RpcUrl = getRpcUrl()

export const injected = new InjectedConnector({ supportedChainIds: [NETWORK_CHAIN_ID] });
export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: RpcUrl },
  qrcode: true,
  network: "binance",
  bridge: "https://bridge.walletconnect.org",
  chainId: NETWORK_CHAIN_ID,
  pollingInterval: POLLING_INTERVAL
});
export const ledger = new LedgerConnector({ chainId: NETWORK_CHAIN_ID, url: RpcUrl, pollingInterval: POLLING_INTERVAL });
export const math = new MathWalletConnector({ chainId: NETWORK_CHAIN_ID });
export const bsc = new BscConnector({ supportedChainIds: [NETWORK_CHAIN_ID] });

export const connectors = {
	injected,
	walletconnect,
	ledger,
	math,
	bsc
};

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
