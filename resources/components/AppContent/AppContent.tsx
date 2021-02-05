import React from 'react'
// import InventoryList from '../index'
// import BOMList from '../index'
// import VendorList from '../index'
// import SalesList from '../index'
// import AccountingList from '../index'

type AppContentPropType = {}

// this component will be the front end "router", based on url or redux state (TBD), it will render a specific view

const AppContent = (props: AppContentPropType) => {
    console.log(props)
    return (
      <h1>welcome to Cycl.io</h1>
    )
}

AppContent.displayName = 'AppContent'
export default AppContent
