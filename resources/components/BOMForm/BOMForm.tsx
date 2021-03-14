import React,{useState} from 'react'
import {Card, Button, Empty, Table, Row, Col, Select} from 'antd'
import {InventoryItemStateType} from 'models/inventory'
import {StoreType} from '@types'
import {connect} from 'react-redux'
import Item from 'antd/lib/list/Item'


type BOMFormPropType = {
    // BOM: any,
    // onEdit: (payload: any) => void,
    // onAdd: (payload: any) => void,
    // onSearch: (payload: any) => void,
    InventoryItem: InventoryItemStateType
}


const BOMForm = (
     {
     // BOM,
     // onEdit,
     // onAdd,
     // onSearch,
     InventoryItem
 }:BOMFormPropType
)  => {
    const [isEdit, setEdit] = useState<boolean>(false)

    const actionRow = (<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
      <Col span={6}>
        {isEdit && <Button block shape='round' onClick={() => {setEdit(false)}}>Confirm</Button>}
      </Col>
      <Col span={6}>
        {isEdit && <Button block shape='round' onClick={() => {setEdit(false)}}>Cancel</Button>}
      </Col>
    </Row>)

    const actionSearch = (
        (isEdit )
    )

   const BOM = [
        {quantity: 1, title: 'idk', cost: 'idk', supplier: 'yes'},
        {quantity: 2, title: 'idk1', cost: 'idk1', supplier: 'yes1'},
    ]
    const {Option} = Select

    const columns = [
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: 20
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier',
        }
    ]
    function onChange(value: any) {
      console.log(InventoryItem)
    }

    function onSearch(val: any) {
      console.log(InventoryItem)
    }

    return (
      <Card title='Bill Of Material' actions={[actionRow]} extra={!isEdit && <Button block shape='round' onClick={() => {setEdit(true)}}>Edit</Button>} style={{padding: 30}}>
        {actionSearch}
        <Select
          showSearch
          style={{width: 200}}
          placeholder='Select Item'
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option?option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0: false}>
          {
            InventoryItem.table.map((item: { id:number, title: string })=>
              <Option value={item.id}>{item.title}</Option>
            )
          }
        </Select>
        {BOM.length > 0 ? <Table columns={columns} dataSource={BOM} pagination={false} size='small' />  : <Empty />}
      </Card>
    )
}

const mapStateToProps = (state: StoreType) => ({
  InventoryItem: state.InventoryItem,
})

BOMForm.displayName = 'BOMForm'
export default connect(mapStateToProps)(BOMForm)
