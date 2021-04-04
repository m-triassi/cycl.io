import React from 'react'
import {Modal, Form, Row, Col, InputNumber, Input, Button} from 'antd'

type SaleItemModalPropType = {
    onSubmit: () => void,
    isVisible: boolean,
    setIsVisible: (payload: boolean) => void,
    resetState: () => void,
    changeFormData: (field: string, value: any) => void,
    form: any,
    isCreate: boolean,
}

const SaleItemModal = ({
    onSubmit,
    isVisible,
    setIsVisible,
    resetState,
    changeFormData,
    form,
    isCreate,
}: SaleItemModalPropType) => {
    const {Item} = Form
    return (
      <Modal
        visible={isVisible}
        title={isCreate ? 'Create Sale' : 'Edit sale item'}
        onOk={() => {
            onSubmit()
            setIsVisible(false)
            resetState()
        }}
        onCancel={() => {
            setIsVisible(false)
            resetState()
        }}>
        <Item required label='Description'><Input.TextArea data-cy='sale-form-description' onChange={(e) => changeFormData('description', e.target.value)} value={form.description} /></Item>
        <Item label='Client Name'><Input data-cy='sale-form-client-name' value={form.title} onChange={(e) => changeFormData('client_name', e.target.value)} /></Item>
        <Item required label='Payment Type'><Input data-cy='sale-form-payment-type' onChange={(e) => changeFormData('payment_type', e.target.value)} value={form.client_name} /></Item>
        <Item required label='Card Number'><Input data-cy='sale-form-card-number' onChange={(e) => changeFormData('card_number', e.target.value)} value={form.card_number} /></Item>
        <Item required label='Card Name'><Input data-cy='sale-form-card-name' onChange={(e) => changeFormData('card_name', e.target.value)} value={form.card_name} /></Item>
        <Item required label='Price'><InputNumber data-cy='sale-form-price' onChange={(value) => changeFormData('price', value)} value={form.price} precision={2} /></Item>
        <Row>
          <Col span={12}>
            <Button type='primary' shape='round'>Add Materials</Button>
          </Col>
        </Row>
      </Modal>
    )
}

SaleItemModal.displayName = 'SaleItemModal'
export default SaleItemModal
