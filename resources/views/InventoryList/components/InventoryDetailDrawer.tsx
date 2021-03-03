import React from 'react'
import {Drawer, Typography} from 'antd'

type InventoryDetailDrawerPropType = {
    isVisible: boolean,
    setIsVisible: (payload: boolean) => void,
}

const InventoryDetailDrawer = ({
    isVisible,
    setIsVisible,
}: InventoryDetailDrawerPropType) => {
    const {Text} = Typography
    return (
      <Drawer onClose={() => setIsVisible(false)} visible={isVisible}>
        <Text>Hi Inventory Item Detail</Text>
      </Drawer>
    )
}

InventoryDetailDrawer.displayName = 'InventoryDetailDrawer'
export default InventoryDetailDrawer
