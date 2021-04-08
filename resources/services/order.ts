import {request} from '@utils'
import {OrderItemFormDataType} from '../models/order'
import {orderRoute} from '.'

export const addOrder = (payload: OrderItemFormDataType) => request({
    url: orderRoute,
    method: 'POST',
    data: payload,
})

export const getOrder = () => request({
    method: 'GET',
    url: orderRoute
})

export const getSpecificPayable = (payload: number) => request({
    method: 'GET',
    url: orderRoute.concat(`/${payload}`),
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

export const confirmPayable = (payload: number) => request({
    method: 'PUT',
    url: orderRoute.concat(`/${payload}`),
    data: {'status': 'paid'},
})

export const cancelPayable = (payload: number) => request({
    method: 'PUT',
    url: orderRoute.concat(`/${payload}`),
    data: {'status': 'cancelled'},
})
