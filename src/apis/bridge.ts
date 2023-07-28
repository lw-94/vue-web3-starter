import api, { type CResponse } from '@/utils/request'

export const getAllNets = (): Promise<CResponse<NetInfo[]>> =>
  api.get(`/api/v1/network/avail-from-nets`)

export const getToNets = (params: {
  from_chain_id: string
  from_symbol: string
}): Promise<CResponse<NetInfo[]>> => api.get('/api/v1/network/avail-to-nets', params)
export interface NetInfo {
  chain_id: string
  created_at: string
  currency_decimals: number
  currency_name: string
  currency_symbol: string
  explorer_url: string
  id: number
  bridge_fee_address: string
  bridge_contract_addr: string
  img_url: string
  name: string
  rpc_url: string
  seconds_per_block: number
  status: number
  updated_at: string
}
//
export const getTokens = (params: { from_chain_id: string }): Promise<CResponse<TokenInfo[]>> =>
  api.get('/api/v1/network/avail-from-currencies', params)

export interface TokenInfo {
  contract_addr: string
  decimals: number
  name: string
  symbol: string
  img_url: string
}

//
export const getLineInfo = (): Promise<CResponse<LineInfo[]>> =>
  api.get('/api/v1/bridge/list_lines')

export interface LineInfo {
  base_fee: number
  fee_discount: number
  fee_rate: number
  from_chain_id: string
  status: number
  symbol: string
  to_chain_id: string
  max_bridge_amount: number
  min_bridge_amount: number
  original_base_fee: number
}

export const getCoinsAddress = (): Promise<CResponse<CoinInfo[]>> =>
  api.get('/api/v1/currency/list-currencies')

export interface CoinInfo {
  chain_id: string
  contract_addr: string
  decimals: number
  id: number
  img_url: string
  name: string
  symbol: string
  type_: number
  display_symbol?: string
}

//

export const getBrc20Balance = (params: { address: string; symbol: string }) =>
  api.get('/api/v1/brc20/full_balance', params)

export const getRelativePrice = (params: { base_symbol: string; symbols: string }) =>
  api.get('/api/v1/market/price', params)

export const createOrder = (params: {
  from_address: string
  from_chain_id: string
  signature: string
  symbol: string
  to_address: string
  to_chain_id: string
  amount: string
}): Promise<CResponse<number>> => api.post('/api/v1/bridge/create_order', params)

export const getRecordInfo = (params: {
  id: number
  address: string
}): Promise<CResponse<RecordInfo>> => api.get('/api/v1/bridge/get_record', params)
export const getRecordList = (params: { address: string }): Promise<CResponse<RecordInfo[]>> =>
  api.get('/api/v1/bridge/list_records', params)
export const getRecordListNotEnd = (params: {
  address: string
}): Promise<CResponse<RecordInfo[]>> => api.get('/api/v1/bridge/list_ing_records', params)

export interface RecordInfo {
  amount: number
  created_at: string
  fee_amount: number
  fee_tx_id: string
  from_address: string
  from_chain_id: string
  from_tx_confir: number
  from_tx_id: string
  id: number
  mark: string
  need_amount: number
  need_network_fee_amount: number
  need_service_fee_amount: number
  need_total_fee: number
  status: number
  symbol: string
  to_address: string
  to_chain_id: string
  to_tx_confir: number
  to_tx_id: string
  updated_at: string
}

export const checkPayReady = (params: { address: string; id: number }) =>
  api.post('/api/v1/bridge/from_tx_pay_already', params)

export const commitFeeTx = (params: { address: string; id: number; tx_id: string }) =>
  api.post('/api/v1/bridge/commit_fee_txid', params)
