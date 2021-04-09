import {request} from '@utils'
import {BomMaterialFormDataType} from '../models/bom-material'
import {materialsRoute} from '.'

export const addBomMaterial = (payload: BomMaterialFormDataType) => request({
    url: materialsRoute,
    method: 'POST',
    data: payload,
})

export const getBomMaterial = (payload: number) => request({
    method: 'GET',
    url: materialsRoute.concat(`/${payload}`)
})

export const editBomMaterial = (payload: any) => request({
    method: 'PUT',
    url: materialsRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteBomMaterial = (payload: number) => request({
    method: 'DELETE',
    url: materialsRoute.concat(`/${payload}`),
})