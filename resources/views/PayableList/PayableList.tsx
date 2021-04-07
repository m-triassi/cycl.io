import React, {useState, useEffect} from 'react'
import {Badge, Row, Col, Typography, Table, Radio, Statistic, Space} from 'antd'
import styled from 'styled-components'
import {DollarOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {StoreType, DispatchArgumentType} from '@types'
import {filterPurchaseOrder,getOrder} from 'services/order'
import {OrderListStateType} from 'models/order-list'
import {DeleteButton} from '@components'


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
    const statuses = ['', 'received', 'paid', 'cancelled']
    const [status, setStatus] = useState<string>(statuses[1])

    const fetchPayableList = () => {
      getOrder().then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_ORDER_LIST', payload: data.data})
          // let tempBalance = 0
          // data.data.forEach((element: any) => {
          //   tempBalance += element.cost
          // })
          // setBalance(tempBalance)
        }
      })
    }
    const onFilterPayable = () => {
      filterPurchaseOrder({'status': status}).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_ORDER_LIST', payload: data.data})
        }
      })
    }

    useEffect(() => {
      fetchPayableList()
    }, [])

    useEffect(() => {
      onFilterPayable()
    }, [status])

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
        title: 'Expense Type',
        key: 'expense_type',
        render: () => `Purchase Order`
      },
      {
        title: 'Bill Date',
        key: 'created_at',
        dataIndex: 'created_at'
      },
      {
        title: 'Cost',
        key: 'cost',
        dataIndex: 'cost'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => {
          // const onConfirm = ()=>{
          //   dispatch({type: 'CONFIRM_RECEIVABLE', payload: record.id})
          //   fetchPayableList()
          // }
          const onDelete = ()=>{
            dispatch({type: 'CANCEL_RECEIVABLE', payload: record.id})
            fetchPayableList()
          }
          if (record.status !== statuses[2] && record.status !== statuses[3]) {
            return (
              <Space size={25}>
                {/* <CheckButton type='Receivable' onCheck={onConfirm} /> */}
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
        {/* <StyledRow>
          <Input
            onPressEnter={(e: any) => onFilterPayable(e.target.value)}
            placeholder='Search bill item' />
        </StyledRow> */}
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

    Orders: state.OrderList,
  })

PayableList.displayName = 'PayableList'
export default connect(mapStateToProps)(PayableList)
