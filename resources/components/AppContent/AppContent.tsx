import React from 'react'
import {InventoryList, WelcomePage, OrderForm, VendorList, OrderList, SettingPage, SaleList, ReceivableList, SupplierDetails, PayableList} from '@views'
import {RouterStateType} from '@models/router'
import {InventoryItemDetail} from '@components'

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
        component = (<SupplierDetails />)
        break
      case '/Vendor/Suppliers':
        component = (<VendorList />)
        break
      case '/Vendor/Orders':
        component = (<OrderList />)
        break
      case '/Sales':
        component = (<SaleList />)
        break
      case '/Accounting/Payable':
        component = (<PayableList />)
      break
      case '/Accounting/Receivable':
        component = (<ReceivableList />)
        break
      case '/Settings':
        component = (<SettingPage />)
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
