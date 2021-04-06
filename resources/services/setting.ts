import {request} from '@utils'

export const logOut = () => request({
    method: 'GET',
    url: '/logout'
})