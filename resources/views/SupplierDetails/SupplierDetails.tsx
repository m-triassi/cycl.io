import {Row, Table, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import {InventoryItemStateType} from 'models/inventory'
import {OrderListStateType} from 'models/order-list'
import {filterInventoryWithParams} from 'services/inventory'
import {getVendorByID, filterVendorWithParams} from 'services/vendor'
import {filterPurchaseOrder} from 'services/order'
import {pathToRegexp} from 'path-to-regexp'



type SupplierDetailsPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryItem: InventoryItemStateType,
    OrderList: OrderListStateType
}

const SupplierDetails = ({
  dispatch,
  InventoryItem,
  OrderList,
}: SupplierDetailsPropType) => {
    const {table: inventoryTable} = InventoryItem
    const {table: ordersTable} = OrderList
    const [currentSupplierName, setCurrentSupplierName] = useState('')
    let currentSupplierID = -1
    const regexp = pathToRegexp('/Vendor/Suppliers/(\\d+)')
    const stringID = regexp.exec(window.location.pathname)
    if (stringID !== null){
      currentSupplierID = Number(stringID[1])
    }

    const fetchSupplierName = () => {
      getVendorByID(currentSupplierID).then((response: any) => {
        const {data} = response
        if (data.success) {
          setCurrentSupplierName(data.data.name)
        }
        else {
          setCurrentSupplierName('Supplier Not Found')
        }
      })
    }

    const fetchSupplierFilteredInventoryList = () => {
      filterInventoryWithParams({'supplier_id': currentSupplierID}).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_INVENTORY_ITEMS', payload: data.data})
        }
      })
    }

    const fetchSupplierFilteredOrderList = () => {
      filterPurchaseOrder({supplier_id: currentSupplierID}).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_ORDER_LIST', payload: data.data})
        }
      })
    }

    useEffect(() => {
      fetchSupplierName()
      fetchSupplierFilteredInventoryList()
      fetchSupplierFilteredOrderList()
    }, [])

    const inventoryColumns = [
      {
          title: 'Title',
          key: 'title',
          dataIndex: 'title',
          render: (text: string) => (
            <Typography.Text strong>{text}</Typography.Text>
          )
      },
      {
          title: 'Category',
          key: 'category',
          dataIndex: 'category'
      },
      {
          title: 'Size',
          key: 'size',
          dataIndex: 'size'
      },
      {
          title: 'Stock',
          key: 'stock',
          dataIndex: 'stock',
      },
      {
        title: 'Cost',
        key: 'cost',
        dataIndex: 'cost',
        render: (text: any) => `$${text}`
      },
      {
          title: 'Sale price',
          key: 'sale_price',
          dataIndex: 'sale_price',
          render: (text: any) => `$${text}`
      }
    ]

    const purchaseOrderColumns = [
      {
          title: 'Order ID',
          key: 'id',
          dataIndex: 'id',
          render: (text: number) => (
            <Typography.Text strong>{text}</Typography.Text>
          )
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (text: any) => `${text}`
    },
    {
        title: 'Delivery Date',
        key: 'delivery_date',
        dataIndex: 'delivery_date',
        render: (text: any) => `${text}`
    },
  ]

    return (
      <>
        <Row>
          <Typography.Title>
            Vendor Details -
            {' '}
            {currentSupplierName}
          </Typography.Title>
        </Row>
        <Row>
          <Typography.Title level={2}>
            Inventory Items
          </Typography.Title>
        </Row>
        <Table bordered columns={inventoryColumns} dataSource={inventoryTable} pagination={{position: ['bottomCenter'], pageSize: 4}} scroll={{x: 'max-content'}} />
        <Row>
          <Typography.Title level={2}>
            Purchase Orders
          </Typography.Title>
        </Row>
        <Table bordered columns={purchaseOrderColumns} dataSource={ordersTable} pagination={{position: ['bottomCenter'], pageSize: 4}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  InventoryItem: state.InventoryItem,
  OrderList: state.OrderList,
})

SupplierDetails.displayName = 'SupplierDetails'
export default connect(mapStateToProps)(SupplierDetails)
