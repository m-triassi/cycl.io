import axios from 'axios'
import {message, Col, Row, Typography} from 'antd'
import React, {ReactNodeArray} from 'react'

const {Text} = Typography
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

export const serializeInventoryItem = (value: any) => {
    if (typeof value === 'object'){
      return value.name
    }
    return value
}

export const toTitleText = (text: string) => {
    if (text.includes('_')) {
        const upperCaseText = text.charAt(0).toUpperCase() + text.slice(1)
        return upperCaseText.replace('_', ' ')
    }
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const dataDisplay = (data: any, ignoredKeys: any, options?: any) => {
    const dataRow: ReactNodeArray = []
    if (data) {
        Object.entries(data).forEach(([key, value]: any) => {
            if (ignoredKeys.includes(key) || !value) return null
            dataRow.push(
              <Row>
                <Col span={options?.isDrawer ? 12 : 6}><Text strong>{toTitleText(key).concat(':')}</Text></Col>
                <Col span={options?.isDrawer ? 12 : 6}>
                  <Text>
                    {serializeInventoryItem(value)}
                  </Text>
                </Col>
              </Row>
            )
        })
    }
    return dataRow
}