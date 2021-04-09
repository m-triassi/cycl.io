import React from 'react'
import {Button, Drawer, Typography, Divider} from 'antd'
import {BOMForm, InventoryItemDetail} from '@components'

type InventoryDetailDrawerPropType = {
    isVisible: boolean,
    id: number,
    title: string,
    setIsVisible: (payload: boolean) => void
}

const InventoryDetailDrawer = ({
    isVisible,
    setIsVisible,
    id,
    title,
}: InventoryDetailDrawerPropType) => {
  if (id === 0 ) return null
  const drawerTitle = (
    <Button type='link' onClick={() => window.open(`/Production/Inventory/${id}`, '_blank')}>
      {title.length > 0 ? title : 'Inventory Item Detail'}
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
          <Button
            shape='round'
            type='primary'
            onClick={() => window.open(`/OrderForm/${id}`, '_blank')}>
            Order
          </Button>
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
