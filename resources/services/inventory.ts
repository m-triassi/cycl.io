import {request} from '@utils'
import {InventoryItemFormDataType} from '../models/inventory'
import {inventoryRoute} from '.'

export const addInventory = (payload: InventoryItemFormDataType) => request({
    url: inventoryRoute,
    method: 'POST',
    data: payload,
})

export const getInventory = () => request({
    method: 'GET',
    url: inventoryRoute
})

export const getInventoryDetail = (payload: number) => request({
    method: 'GET',
    url: inventoryRoute.concat(`/${payload}`)
})

export const filterInventory = (payload: string) => request({
    method: 'GET',
    url: inventoryRoute,
    params: {
        q: payload
    }
})

export const editInventory = (payload: any) => request({
    method: 'PUT',
    url: inventoryRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteInventory = (payload: number) => request({
    method: 'DELETE',
    url: inventoryRoute.concat(`/${payload}`),
})
