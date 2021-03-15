import {Button, Col, Input, Row, Table, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {InventoryItemStateType} from 'models/inventory'
import {filterInventory, getInventory} from 'services/inventory'
import {DeleteButton} from '@components'
import {AddInventoryItemModal, InventoryDetailDrawer} from './components'

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

type InventoryListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryItem: InventoryItemStateType,
}

const InventoryList = ({
    dispatch,
    InventoryItem,
}: InventoryListPropType) => {
    const {form, table} = InventoryItem
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState<boolean>(false)
    const [selectedRowId, setSelectedRowId] = useState<number>(0)
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
            render: (text: any) => `$ ${text}`
        },
        {
            title: 'Sale price',
            key: 'sale_price',
            dataIndex: 'sale_price',
            render: (text: any) => `$ ${text}`
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
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => {
              const onDelete = ()=>{
                dispatch({type: 'DELETE_INVENTORY', payload: record.id})
                fetchInventoryList()
              }
              return (
                <DeleteButton type='Inventory' onDelete={onDelete} />
            )},
        },
    ]
    return (
      <>
        <AddInventoryItemModal
          onSubmit={onSubmit}
          isVisible={isCreateModalVisible}
          setIsVisible={setIsCreateModalVisible}
          resetState={resetState}
          changeFormData={changeFormData}
          form={form} />
        <InventoryDetailDrawer isVisible={isDetailDrawerVisible} setIsVisible={setIsDetailDrawerVisible} id={selectedRowId} />
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
        <Table
          bordered
          columns={columns}
          dataSource={table}
          pagination={{position: ['bottomCenter']}}
          onRow={(record) => ({onClick: () => {
            setSelectedRowId(record.id)
            dispatch({type: 'CHANGE_DETAIL_ID', payload: record.id})
            setIsDetailDrawerVisible(true)
          }})}
          scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    InventoryItem: state.InventoryItem,
})

InventoryList.displayName = 'InventoryList'
export default connect(mapStateToProps)(InventoryList)
