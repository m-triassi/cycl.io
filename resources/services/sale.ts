import axios from 'axios'
import {SaleItemFormDataType} from '../models/sale'
import {saleRoute} from '.'

export const addSale = (payload: SaleItemFormDataType) => axios({
    url: saleRoute.concat(`/orderables/${0}`),
    method: 'PUT',
    data: payload,
})

export const getSale = () => axios.get(saleRoute)

export const filterSale = (payload: {}) => axios({
    method: 'GET',
    url: saleRoute,
    params: payload
})

export const confirmSale = (payload: number) => axios({
    method: 'PUT',
    url: saleRoute.concat(`/${payload}`),
    data: {'status': 'paid'},
})

export const cancelSale = (payload: number) => axios({
    method: 'PUT',
    url: saleRoute.concat(`/${payload}`),
    data: {'status': 'cancelled'},
})
