import { post, get } from './axios'

export const getInfo = (data = {}) => get(`/ipfs/${data.arg}`)
// export const getContract = (data = {}) => get('/v1/get_contract', data)
// export const checkContractInfo = (data = {}) => get('/v1/check_contract_info', data)
// export const hello = (data = {}) => get('/v1/hello', data)
