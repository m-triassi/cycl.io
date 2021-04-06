import axios from 'axios'
import {receivablerRoute} from '.'

export const getReceivable = () => axios.get(receivablerRoute)

export const filterReceivable = (payload: {}) => axios({
    method: 'GET',
    url: receivablerRoute,
    params: payload
})

export const editReceivable = (payload: any) => axios({
    method: 'PUT',
    url: receivablerRoute.concat(`/${payload.id}`),
    data: payload,
})

export const confirmReceivable = (payload: number) => axios({
    method: 'PUT',
    url: receivablerRoute.concat(`/${payload}`),
    data: {'status': 'paid'},
})

export const cancelReceivable = (payload: number) => axios({
    method: 'PUT',
    url: receivablerRoute.concat(`/${payload}`),
    data: {'status': 'cancelled'},
})

export const deleteReceivable = (payload: number) => axios({
    method: 'DELETE',
    url: receivablerRoute.concat(`/${payload}`),
})