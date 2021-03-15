import React from 'react'
import {VendorList, InventoryList, WelcomePage} from 'views'
import {RouterStateType} from 'models/router'

// import SalesList from '../index'
// import AccountingList from '../index'

type AppContentPropType = {
  router: RouterStateType,
  routeToPage: (url: string) => void
}

// this component will be the front end "router", based on url or redux state (TBD), it will render a specific view

const AppContent = ({
  router,
  routeToPage
}: AppContentPropType) => {
    const {route} = router
    let component
    switch (route) {
      case '/Production/Inventory':
        component = (<InventoryList />)
        break
      case '/Vendor':
        component = (<VendorList />)
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
        component = (<WelcomePage routeToPage={routeToPage} />)
    }
    return component
}

AppContent.displayName = 'AppContent'
export default AppContent
