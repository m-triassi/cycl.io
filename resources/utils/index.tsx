import axios from 'axios'
import {message} from 'antd'

export const request = (options: any) => axios(options).then((response) => Promise.resolve({
    success: true,
    data: response.data,
})).catch((error) => {
    console.log(error)
    message.error('request failed')
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
        success: false,
        data: null,
    })
})
