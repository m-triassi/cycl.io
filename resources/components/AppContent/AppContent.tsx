import React from 'react'
import {RouterStateType} from '../../models/router'

// import InventoryList from '../index'
// import BOMList from '../index'
// import VendorList from '../index'
// import SalesList from '../index'
// import AccountingList from '../index'

type AppContentPropType = {
  router: RouterStateType
}

// this component will be the front end "router", based on url or redux state (TBD), it will render a specific view

const AppContent = ({
  router,
}: AppContentPropType) => {
    const {route} = router
    let component
    switch (route) {
      case '/Production/Inventory':
        component = (<h1>Hi inventory</h1>)
        break
      case '/Production/BOM':
        component = (<h1>Hi BOM</h1>)
        break
      case '/Vendor':
        component = (<h1>Hi Vendor</h1>)
        break
      case '/Sales':
        component = (<h1>Hi Sales</h1>)
        break
      case '/Accounting':
        component = (<h1>Hi Accounting</h1>)
        break
      case '/Settings':
        component = (<h1>Hi Settings</h1>)
        break
      case '/':
      default:
        component = (<h1>Welcome to Cycl.io</h1>)
    }
    return component
}

AppContent.displayName = 'AppContent'
export default AppContent