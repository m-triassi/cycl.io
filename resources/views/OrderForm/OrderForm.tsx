
import {Col, Row, Typography, Button, Form, InputNumber} from 'antd'
import React, {useState}  from 'react'
import {InventoryItemDetail, DescriptionItem} from '@components'
import {StoreType2} from '@types'
import {connect} from 'react-redux'
import {InventoryDetailStateType} from 'models/inventory-detail'

type OrderFormPropType = {
    routeToPage: (url: string) => void,
    InventoryDetail: InventoryDetailStateType
  }

const OrderForm = ({
    routeToPage,
    InventoryDetail
  }: OrderFormPropType) => {
    const {data} = InventoryDetail
    const {Item} = Form
    const [quantity, setQuantity] = useState<number>(1)
    const [total, setTotal] = useState<number>(data.sale_price)
    const onQuantityChange = (value: any) => {
        setQuantity(value)
        setTotal(value*data.sale_price)
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
        <InventoryItemDetail isDrawer />
        <Item required label='Quantity'><InputNumber data-cy='inventory-form-cost' min={1} onChange={(value) => onQuantityChange(value)} value={quantity} /></Item>
        <Row gutter={[0, 48]}>
          <Col span={8}>
            <DescriptionItem title='Total' content={`$ ${total}`} />
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Button onClick={() => routeToPage('/Production/Inventory')}>Cancel</Button>
          </Col>
          <Col span={3}>
            <Button type='primary'>Confirm</Button>
          </Col>
        </Row>
      </>
    )
}
const mapStateToProps = (state: StoreType2) => ({
    InventoryDetail: state.InventoryDetail,
  })

OrderForm.displayName = 'OrderForm'
export default connect(mapStateToProps)(OrderForm)