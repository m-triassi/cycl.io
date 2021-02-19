import {Button, Col, Form, Input, InputNumber, Modal, Row, Table, Typography} from 'antd'
import React, {useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import styled from 'styled-components'

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

type InventoryListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    inventoryMaterial: any
}

const InventoryList = ({
    dispatch,
    inventoryMaterial,
}: InventoryListPropType) => {
    const {Item} = Form
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const changeFormData = (key: string, value: any) => dispatch({type: 'INVENTORY_MATERIAL_CHANGE_FORM_DATA', payload: {key, value}})
    const resetState = () => dispatch({type: 'RESET_INVENTORY_FORM_STATE'})
    const addInventoryModal = (
      <Modal
        visible={isCreateModalVisible}
        title='Add inventory'
        onOk={() => {
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
            title: 'Component',
            key: 'component',
            dataIndex: 'component'
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
            title: 'Color',
            key: 'color',
            dataIndex: 'color'
        },
        {
            title: 'Finish',
            key: 'finish',
            dataIndex: 'finish'
        },
        {
            title: 'Material',
            key: 'material',
            dataIndex: 'material'
        },
        {
            title: 'Purchase Date',
            key: 'purchaseDate',
            dataIndex: 'purchaseDate'
        },
        {
            title: 'Provider',
            key: 'provider',
            dataIndex: 'provider'
        },
        {
            title: 'Cost',
            key: 'cost',
            dataIndex: 'cost'
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity'
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
        <Table bordered columns={columns} dataSource={inventoryMaterial} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    inventoryMaterial: state.inventoryMaterial,
})

InventoryList.displayName = 'InventoryList'
export default connect(mapStateToProps)(InventoryList)
