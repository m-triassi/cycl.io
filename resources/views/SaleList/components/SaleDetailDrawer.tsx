import React from 'react'
import {Button, Drawer, Typography, Divider} from 'antd'
import {BOMForm, SaleItemDetail} from '@components'

type SaleDetailDrawerPropType = {
    isVisible: boolean,
    id: number,
    setIsVisible: (payload: boolean) => void
}

const SaleDetailDrawer = ({
    isVisible,
    setIsVisible,
    id,
}: SaleDetailDrawerPropType) => {
  if (id === 0 ) return null
  const drawerTitle = (
    <Button type='link' onClick={() => window.open(`/Production/Inventory/${id}`, '_blank')}>
      Sale Item Detail
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
          <Button type='primary' onClick={() => window.open(`/OrderForm/${id}`, '_blank')}>
            Order
          </Button>
        </Typography>
      }>
      <SaleItemDetail isDrawer />
      <Divider />
      <BOMForm inventoryId={id} />
    </Drawer>
    )
}

SaleDetailDrawer.displayName = 'SaleDetailDrawer'
export default SaleDetailDrawer
