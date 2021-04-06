import {request} from '@utils'
import {OrderItemFormDataType} from '../models/order'
import {orderRoute} from '.'

export const getOrder = () => request({
    method: 'GET',
    url: orderRoute
})

export const addOrder = (payload: OrderItemFormDataType) => request({
    url: orderRoute.concat('/orderables/0'),
    method: 'PUT',
    data: payload,
})
