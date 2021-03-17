import {Row, Table, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import {InventoryItemStateType} from 'models/inventory'
import {filterInventoryWithParams} from 'services/inventory'
import {filterVendorWithParams} from 'services/vendor'
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
    const [currentSupplierName, setCurrentSupplierName] = useState('')
    let currentSupplierID = ''
    const regexp = pathToRegexp('/Vendor/Suppliers/(\\d+)')
    const stringID = regexp.exec(window.location.pathname)
    if (stringID !== null){
      currentSupplierID = stringID[1]
    }

    const fetchSupplierFilteredInventoryList = () => {
      filterInventoryWithParams({'supplier_id': currentSupplierID}).then((response: any) => {
        const {data} = response
        if (data.success) {
          dispatch({type: 'SET_INVENTORY_ITEMS', payload: data.data})
        }
      })
    }

    const fetchSupplierName = () => {
      filterVendorWithParams({'id': currentSupplierID}).then((response: any) => {
        const {data} = response
        if (data.success) {
          console.log(data.data[0])
          setCurrentSupplierName(data.data[0].name)
        }
      })
    }

    useEffect(() => {
      fetchSupplierName()
      fetchSupplierFilteredInventoryList()
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
        <Table bordered columns={inventoryColumns} dataSource={table} pagination={{position: ['bottomCenter']}} scroll={{x: 'max-content'}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  InventoryItem: state.InventoryItem,
})

SupplierDetails.displayName = 'SupplierDetails'
export default connect(mapStateToProps)(SupplierDetails)
