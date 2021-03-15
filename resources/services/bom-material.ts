import axios from 'axios'
import {BomMaterialFormDataType} from '../models/bom-material'
import {materialsRoute} from '.'

export const addBomMaterial = (payload: BomMaterialFormDataType) => axios({
    url: materialsRoute,
    method: 'POST',
    data: payload,
})

export const getBomMaterial = () => axios.get(materialsRoute)

export const filterBomMaterial = (payload: string) => axios({
    method: 'GET',
    url: materialsRoute,
    params: {
        q: payload
    }
})

export const editBomMaterial = (payload: any) => axios({
    method: 'PUT',
    url: materialsRoute.concat(`/${payload.id}`),
    data: payload.data,
})

export const deleteBomMaterial = (payload: number) => axios({
    method: 'DELETE',
    url: materialsRoute.concat(`/${payload}`),
})