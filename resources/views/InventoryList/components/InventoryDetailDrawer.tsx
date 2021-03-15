import React from 'react'
import {Button, Drawer, Typography} from 'antd'
import {InventoryItemDetail} from '@components'

type InventoryDetailDrawerPropType = {
    routeToPage: (url: string) => void,
    isVisible: boolean,
    id: number,
    setIsVisible: (payload: boolean) => void
}

const InventoryDetailDrawer = ({
    routeToPage,
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
          <Button type='primary' onClick={() => routeToPage('/OrderForm')}>
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
