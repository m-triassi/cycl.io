import React from 'react'
import {Drawer} from 'antd'

type InventoryDetailDrawerPropType = {
    isVisible: boolean,
    setIsVisible: (payload: boolean) => void,
}

const InventoryDetailDrawer = ({
    isVisible,
    setIsVisible,
}: InventoryDetailDrawerPropType) => {
    console.log('inventory item drawer')
    return (
      <Drawer onClose={() => setIsVisible(false)} visible={isVisible} />
    )
}

InventoryDetailDrawer.displayName = 'InventoryDetailDrawer'
export default InventoryDetailDrawer
