import React from 'react'
import {InventoryList, WelcomePage, OrderForm, VendorList, OrderList, PayableList, ReceivableList} from 'views'
import {RouterStateType} from 'models/router'
import {InventoryItemDetail} from '@components'

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
      case (route.match(/\/Production\/Inventory\/\d+/) || {}).input:
        component = (<InventoryItemDetail isDrawer={false} />)
        break
      case '/Production/Inventory':
        component = (<InventoryList />)
        break
      case (route.match(/\/Vendor\/Suppliers\/\d+/) || {}).input:
        component = (<h1>Hi Supplier</h1>)
        break
      case '/Vendor/Suppliers':
        component = (<VendorList />)
        break
      case '/Vendor/Orders':
        component = (<OrderList />)
        break
      case '/Sales':
        component = (<h1>Hi Sales</h1>)
        break
      case '/Accounting/Payable':
        component = (<PayableList />)
      break
      case '/Accounting/Receivable':
        component = (<ReceivableList />)
        break
      case '/Settings':
        component = (<h1>Hi Settings</h1>)
        break
      case (route.match(/\/OrderForm\/\d+/) || {}).input:
        component = (<OrderForm />)
        break
      case '/':
      default:
        component = (<WelcomePage routeToPage={routeToPage} />)
    }
    return component
}

AppContent.displayName = 'AppContent'
export default AppContent
