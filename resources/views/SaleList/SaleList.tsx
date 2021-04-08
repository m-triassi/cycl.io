import {Row, Table, Typography, Button, Input, Col, message, Space, Radio} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {SaleItemStateType} from 'models/sale'
import {SaleItemModal,CheckButton, DeleteButton} from '@components'
import {getInventory} from 'services/inventory'
import {InventoryItemStateType} from 'models/inventory'
import {addSale, filterSale} from 'services/sale'


type SaleListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    SaleItem: SaleItemStateType,
    InventoryItem: InventoryItemStateType,
}

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

const SaleList = ({
    dispatch,
    SaleItem,
    InventoryItem
}: SaleListPropType) => {
    const {materialsTable, form, tempPrice, table} = SaleItem
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const statuses = ['', 'pending', 'paid', 'cancelled']
    const [status, setStatus] = useState<string>(statuses[1])
    const resetState = () => dispatch({type: 'RESET_SALE_FORM_STATE'})
    const changeFormData = (key: string, value: any) => dispatch({type: 'SALE_MATERIAL_CHANGE_FORM_DATA', payload: {key, value}})
    const changeFormQuantity = (id: number, value: any) => dispatch({type: 'SET_SALE_QUANTITY_ITEM', payload: {id, value}})
    const changeTempPrice = (value: any) => dispatch({type: 'SALE_MATERIAL_CHANGE_TEMP_PRICE', payload: value})
    const fetchInventoryList = () => {
      getInventory().then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_INVENTORY_ITEMS', payload: data.data})
        }
      })
    }
    const fetchSaleListByState = () => {
      filterSale({'status': status}).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_SALE_LIST', payload: data.data})
          }
        })
    }
    const onSubmit = () => {
      addSale(form)
        .then((response) => {
          const {data} = response
          if (data.success) {
            message.success('Sale added')
          } else {
            message.error('Sale failed to be added')
          }
        })
      fetchSaleListByState()
      resetState()
    }
    const onChange = (value: any) => {
      const material={...InventoryItem.table.find((element: any) => element.id===value), ...{'pivot': {'quantity': 1}}}
      dispatch({type: 'SET_SALE_MATERIAL_ITEMS', payload: [...materialsTable, material]})
      dispatch({type: 'SET_SALE_ITEM_IDS', payload: value})
      changeTempPrice(tempPrice+material.sale_price)
   }
   const onChangeQuantity = (itemId:number, value: any) => {
     changeFormQuantity(itemId,value)
     let newTable=[...materialsTable]
       newTable=newTable.map((item: any) => {
         if (item.id===itemId){
           if (item.pivot.quantity>value){
            changeTempPrice(tempPrice-item.sale_price*(item.pivot.quantity-value))
           } else if (item.pivot.quantity<value){
            changeTempPrice(tempPrice+item.sale_price*(value-item.pivot.quantity))
           }
           return {
             'id': item.id,
             'cost': item.cost,
             'sale_price': item.sale_price,
             'supplier': {'name': item.supplier.name},
             'title': item.title,
             'pivot': {'assembly_id': materialsTable,'material_id': item.id, 'quantity': value}}
            }
            return item})
         dispatch({type: 'SET_SALE_MATERIAL_ITEMS', payload: newTable})
  }
   const onDelete = (value: any, index: number, price: number) => {
      dispatch({type: 'SET_SALE_MATERIAL_ITEMS', payload: materialsTable.filter((item: { id: any }) => item.id!==value)})
      dispatch({type: 'DELETE_SALE_ITEM_ID',payload: index})
      changeTempPrice(tempPrice-price)
 }

    useEffect(() => {
      fetchSaleListByState()
      fetchInventoryList()
    }, [])
    useEffect(() => {
      fetchSaleListByState()
    }, [status])

    const columns = [
        {
            title: 'Sale ID',
            key: 'id',
            dataIndex: 'id',
            render: (text: number) => (
              <Typography.Text strong>{text}</Typography.Text>
            )
        },
        {
            title: 'Client Name',
            key: 'client_name',
            dataIndex: 'client_name',
            render: (text: any) => `${text}`
        },
      {
          title: 'Delivery Date',
          key: 'delivery_date',
          dataIndex: 'delivery_date',
          render: (text: any) => `${text}`
      },
      {
        title: 'Price',
        key: 'cost',
        dataIndex: 'cost',
        render: (text: any) => `${text}`
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => {
        const onConfirm = ()=>{
          dispatch({type: 'CONFIRM_SALE', payload: record.id})
          fetchSaleListByState()
        }
        const onCancel = ()=>{
          dispatch({type: 'CANCEL_SALE', payload: record.id})
          fetchSaleListByState()
        }
        if (record.status !== statuses[2] && record.status !== statuses[3]) {
          return (
            <Space size={25}>
              <CheckButton type='Sale' onCheck={onConfirm} />
              <DeleteButton type='Sale' onDelete={onCancel} />
            </Space>
          )
        }
        return (<></>)
      }
    }
    ]
    return (
      <>
        <SaleItemModal
          isCreate
          onSubmit={onSubmit}
          isVisible={isCreateModalVisible}
          setIsVisible={setIsCreateModalVisible}
          resetState={resetState}
          changeFormData={changeFormData}
          onChange={onChange}
          onChangeQuantity={onChangeQuantity}
          onDelete={onDelete}
          saleForm={form}
          table={materialsTable}
          tempPrice={tempPrice} />
        <Row><Typography.Title>Sales</Typography.Title></Row>
        <Row>
          <Col span={8}>
            <StyledRow>
              <Button type='primary' onClick={() => setIsCreateModalVisible(true)} shape='round'>Create Sale</Button>
            </StyledRow>
            <StyledRow>
              <Input
                placeholder='Search Sale Item' />
            </StyledRow>
          </Col>
        </Row>
        <Row style={{marginBottom: 8}}>
          <Radio.Group defaultValue={status} buttonStyle='solid'>
            <Radio.Button onClick={() => setStatus(statuses[0])} value={statuses[0]}>All</Radio.Button>
            <Radio.Button onClick={() => setStatus(statuses[1])} value={statuses[1]}>Pending</Radio.Button>
            <Radio.Button onClick={() => setStatus(statuses[2])} value={statuses[2]}>Completed</Radio.Button>
            <Radio.Button onClick={() => setStatus(statuses[3])} value={statuses[3]}>Cancelled</Radio.Button>
          </Radio.Group>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={table}
          pagination={{position: ['bottomCenter']}}
          scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  SaleItem: state.SaleItem,
  InventoryItem: state.InventoryItem
})

SaleList.displayName = 'SaleList'
export default connect(mapStateToProps)(SaleList)
