import React from 'react'
import {Button, Col, Input, Row, Table, Typography, Space, Modal} from 'antd'
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import styled from 'styled-components'

const StyledRow = styled(Row)`
    padding: 10px 0px;
`

type InventoryListPropType = {
    inventory: any
}

const config = {
    title: 'Delete Inventory Item',
    icon: <ExclamationCircleOutlined />,
    okText: 'Delete',
    cancelText: 'Cancel',
    content: (
      <>
        <p>This item will be permanantly deleted.</p>
        <p>Are you sure you want to delete this item?</p>
      </>
    ),
  }

const InventoryList = ({
    inventory,
}: InventoryListPropType) => {
    const [modal,contextHolder] = Modal.useModal()
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
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: () => (
              <Space size='middle'>
                <Button danger type='text' icon={<DeleteOutlined />} size='large' onClick={() => {modal.confirm(config)}} />
              </Space>
              ),
        },
    ]
    return (
      <>
        <Row><Typography.Title>Inventory</Typography.Title></Row>
        <Row>
          <Col span={8}>
            <StyledRow>
              <Button shape='round'>Create Inventory Item</Button>
            </StyledRow>
            <StyledRow><Input placeholder='search inventory item' /></StyledRow>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={inventory} />
        {contextHolder}
      </>
    )
}

InventoryList.displayName = 'InventoryList'
export default InventoryList
