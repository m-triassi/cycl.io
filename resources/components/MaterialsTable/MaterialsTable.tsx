import React from 'react'
import {InputNumber, Empty, Table, Row, Col, Select} from 'antd'
import {InventoryItemStateType} from 'models/inventory'
import {StoreType} from '@types'
import {connect} from 'react-redux'
import {DeleteButton} from '@components'

type MaterialsTablePropType = {
    InventoryItem: InventoryItemStateType,
    table: any,
    form:any,
    onChange: (value: any) => void,
    onChangeQuantity:(itemId: number, value: any) => void,
    onDelete: (value: any, index: number, price: number) => void,
    selected: string,
    setSelected: (value: any) => void
}
const MaterialsTable = ({
     InventoryItem,
     table,
     form,
     onChange,
     onChangeQuantity,
     onDelete,
     selected,
     setSelected
 }:MaterialsTablePropType
)  => {

    const {Option} = Select

    const onSelected= (value:any)=>{
      onChange(value)
      setSelected(value)
    }
    const columns = [
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: ['pivot','quantity'],
            width: 20,
            render: (num: number, record: any) => <InputNumber min={1} max={999} value={record.pivot.quantity} onChange={(e)=>{onChangeQuantity(record.id,e)}} />
        },
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Price',
            key: 'sale_price',
            dataIndex: 'sale_price',
        },
        {
            title: 'Supplier',
            key: 'supplier_name',
            dataIndex: ['supplier', 'name']
        },
        {
          title: 'Action',
          key: 'action',
          render: (text: any, record: any) => {
            const onDeleteRecord = ()=>{
              const index = form.item_ids.findIndex((x: { invetory_item_id: number }) => x.invetory_item_id ===record.id)
              onDelete(record.id, index, record.sale_price)
            }
            return (
              <DeleteButton type='Sale' onDelete={onDeleteRecord} />
          )},
      },
    ]
    return (
      <>
        <Row gutter={[0,8]}>
          <Col span={8}>
            <Select
              showSearch
              style={{width: 200, marginBottom: 20}}
              placeholder='Select Item'
              optionFilterProp='children'
              onChange={onSelected}
              value={selected}
              filterOption={(input, option) =>
                option?option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0: false}>
              {
                InventoryItem.table.map((item: any)=>
                  <Option value={item.id}>{item.title}</Option>
                )
              }
            </Select>
          </Col>
        </Row>
        <Row gutter={[0,24]}>
          <Col span={24}>
            {table.length > 0 ? <Table columns={columns} dataSource={table} pagination={false} size='small' />  : <Empty />}
          </Col>
        </Row>
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  InventoryItem: state.InventoryItem,

})

MaterialsTable.displayName = 'MaterialsTable'
export default connect(mapStateToProps)(MaterialsTable)
