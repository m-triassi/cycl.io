import React from 'react'
import {Button, Drawer, Typography, Divider, Space} from 'antd'
import {DownloadOutlined} from '@ant-design/icons'
import {BOMForm, InventoryItemDetail} from '@components'

type InventoryDetailDrawerPropType = {
    isVisible: boolean,
    id: number,
    setIsVisible: (payload: boolean) => void
}

const InventoryDetailDrawer = ({
    isVisible,
    setIsVisible,
    id,
}: InventoryDetailDrawerPropType) => {
  if (id === 0 ) return null
  const drawerTitle = (
    <Button type='link' onClick={() => window.open(`/Production/Inventory/${id}`, '_blank')}>
      Inventory Item Detail
    </Button>
  )
  return (
    <Drawer
      closable={false}
      title={drawerTitle}
      onClose={() => setIsVisible(false)}
      visible={isVisible}
      width='40%'
      footer={
        <Typography
          style={{
            textAlign: 'left',
          }}>
          <Space>
            <Button type='primary' icon={<DownloadOutlined />} style={{background: '#233D4D'}}>
              Open
            </Button>
            <Button type='primary' onClick={() => window.open(`/OrderForm/${id}`, '_blank')}>
              Order
            </Button>
          </Space>

        </Typography>
      }>
      <InventoryItemDetail isDrawer />
      <Divider />
      <BOMForm inventoryId={id} />
    </Drawer>
    )
}

InventoryDetailDrawer.displayName = 'InventoryDetailDrawer'
export default InventoryDetailDrawer
