import { RPC_URLS, NETWORK_CHAIN_ID } from '../config/constants';

const getRpcUrl = () => RPC_URLS[NETWORK_CHAIN_ID]

export const nodes = [ RPC_URLS[NETWORK_CHAIN_ID] ]

export default getRpcUrl