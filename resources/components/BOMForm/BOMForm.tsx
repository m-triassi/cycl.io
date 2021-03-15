import React,{useState, useEffect} from 'react'
import {InputNumber, Button, Empty, Table, Row, Col, Select, Typography} from 'antd'
import {InventoryItemStateType} from 'models/inventory'
import {BomMaterialStateType} from 'models/bom-material'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import {DeleteButton} from '@components'
import {DeleteOutlined} from '@ant-design/icons'
import {getBomMaterial} from 'services/bom-material'


type BOMFormPropType = {
    // BOM: any,
    // onEdit: (payload: any) => void,
    // onAdd: (payload: any) => void,
    // onSearch: (payload: any) => void,
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryItem: InventoryItemStateType,
    BomMaterial: BomMaterialStateType,
    inventoryId: number,
}

const BOMForm = (
     {
     // BOM,
     // onEdit,
     // onAdd,
     // onSearch,
     dispatch,
     InventoryItem,
     BomMaterial,
     inventoryId
 }:BOMFormPropType
)  => {
    const {table} = BomMaterial
    const {Title} = Typography
    const [isEdit, setEdit] = useState<boolean>(false)
    const changeFormData = (key: string, value: any) => dispatch({type: 'BOM_MATERIAL_CHANGE_FORM_DATA', payload: {key, value}})
    // const resetState = () => dispatch({type: 'RESET_BOM_FORM_STATE'})

    const onConfirm = () => {
      dispatch({type: 'ADD_BOM'})
      // resetState()
    }
    function onChange(value: any) {
      changeFormData('material_ids',[value])
      changeFormData('assembly_id',inventoryId)
    }

    const actionRow = (<Row gutter={{xs: 4, sm: 8, md: 16, lg: 24}}>
      <Col span={6}>
        {isEdit && <Button onClick={() => {setEdit(false)}}>Cancel</Button>}
      </Col>
      <Col span={6}>
        {isEdit && <Button type='primary' onClick={() => {onConfirm()}}>Confirm</Button>}
      </Col>
    </Row>)

    const {Option} = Select

    const columns = [
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: 20,
            render: (num: number) => isEdit?<InputNumber min={1} max={999} defaultValue={num} onChange={onChange} />: `${num}`
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
        },
        {
          title: 'Action',
          key: 'action',
          render: (text: any, record: any) => {
            const onDelete = ()=>{
            }
            return (
              isEdit? <DeleteButton type='BOM' onDelete={onDelete} />: <DeleteOutlined style={{color: 'grey', fontSize: 22}} />
          )},
      },
    ]
    return (
      <>
        <Row gutter={[0,8]}>
          <Col span={8}>
            <Title level={5}>Bill Of Material</Title>
          </Col>
          <Col span={8}>
            {!isEdit && <Button shape='round' type='primary' onClick={() => {setEdit(true)}}>Edit</Button>}
          </Col>
        </Row>
        <Row gutter={[0,8]}>
          <Col span={8}>
            { isEdit? <Select
              showSearch
              style={{width: 200, marginBottom: 20}}
              placeholder='Select Item'
              optionFilterProp='children'
              onChange={onChange}
              filterOption={(input, option) =>
                option?option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0: false}>
              {
                InventoryItem.table.map((item: { id:number, title: string })=>
                  <Option value={item.id}>{item.title}</Option>
                )
              }
            </Select>:null}
          </Col>
        </Row>
        <Row gutter={[0,24]}>
          <Col span={24}>
            {table.length > 0 ? <Table columns={columns} dataSource={table} pagination={false} size='small' />  : <Empty />}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {actionRow}
          </Col>
        </Row>
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  InventoryItem: state.InventoryItem,
  BomMaterial: state.BomMaterial,

})

BOMForm.displayName = 'BOMForm'
export default connect(mapStateToProps)(BOMForm)
