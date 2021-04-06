import {Row, Table, Typography} from 'antd'
import React, {useEffect} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import {OrderListStateType} from '@models/order-list'
import {getOrder} from '@services/order'


type OrderListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    Orders: OrderListStateType
}

const OrderList = ({
    dispatch,
    Orders,
}: OrderListPropType) => {
    const {table} = Orders
    const fetchOrderList = () => {
      getOrder().then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_ORDER_LIST', payload: data.data})
        }
      })
    }

    useEffect(() => {
      fetchOrderList()
    }, [])
    const columns = [
        {
            title: 'Order ID',
            key: 'id',
            dataIndex: 'id',
            render: (text: number) => (
              <Typography.Text strong>{text}</Typography.Text>
            )
        },
        {
            title: 'Supplier ID',
            key: 'supplier_id',
            dataIndex: 'supplier_id',
            render: (text: any) => `${text}`
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (text: any) => `${text}`
      },
      {
          title: 'Delivery Date',
          key: 'delivery_date',
          dataIndex: 'delivery_date',
          render: (text: any) => `${text}`
      },
    ]
    return (
      <>
        <Row><Typography.Title>Purchase Orders</Typography.Title></Row>
        <Table bordered columns={columns} dataSource={table} pagination={{position: ['bottomCenter']}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  Orders: state.OrderList,
})

OrderList.displayName = 'OrderList'
export default connect(mapStateToProps)(OrderList)
