import {Button, Col, Form, Input, InputNumber, Modal, Row, Table, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {getInventory} from 'services/inventory'

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

type InventoryListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryMaterial: any
}

const InventoryList = ({
    dispatch,
    InventoryMaterial,
}: InventoryListPropType) => {
    const {Item} = Form
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const changeFormData = (key: string, value: any) => dispatch({type: 'INVENTORY_MATERIAL_CHANGE_FORM_DATA', payload: {key, value}})
    const resetState = () => dispatch({type: 'RESET_INVENTORY_FORM_STATE'})
    const onSubmit = () => dispatch({type: 'ADD_INVENTORY'})
    const fetchInventoryItemList = () => {
        getInventory().then((response: any) => {
            const {data} = response
            if (data.success) {
              dispatch({type: 'SET_INVENTORY_ITEMS', payload: data.data})
            }
          })
    }

    useEffect(() => {
        fetchInventoryItemList()
    }, [])
    const addInventoryModal = (
      <Modal
        visible={isCreateModalVisible}
        title='Add inventory'
        onOk={() => {
            onSubmit()
            setIsCreateModalVisible(false)
            resetState()
        }}
        onCancel={() => {
            setIsCreateModalVisible(false)
            resetState()
        }}>
        <Item required label='Title'><Input onChange={(e) => changeFormData('title', e.target.value)} /></Item>
        <Item required label='Part ID'><Input /></Item>
        <Item required label='Cost'><InputNumber precision={2} /></Item>
        <Item required label='Stock'><InputNumber precision={0} /></Item>
        <Item label='Category'><Input /></Item>
        <Item label='Size'><Input /></Item>
        <Item label='Color'><Input /></Item>
        <Item label='Finish'><Input /></Item>
        <Item label='Material'><Input /></Item>
        <Item label='Lead Time'><InputNumber precision={2} /></Item>
        <Item label='Labor Cost'><InputNumber precision={2} /></Item>
        <Item label='Sale Price'><InputNumber precision={2} /></Item>
        <Item label='Description'><Input.TextArea /></Item>
      </Modal>
    )
    const columns = [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title'
        },
        {
            title: 'Cost',
            key: 'cost',
            dataIndex: 'cost'
        },
        {
            title: 'Sale price',
            key: 'sale_price',
            dataIndex: 'sale_price'
        },
        {
            title: 'Stock',
            key: 'stock',
            dataIndex: 'stock'
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
    ]
    return (
      <>
        {addInventoryModal}
        <Row><Typography.Title>Inventory</Typography.Title></Row>
        <Row>
          <Col span={8}>
            <StyledRow>
              <Button onClick={() => setIsCreateModalVisible(true)} shape='round'>Create Inventory Item</Button>
            </StyledRow>
            <StyledRow><Input placeholder='search inventory item' /></StyledRow>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={InventoryMaterial.table} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    InventoryMaterial: state.InventoryMaterial,
})

InventoryList.displayName = 'InventoryList'
export default connect(mapStateToProps)(InventoryList)
