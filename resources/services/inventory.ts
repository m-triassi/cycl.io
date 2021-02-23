import axios from 'axios'
import {InventoryItemFormDataType} from '../models/inventory'
import {inventoryRoute} from '.'

export const addInventory = (payload: InventoryItemFormDataType) => axios({
    url: inventoryRoute,
    method: 'POST',
    data: payload,
})

export const getInventory = () => axios.get(inventoryRoute)

export const editInventory = (payload: any) => axios({
    method: 'PUT',
    url: inventoryRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteInventory = (payload: number) => axios({
    method: 'DELETE',
    url: inventoryRoute.concat(`/${payload}`),
})