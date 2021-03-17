import axios from 'axios'
import {VendorItemFormDataType} from '../models/vendor'
import {vendorRoute} from '.'

export const addVendor = (payload: VendorItemFormDataType) => axios({
    url: vendorRoute,
    method: 'POST',
    data: payload,
})

export const getVendor = () => axios.get(vendorRoute)

export const filterVendor = (payload: string) => axios({
    method: 'GET',
    url: vendorRoute,
    params: {
        q: payload
    }
})

export const filterVendorWithParams = (payload: {}) => axios({
    method: 'GET',
    url: vendorRoute,
    params: payload
})

export const editVendor = (payload: any) => axios({
    method: 'PUT',
    url: vendorRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteVendor = (payload: number) => axios({
    method: 'DELETE',
    url: vendorRoute.concat(`/${payload}`),
})