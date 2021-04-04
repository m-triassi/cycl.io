import {Row, Table, Typography, Button, Input, Col} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {SaleItemStateType} from 'models/sale'
import {getOrder} from 'services/order'
import {SaleItemModal} from '@components'



type SaleListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    SaleItem: SaleItemStateType
}

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

const SaleList = ({
    dispatch,
    SaleItem,
}: SaleListPropType) => {
    const {table, form} = SaleItem
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false)
    const resetState = () => dispatch({type: 'RESET_SALE_FORM_STATE'})
    const changeFormData = (key: string, value: any) => dispatch({type: 'INVENTORY_MATERIAL_CHANGE_FORM_DATA', payload: {key, value}})
    const fetchOrderList = () => {
      getOrder().then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_ORDER_LIST', payload: data.data})
        }
      })
    }
    const onSubmit = () => {
      dispatch({type: 'ADD_SALE'})
    }

    useEffect(() => {
      fetchOrderList()
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
          form={form} />
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
        <Table bordered columns={columns} dataSource={table} pagination={{position: ['bottomCenter']}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  SaleItem: state.SaleItem,
})

SaleList.displayName = 'SaleList'
export default connect(mapStateToProps)(SaleList)
