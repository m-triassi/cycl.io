
import {Col, Row, Typography, Button, InputNumber, Divider} from 'antd'
import React, {useState, useEffect, ReactNodeArray}  from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {pathToRegexp} from 'path-to-regexp'
import {connect} from 'react-redux'
import {OrderItemStateType} from 'models/order'
import {getInventoryDetail} from 'services/inventory'

type OrderFormPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    OrderItem: OrderItemStateType,
  }

const OrderForm = ({
    dispatch,
    OrderItem
  }: OrderFormPropType) => {
    const {Text} = Typography
    const {id, data} = OrderItem
    const [quantity, setQuantity] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)

    const fetchOrderDetail = () => {
      getInventoryDetail(id).then((response: any) => {
          if (response.data.success) {
              dispatch({type: 'SET_ORDER_DETAIL_DATA', payload: response.data.data})
          }
      })
    }

    useEffect(() => {
      const regexp = pathToRegexp('/OrderForm/(\\d+)')
      const IdString = regexp.exec(window.location.pathname)
      const pathId = IdString && parseInt(IdString[1])
      dispatch({type: 'SET_ITEM_DETAIL_ID', payload: pathId})

      if (id !== 0 ) {
        fetchOrderDetail()
    }
    }, [id])
    const ignoredKeys = ['id', 'created_at' , 'updated_at', 'cost', 'stock']
    const toTitleText = (text: string) => {
      if (text.includes('_')) {
          const upperCaseText = text.charAt(0).toUpperCase() + text.slice(1)
          return upperCaseText.replace('_', ' ')
      }
      return text.charAt(0).toUpperCase() + text.slice(1)
  }

    const onQuantityChange = (value: any) => {
        setQuantity(value)
        setTotal(value*data.sale_price)
      }
    const dataRow: ReactNodeArray = []
      if (data) {
          Object.entries(data).forEach(([key, value]: any) => {
              if (ignoredKeys.includes(key) || !value) return null
              dataRow.push(
                <Row gutter={[0, 8]}>
                  <Col span={6}><Text strong>{toTitleText(key).concat(':')}</Text></Col>
                  <Col span={8}><Text>{value.toString()}</Text></Col>
                </Row>
              )
          })
          dataRow.push(
            <>
              <Divider />
              <Row gutter={[0, 8]}>
                <Col span={6}><Text strong>{toTitleText('Quantity:')}</Text></Col>
                <Col span={8}><InputNumber data-cy='inventory-form-cost' min={1} onChange={(value) => onQuantityChange(value)} value={quantity} /></Col>
              </Row>
              <Row gutter={[0, 48]}>
                <Col span={6}><Text strong>{toTitleText('Total:')}</Text></Col>
                <Col span={8}><Text>{`$ ${total===0?data.sale_price:total}`}</Text></Col>
              </Row>
            </>
          )
    }
    return (
      <>
        <Row><Typography.Title>{`New Order - ${data.title}`}</Typography.Title></Row>
        <Row>
          <Col span={8} />
        </Row>
        <Row>
          <Col span={8} />
        </Row>
        {dataRow}
        <Row>
          <Col span={3}>
            <Button onClick={()=>window.close()}>Cancel</Button>
          </Col>
          <Col span={3}>
            <Button type='primary'>Confirm</Button>
          </Col>
        </Row>
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  OrderItem: state.OrderItem,
})

OrderForm.displayName = 'OrderForm'
export default connect(mapStateToProps)(OrderForm)