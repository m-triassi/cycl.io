import axios from 'axios'
import {SaleItemFormDataType} from '../models/sale'
import {saleRoute} from '.'

export const addSale = (payload: SaleItemFormDataType) => axios({
    url: saleRoute.concat(`/orderables/${0}`),
    method: 'PUT',
    data: payload,
})

export const getSale = () => axios.get(saleRoute)

export const filterSale = (payload: string) => axios({
    method: 'GET',
    url: saleRoute,
    params: {
        q: payload
    }
})

export const deleteSale = (payload: number) => axios({
    method: 'DELETE',
    url: saleRoute.concat(`/${payload}`),
})