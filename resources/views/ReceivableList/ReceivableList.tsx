import {Row, Col, Table, Typography, Statistic, Badge, Radio, Space} from 'antd'
import {DollarOutlined} from '@ant-design/icons'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import {ReceivableListStateType} from 'models/receivable'
import {filterReceivable} from 'services/receivable'
import {CheckButton, DeleteButton} from '@components'

type ReceivableListPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    Receivable: ReceivableListStateType
}

const ReceivableList = ({
    dispatch,
    Receivable,
}: ReceivableListPropType) => {
    const {table} = Receivable
    const [balance, setBalance] = useState<number>(0)
    const statuses = ['', 'shipped', 'paid', 'cancelled']
    const [status, setStatus] = useState<string>(statuses[1])
    const fetchReceivableList = () => {
      filterReceivable({'status': status}).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_RECEIVABLE_LIST', payload: data.data})
          let tempBalance = 0
          data.data.forEach((element: any) => {
            tempBalance += element.price
          })
          setBalance(tempBalance)
        }
      })
    }
    useEffect(() => {
      fetchReceivableList()
    }, [])
    useEffect(() => {
      fetchReceivableList()
    }, [status])
    const columns = [
        {
          title: 'Invoice ID',
          key: 'id',
          dataIndex: 'id',
          render: (text: number) => `${text}`
        },
        {
          title: 'Expense Type',
          key: 'expense_type',
          render: () => `Sale`
      },
        {
          title: 'Invoice Date',
          key: 'created_at',
          dataIndex: 'created_at',
          render: (text: any) => `${text.substring(0, 10)}`
        },
        {
          title: 'Price',
          key: 'price',
          dataIndex: 'price',
          render: (text: any) => `${text}`
      },
      {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => {
          const onConfirm = ()=>{
            dispatch({type: 'CONFIRM_RECEIVABLE', payload: record.id})
            fetchReceivableList()
          }
          const onDelete = ()=>{
            dispatch({type: 'CANCEL_RECEIVABLE', payload: record.id})
            fetchReceivableList()
          }
          if (record.status !== statuses[2] && record.status !== statuses[3]) {
            return (
              <Space size={25}>
                <CheckButton type='Receivable' onCheck={onConfirm} />
                <DeleteButton type='Receivable' onDelete={onDelete} />
              </Space>
            )
          }
          return (<></>)
        },
    },
    ]
    return (
      <>
        <Row><Typography.Title>Accounts Receivable</Typography.Title></Row>
        <Row style={{marginBottom: 8}}>
          <Col>
            <Statistic title={<Badge color='green' text='Balance' />} value={balance} prefix={<DollarOutlined />} />
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
        <Table bordered columns={columns} dataSource={table} pagination={{position: ['bottomCenter']}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  Receivable: state.ReceivableList,
})

ReceivableList.displayName = 'ReceivableList'
export default connect(mapStateToProps)(ReceivableList)
