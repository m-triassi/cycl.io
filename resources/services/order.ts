import {request} from '@utils'
import {OrderItemStateType} from '../models/order'
import {orderRoute} from '.'

export const addOrder = (payload: OrderItemStateType) => request({
    url: orderRoute,
    method: 'POST',
    data: payload,
})

export const getOrder = () => request({
    method: 'GET',
    url: orderRoute
})

export const filterPurchaseOrder = (payload: any) => request({
    method: 'GET',
    url: orderRoute,
    params: payload
})

export const editOrder = (payload: any) => request({
    method: 'PUT',
    url: orderRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteOrder = (payload: number) => request({
    method: 'DELETE',
    url: orderRoute.concat(`/${payload}`),
})