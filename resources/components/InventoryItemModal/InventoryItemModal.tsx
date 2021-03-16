import React from 'react'
import {Modal, Form, Row, Col, InputNumber, Input} from 'antd'

type InventoryItemModalPropType = {
    onSubmit: () => void,
    isVisible: boolean,
    setIsVisible: (payload: boolean) => void,
    resetState: () => void,
    changeFormData: (field: string, value: any) => void,
    form: any,
    isCreate: boolean,
}

const InventoryItemModal = ({
    onSubmit,
    isVisible,
    setIsVisible,
    resetState,
    changeFormData,
    form,
    isCreate,
}: InventoryItemModalPropType) => {
    const {Item} = Form
    return (
      <Modal
        visible={isVisible}
        title={isCreate ? 'Add inventory item' : 'Edit inventory item'}
        onOk={() => {
            onSubmit()
            setIsVisible(false)
            resetState()
        }}
        onCancel={() => {
            setIsVisible(false)
            resetState()
        }}>
        <Item required label='Title'><Input data-cy='inventory-form-title' value={form.title} onChange={(e) => changeFormData('title', e.target.value)} /></Item>
        <Row>
          <Col span={12}>
            <Item required label='Cost'><InputNumber data-cy='inventory-form-cost' onChange={(value) => changeFormData('cost', value)} value={form.cost} precision={2} /></Item>
          </Col>
          <Col span={12}>
            <Item required label='Sale Price'><InputNumber data-cy='inventory-form-sale-price' onChange={(value) => changeFormData('sale_price', value)} value={form.sale_price} precision={2} /></Item>
          </Col>
        </Row>
        <Item required label='Description'><Input.TextArea data-cy='inventory-form-description' onChange={(e) => changeFormData('description', e.target.value)} value={form.description} /></Item>
        <Item label='Category'><Input value={form.category} onChange={(e) => changeFormData('category', e.target.value)} /></Item>
        <Item label='Size'><Input value={form.size} onChange={(e) => changeFormData('size', e.target.value)} /></Item>
        <Item label='Part Number'><Input value={form.part_number} onChange={(e) => changeFormData('part_number', e.target.value)} /></Item>
        <Item label='Stock'><InputNumber value={form.stock} onChange={(value) => changeFormData('stock', value)} precision={0} /></Item>
        <Item label='Color'><Input value={form.color} onChange={(e) => changeFormData('color', e.target.value)} /></Item>
        <Item label='Finish'><Input value={form.finish} onChange={(e) => changeFormData('finish', e.target.value)} /></Item>
        <Item label='Material'><Input value={form.material} onChange={(e) => changeFormData('material', e.target.value)} /></Item>
        <Row>
          <Col span={12}>
            <Item label='Lead Time'><InputNumber onChange={(value) => changeFormData('lead_time', value)} precision={2} value={form.lead_time} /></Item>
          </Col>
          <Col span={12}>
            <Item label='Labour Cost'><InputNumber onChange={(value) => changeFormData('labour_cost', value)} precision={2} value={form.labour_cost} /></Item>
          </Col>
        </Row>
      </Modal>
    )
}

InventoryItemModal.displayName = 'InventoryItemModal'
export default InventoryItemModal
