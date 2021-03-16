import {Row, Table, Typography} from 'antd'
import React, {useEffect} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import {InventoryItemStateType} from 'models/inventory'
import {getInventory} from 'services/inventory'
import {getVendor} from 'services/vendor'
import pathToRegexp from 'path-to-regexp'


type SupplierDetailsPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryItem: InventoryItemStateType
}

const SupplierDetails = ({
  dispatch,
  InventoryItem,
}: SupplierDetailsPropType) => {
    const {table} = InventoryItem
    const regexp = pathToRegexp('/Vendor/Suppliers/(\\d+)')
    const stringID = regexp.exec(window.location.pathname)
    const currentSupplierID = parseInt(stringID[1], 10)
    let currentSupplierName = 'Unknown'
    const filterInventoryBySupplierID = (item: any) => item.supplier_id === currentSupplierID
    const filterVendorBySupplierID = (item: any) => item.id === currentSupplierID
    const fetchSupplierName = () => {
      getVendor().then((response: any) => {
        const {data} = response
        if (data.success) {
          currentSupplierName = data.data.filter(filterVendorBySupplierID)[0].name
        }
      })
    }

    const fetchInventoryList = () => {
      getInventory().then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_INVENTORY_ITEMS', payload: data.data.filter(filterInventoryBySupplierID)})
        }
      })
    }

    useEffect(() => {
      fetchSupplierName()
      fetchInventoryList()
    }, [])

    const columns = [
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

    return (
      <>
        <Row>
          <Typography.Title>
            Vendor Details -
            {' '}
            {currentSupplierName}
          </Typography.Title>
        </Row>
        <Table bordered columns={columns} dataSource={table} pagination={{position: ['bottomCenter']}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  InventoryItem: state.InventoryItem,
})

SupplierDetails.displayName = 'SupplierDetails'
export default connect(mapStateToProps)(SupplierDetails)
