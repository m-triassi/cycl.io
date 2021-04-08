import React, {useState, useEffect} from 'react'
import {Badge, Row, Col, Typography, Table, Radio, Statistic, Space, Button, Drawer} from 'antd'
import styled from 'styled-components'
import {DollarOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {StoreType, DispatchArgumentType} from '@types'
import {filterPurchaseOrder, getSpecificPayable} from 'services/order'
import {OrderListStateType} from 'models/order-list'
import {DeleteButton, CheckButton} from '@components'


const StyledRow = styled(Row)`
    padding: 10px 0px;
`

type PayableListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    Orders: OrderListStateType,
}

const PayableList = ({
    dispatch,
    Orders,
}: PayableListPropType) => {
    const {table} = Orders
    const [balance, setBalance] = useState<number>(0)
    const [visible, setVisible] = useState(false)
    const [currentSaleID, setCurrentSaleID] = useState<number>()
    const [currentSaleDetails, setCurrentSaleDetails] = useState<any>()

    const showDrawer = (id: number) => {
      setCurrentSaleID(id)
      getSpecificPayable(id).then((response: any) => {
        const {data} = response
        if (data.success) {
          setCurrentSaleDetails(data.data)
        }
        setVisible(true)
      })
    }
    const onClose = () => {
      setVisible(false)
    }

    const statuses = ['', 'received', 'paid', 'cancelled']
    const [status, setStatus] = useState<string>(statuses[1])

    const fetchPayableList = () => {
      filterPurchaseOrder({'status': status}).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_ORDER_LIST', payload: data.data})
          let tempBalance = 0
          data.data.forEach((element: any) => {
            tempBalance += element.cost
          })
          setBalance(tempBalance)
        }
      })
    }

    useEffect(() => {
      fetchPayableList()
    }, [])

    useEffect(() => {
      fetchPayableList()
    }, [status])

    const columns = [
      {
        title: 'Order ID',
        key: 'id',
        dataIndex: 'id',
        render: (text: number) => (
          <Button type='text' style={{color: '#619b8a'}} onClick={() => showDrawer(text)}>{text}</Button>
        )
      },
      {
        title: 'Expense Type',
        key: 'expense_type',
        render: () => `Purchase Order`
      },
      {
        title: 'Bill Date',
        key: 'created_at',
        dataIndex: 'created_at',
        render: (text: any) => `${text.substring(0, 10)}`
      },
      {
        title: 'Cost',
        key: 'cost',
        dataIndex: 'cost',
        render: (text: any) => `$ ${text}`
      },
      {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => {
          const onConfirm = ()=>{
            dispatch({type: 'CONFIRM_PAYABLE', payload: record.id})
            fetchPayableList()
          }
          const onDelete = ()=>{
            dispatch({type: 'CANCEL_PAYABLE', payload: record.id})
            fetchPayableList()
          }
          if (record.status !== statuses[2] && record.status !== statuses[3]) {
            return (
              <Space size={25}>
                <CheckButton type='Payable' onCheck={onConfirm} />
                <DeleteButton type='Payable' onDelete={onDelete} />
              </Space>
            )
          }
          return (<></>)
        },
      },
    ]
    return (
      <>
        <Row><Typography.Title>Accounts Payable</Typography.Title></Row>
        <Row>
          <Statistic title={<Badge color='orange' text='Balance' />} value={balance} prefix={<DollarOutlined />} />
        </Row>
        <Row>
          <StyledRow>
            <Space>
              <Col flex={1}>
                <h4>Categories:</h4>
              </Col>
              <Col flex={6}>
                <Radio.Group defaultValue={status} buttonStyle='solid'>
                  <Radio.Button onClick={() => setStatus(statuses[0])} value={statuses[0]}>All</Radio.Button>
                  <Radio.Button onClick={() => setStatus(statuses[1])} value={statuses[1]}>Pending</Radio.Button>
                  <Radio.Button onClick={() => setStatus(statuses[2])} value={statuses[2]}>Completed</Radio.Button>
                  <Radio.Button onClick={() => setStatus(statuses[3])} value={statuses[3]}>Cancelled</Radio.Button>
                </Radio.Group>
              </Col>
            </Space>
          </StyledRow>
        </Row>
        <StyledRow />
        <Table
          bordered
          columns={columns}
          dataSource={table}
          pagination={{position: ['bottomCenter']}}
          scroll={{x: 'max-content'}} />
        <Drawer
          title={'Purchase Order Details - Order #'.concat(String(currentSaleID))}
          placement='right'
          onClose={onClose}
          visible={visible}
          width={512}>
          <p>
            Purchase order ID:
            {' '}
            {currentSaleDetails?.id}
          </p>
          <p>Expense Type: Purchase Order</p>
          <p>
            Bill Date:
            {' '}
            {currentSaleDetails?.created_at.substring(0, 10)}
          </p>
          <p>
            Cost: $
            {currentSaleDetails?.cost}
          </p>
          <p>
            Status:
            {' '}
            {currentSaleDetails?.status.charAt(0).toUpperCase()+currentSaleDetails?.status.substring(1)}
          </p>
        </Drawer>
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({

    Orders: state.OrderList,
  })

PayableList.displayName = 'PayableList'
export default connect(mapStateToProps)(PayableList)
