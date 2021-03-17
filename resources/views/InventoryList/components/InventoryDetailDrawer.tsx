import React from 'react'
import {Button, Drawer, Typography} from 'antd'
import {InventoryItemDetail} from '@components'

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
      bodyStyle={{padding: '6px 24px 6px 24px'}}
      width='40%'
      footer={
        <Typography
          style={{
            textAlign: 'left',
          }}>
          <Button type='primary' onClick={() => window.open(`/OrderForm/${id}`, '_blank')}>
            Order
          </Button>
        </Typography>
      }>
      <InventoryItemDetail isDrawer />
    </Drawer>
    )
}


InventoryDetailDrawer.displayName = 'InventoryDetailDrawer'
export default InventoryDetailDrawer
