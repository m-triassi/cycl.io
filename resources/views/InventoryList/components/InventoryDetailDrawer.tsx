import React from 'react'
import {Drawer} from 'antd'
import {InventoryItemDetail} from '@components'

type InventoryDetailDrawerPropType = {
    isVisible: boolean,
    setIsVisible: (payload: boolean) => void,
}

const InventoryDetailDrawer = ({
    isVisible,
    setIsVisible,
}: InventoryDetailDrawerPropType) => {
    console.log('hi')
    return (
      <Drawer
        closable={false}
        title='Inventory Item Detail'
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        width='40%'>
        <InventoryItemDetail isDrawer />
      </Drawer>
    )
}

InventoryDetailDrawer.displayName = 'InventoryDetailDrawer'
export default InventoryDetailDrawer
