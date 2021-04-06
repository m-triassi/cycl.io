
import {Col, Row, Typography, Button, InputNumber, Divider,message,Result, Descriptions, Space} from 'antd'
import React, {useState, useEffect, ReactNodeArray}  from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {pathToRegexp} from 'path-to-regexp'
import {connect} from 'react-redux'
import {OrderItemStateType} from 'models/order'
import {getInventoryDetail} from 'services/inventory'
import {addOrder} from 'services/order'

type OrderFormPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    OrderItem: OrderItemStateType,
  }

const OrderForm = ({
    dispatch,
    OrderItem
  }: OrderFormPropType) => {
    const {Text} = Typography
    const {id, data, form} = OrderItem
    const [quantity, setQuantity] = useState<number>(1)
    const [orderId, setorderId] = useState<number>(0)
    const [isOrderSuccessful, setisOrderSuccessful] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const setOrderQuantity = (key: number, value: number) => dispatch({type: 'SET_ORDER_QUANTITY_FORM', payload: {key, value}})

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
    const ignoredKeys = ['id', 'created_at' , 'updated_at', 'cost', 'stock', 'supplier_id']
    const toTitleText = (text: string) => {
      if (text.includes('_')) {
          const upperCaseText = text.charAt(0).toUpperCase() + text.slice(1)
          return upperCaseText.replace('_', ' ')
      }
      return text.charAt(0).toUpperCase() + text.slice(1)
    }

    const onQuantityChange = (value: any) => {
        setQuantity(value)
        const itemIndex=form.item_ids.findIndex((item: { inventory_item_id: number }) => item.inventory_item_id===id)
        setOrderQuantity(itemIndex, value)
        setTotal(value*data.sale_price)
      }

    const serializeInventoryItem = (value: any) => {
      if (typeof value === 'object'){
        return value.name
      }
        return value
    }

    const onConfirm =()=>{
      addOrder(form)
        .then((response) => {
          if (response.data.success) {
            setisOrderSuccessful(true)
            setorderId(response.data.data.id)
          } else {
            message.error('Purchase Order failed to be added')
          }
        })
    }

    const dataRow: ReactNodeArray = []
      if (data) {
          Object.entries(data).forEach(([key, value]: any) => {
              if (ignoredKeys.includes(key) || !value) return null
              dataRow.push(
                <Row gutter={[0, 8]}>
                  <Col span={6}><Text strong>{toTitleText(key).concat(':')}</Text></Col>
                  <Col span={8}><Text>{serializeInventoryItem(value)}</Text></Col>
                </Row>
              )
          })
          dataRow.push(
            <>
              <Divider />
              <Row gutter={[0, 8]}>
                <Col span={6}><Text strong>{toTitleText('Quantity:')}</Text></Col>
                <Col span={8}>{isOrderSuccessful?<Text>{quantity}</Text>:<InputNumber data-cy='inventory-form-cost' min={1} onChange={(value) => onQuantityChange(value)} value={quantity} />}</Col>
              </Row>
              <Row gutter={[0, 8]}>
                <Col span={6}><Text strong>{toTitleText('Total:')}</Text></Col>
                <Col span={8}><Text>{`$ ${total===0?data.sale_price:total}`}</Text></Col>
              </Row>
            </>
          )
    }

    return (
      <>
        {isOrderSuccessful?
          <>
            <Result
              status='success'
              title='Purchase Successful'
              subTitle={`Order Number: ${orderId}`}
              extra={[
                <Button onClick={window.close}>Continue</Button>,
          ]} />
            <Descriptions layout='vertical' bordered>
              <Descriptions.Item label='ORDER SUMMARY'>
                {dataRow}
              </Descriptions.Item>
            </Descriptions>
          </>
        :
          <>
            <Row><Typography.Title>{`New Order - ${data.title}`}</Typography.Title></Row>
            {dataRow}
            <Row style={{paddingTop: 20}}>
              <Space>
                <Button onClick={window.close}>Cancel</Button>
                <Button type='primary' onClick={onConfirm}>Confirm</Button>
              </Space>
            </Row>
          </>}
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  OrderItem: state.OrderItem,
})

OrderForm.displayName = 'OrderForm'
export default connect(mapStateToProps)(OrderForm)