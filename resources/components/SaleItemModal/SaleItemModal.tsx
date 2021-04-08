import React, {useState} from 'react'
import {Modal, Form, InputNumber, Input, Divider, Select} from 'antd'
import {MaterialsTable} from '@components'

type SaleItemModalPropType = {
    onSubmit: () => void,
    isVisible: boolean,
    setIsVisible: (payload: boolean) => void,
    resetState: () => void,
    changeFormData: (field: string, value: any) => void,
    onChangeQuantity: (itemId: number, value: any) => void,
    isCreate: boolean,
    onChange: (value: any) => void,
    onDelete: (value: any, index: number, price: number) => void,
    saleForm: any,
    table: any,
    tempPrice: number
}

const SaleItemModal = ({
    onSubmit,
    isVisible,
    setIsVisible,
    resetState,
    changeFormData,
    isCreate,
    onChange,
    onChangeQuantity,
    onDelete,
    saleForm,
    table,
    tempPrice
}: SaleItemModalPropType) => {
    const {Item} = Form
    const {Option} = Select
    const [form] = Form.useForm()
    const [selected, setSelected] = useState<string>('')
    return (
      <Modal
        visible={isVisible}
        title={isCreate ? 'Create Sale' : 'Edit sale item'}
        onOk={() => {
            onSubmit()
            setIsVisible(false)
            resetState()
            form.resetFields()
            setSelected('')
        }}
        onCancel={() => {
            setIsVisible(false)
            resetState()
            form.resetFields()
            setSelected('')
        }}>
        <Form {...{labelCol: {span: 6},wrapperCol: {span: 16}}} form={form}>
          <Item label='Description'><Input.TextArea data-cy='sale-form-description' value={saleForm.description} onChange={(e) => changeFormData('description', e.target.value)} /></Item>
          <Item required label='Client Name'><Input data-cy='sale-form-client-name' value={saleForm.client_name} onChange={(e) => changeFormData('client_name', e.target.value)} /></Item>
          <Item name='payment_type' label='Payment Type' hasFeedback rules={[{required: true, message: 'The selected payment type is invalid'}]}>
            <Select data-cy='sale-form-payment-type' placeholder='Please select a payment type' onSelect={(e) => changeFormData('payment_type', e)}>
              <Option value='Visa'>Visa</Option>
              <Option value='Master Card'>Master Card</Option>
            </Select>
          </Item>
          <Item name='card_number' label='Card Number' hasFeedback rules={[{required: true, min: 16, max: 16, message: 'The card number must be 16 characters'}]}><Input data-cy='sale-form-card-number' onChange={(e) => changeFormData('card_number', e.target.value)} /></Item>
          <Item name='cardholder_name' label='Card Name' rules={[{required: true}]}><Input data-cy='sale-form-card-name' onChange={(e) => changeFormData('cardholder_name', e.target.value)} /></Item>
          <Divider />
          <MaterialsTable onChange={onChange} onDelete={onDelete} table={table} form={saleForm} selected={selected} setSelected={setSelected} onChangeQuantity={onChangeQuantity} />
          <Divider />
          <Item label='Price'><InputNumber data-cy='sale-form-price' onChange={(value) => changeFormData('price', value)} value={saleForm.price?saleForm.price:tempPrice} precision={2} /></Item>
        </Form>
      </Modal>
    )
}

SaleItemModal.displayName = 'SaleItemModal'
export default SaleItemModal
