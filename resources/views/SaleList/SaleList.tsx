import {Row, Table, Typography, Button, Input, Col, message} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {SaleItemStateType} from 'models/sale'
import {SaleItemModal} from '@components'
import {getInventory} from 'services/inventory'
import {InventoryItemStateType} from 'models/inventory'
import {addSale, getSale} from 'services/sale'

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
    const fetchSaleList = () => {
      getSale().then((response: any) => {
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
      resetState()
    }
    const onChange = (value: any) => {
      const material={...InventoryItem.table.find((element: any) => element.id===value), ...{'pivot': {'quantity': 1}}}
      dispatch({type: 'SET_SALE_MATERIAL_ITEMS', payload: [...materialsTable, material]})
      dispatch({type: 'SET_SALE_ITEM_IDS', payload: value})
      changeTempPrice(tempPrice+material.cost)
   }
   const onChangeQuantity = (itemId:number, value: any) => {
     changeFormQuantity(itemId,value)
     let newTable=[...materialsTable]
       newTable=newTable.map((item: any) => {
         if (item.id===itemId){
           if (item.pivot.quantity>value){
            changeTempPrice(tempPrice-item.cost*(item.pivot.quantity-value))
           } else if (item.pivot.quantity<value){
            changeTempPrice(tempPrice+item.cost*(value-item.pivot.quantity))
           }
           return {
             'id': item.id,
             'cost': item.cost,
             'supplier': {'name': item.supplier.name},
             'title': item.title,
             'pivot': {'assembly_id': materialsTable,'material_id': item.id, 'quantity': value}}
            }
            return item})
         dispatch({type: 'SET_SALE_MATERIAL_ITEMS', payload: newTable})
  }
   const onDelete = (value: any, index: number, cost: number) => {
      dispatch({type: 'SET_SALE_MATERIAL_ITEMS', payload: materialsTable.filter((item: { id: any }) => item.id!==value)})
      dispatch({type: 'DELETE_SALE_ITEM_ID',payload: index})
      changeTempPrice(tempPrice-cost)
 }

    useEffect(() => {
      fetchSaleList()
      fetchInventoryList()
    }, [])

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
        key: 'price',
        dataIndex: 'price',
        render: (text: any) => `${text}`
    },
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
