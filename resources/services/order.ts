import axios from 'axios'
import {orderRoute} from '.'

export const addOrder = (payload: any) => axios({
    url: orderRoute.concat(`/${0}`),
    method: 'PUT',
    data: payload,
})
