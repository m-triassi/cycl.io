import {request} from '@utils'
import {VendorItemFormDataType} from '../models/vendor'
import {vendorRoute} from '.'

export const addVendor = (payload: VendorItemFormDataType) => request({
    url: vendorRoute,
    method: 'POST',
    data: payload,
})

export const getVendor = () => request({
    method: 'GET',
    url: vendorRoute
})

export const getVendorByID = (id: number) => request({
    method: 'GET',
    url: vendorRoute.concat(`/${id}`)
})

export const filterVendor = (payload: string) => request({
    method: 'GET',
    url: vendorRoute,
    params: {
        q: payload
    }
})

export const filterVendorWithParams = (payload: any) => request({
    method: 'GET',
    url: vendorRoute,
    params: payload
})

export const editVendor = (payload: any) => request({
    method: 'PUT',
    url: vendorRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteVendor = (payload: number) => request({
    method: 'DELETE',
    url: vendorRoute.concat(`/${payload}`),
})