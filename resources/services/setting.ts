import {request} from '@utils'

export const logOut = () => request({
    method: 'POST',
    url: '/logout'
})