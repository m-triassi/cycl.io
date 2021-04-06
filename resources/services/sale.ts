import axios from 'axios'
import {SaleItemFormDataType} from '../models/sale'
import {saleRoute} from '.'

export const addSale = (payload: SaleItemFormDataType) => axios({
    url: saleRoute.concat(`/orderables/${0}`),
    method: 'PUT',
    data: payload,
})

export const getSale = () => axios.get(saleRoute)
