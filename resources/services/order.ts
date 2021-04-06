import axios from 'axios'
import {OrderItemFormDataType} from '../models/order'
import {orderRoute} from '.'

export const getOrder = () => axios.get(orderRoute)

export const addOrder = (payload: OrderItemFormDataType) => axios({
    url: orderRoute.concat(`/orderables/${0}`),
    method: 'PUT',
    data: payload,
})
