import axios from 'axios'
import {OrderItemStateType} from '../models/order'
import {orderRoute} from '.'

export const addOrder = (payload: OrderItemStateType) => axios({
    url: orderRoute,
    method: 'POST',
    data: payload,
})

export const getOrder = () => axios.get(orderRoute)

export const filterInventory = (payload: string) => axios({
    method: 'GET',
    url: orderRoute,
    params: {
        q: payload
    }
})

export const editOrder = (payload: any) => axios({
    method: 'PUT',
    url: orderRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteOrder = (payload: number) => axios({
    method: 'DELETE',
    url: orderRoute.concat(`/${payload}`),
})