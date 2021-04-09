import {Button, Col, Input, Row, Table, Typography} from 'antd'
import {DownloadOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {InventoryItemStateType} from '@models/inventory'
import {filterInventory, getInventory} from '@services/inventory'
import {DeleteButton, InventoryItemModal} from '@components'
import {numberFormatter} from '@utils'
import {InventoryDetailDrawer} from './components'

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
    const {Link} = Typography
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState<boolean>(false)
    const [selectedRowId, setSelectedRowId] = useState<number>(0)
    const [selectedRowName, setSelectedRowName] = useState<string>('')
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
          title: 'Category',
          key: 'category',
          dataIndex: 'category'
        },
        {
          title: 'Supplier',
          key: 'supplier_name',
          dataIndex: ['supplier', 'name'],
          render: (text: string, record: any) => {
            if (record.supplier_id && record.supplier) return (
              <Link onClick={(e) => e.stopPropagation()} href={`/Vendor/Suppliers/${record.supplier_id}`}>{record.supplier.name}</Link>
            )
              return 'No linked vendor'
          }
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
          title: 'Cost',
          key: 'cost',
          dataIndex: 'cost',
          render: (text: any) => `$${numberFormatter(text)}`
        },
        {
          title: 'Sale price',
          key: 'sale_price',
          dataIndex: 'sale_price',
          render: (text: any) => `$${numberFormatter(text)}`
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
                // eslint-disable-next-line
                <div onClick={(e) => e.stopPropagation()}>
                  <DeleteButton type='Inventory' onDelete={onDelete} />
                </div>
            )}
        },
    ]
    return (
      <>
        <InventoryItemModal
          isCreate
          onSubmit={onSubmit}
          isVisible={isCreateModalVisible}
          setIsVisible={setIsCreateModalVisible}
          resetState={resetState}
          changeFormData={changeFormData}
          form={form} />
        <InventoryDetailDrawer isVisible={isDetailDrawerVisible} setIsVisible={setIsDetailDrawerVisible} id={selectedRowId} title={selectedRowName} />
        <Row>
          <Typography.Title>Inventory</Typography.Title>
        </Row>
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
            setSelectedRowName(record.title)
            dispatch({type: 'CHANGE_DETAIL_ID', payload: record.id})
            dispatch({type: 'SET_INVENTORY_DETAIL_DATA', payload: record})
            setIsDetailDrawerVisible(true)
          }})}
          scroll={{x: 'max-content'}} />
        <Row>
          <Button
            type='primary'
            shape='round'
            onClick={() => window.open(`/stock/report`, '_blank')}
            icon={<DownloadOutlined />}
            style={{background: '#233D4D'}}>
            Export CSV
          </Button>
        </Row>
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
    InventoryItem: state.InventoryItem,
})

InventoryList.displayName = 'InventoryList'
export default connect(mapStateToProps)(InventoryList)
