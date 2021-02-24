import {Button, Col, Form, Input, InputNumber, Modal, Row, Table, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {InventoryItemStateType} from 'models/inventory'
import {filterInventory, getInventory} from 'services/inventory'

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

type InventoryListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryItem: InventoryItemStateType
}

const InventoryList = ({
    dispatch,
    InventoryItem,
}: InventoryListPropType) => {
    const {Item} = Form
    const {form, table} = InventoryItem
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const changeFormData = (key: string, value: any) => dispatch({type: 'INVENTORY_MATERIAL_CHANGE_FORM_DATA', payload: {key, value}})
    const resetState = () => dispatch({type: 'RESET_INVENTORY_FORM_STATE'})
    const onFilterInventory = (value: string) => {
      filterInventory(value).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_INVENTORY_ITEMS', payload: data.data})
        }
      })
    }
    const fetchInventoryList = () => {
      getInventory().then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_INVENTORY_ITEMS', payload: data.data})
        }
      })
    }
    const onSubmit = () => {
        dispatch({type: 'ADD_INVENTORY'})
        fetchInventoryList()
    }
    useEffect(() => {
      fetchInventoryList()
    }, [])
    const addInventoryModal = (
      <Modal
        visible={isCreateModalVisible}
        title='Add inventory item'
        onOk={() => {
            onSubmit()
            setIsCreateModalVisible(false)
            resetState()
        }}
        onCancel={() => {
            setIsCreateModalVisible(false)
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
    const columns = [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
            render: (text: string) => (
              <Typography.Text strong>{text}</Typography.Text>
            )
        },
        {
            title: 'Cost',
            key: 'cost',
            dataIndex: 'cost',
            render: (text: any) => `$${text}`
        },
        {
            title: 'Sale price',
            key: 'sale_price',
            dataIndex: 'sale_price',
            render: (text: any) => `$${text}`
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category'
        },
        {
            title: 'Size',
            key: 'size',
            dataIndex: 'size'
        },
        {
            title: 'Stock',
            key: 'stock',
            dataIndex: 'stock',
        },
    ]
    return (
      <>
        {addInventoryModal}
        <Row><Typography.Title>Inventory</Typography.Title></Row>
        <Row>
          <Col span={8}>
            <StyledRow>
              <Button type='primary' onClick={() => setIsCreateModalVisible(true)} shape='round'>Add Inventory Item</Button>
            </StyledRow>
            <StyledRow>
              <Input
                onPressEnter={(e: any) => onFilterInventory(e.target.value)}
                placeholder='Search Inventory Item' />
            </StyledRow>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={table} pagination={{position: ['bottomCenter']}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    InventoryItem: state.InventoryItem,
})

InventoryList.displayName = 'InventoryList'
export default connect(mapStateToProps)(InventoryList)
