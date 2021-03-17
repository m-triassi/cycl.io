import React,{useState} from 'react'
import {InputNumber, Button, Empty, Table, Row, Col, Select, Typography} from 'antd'
import {InventoryItemStateType} from 'models/inventory'
import {BomMaterialStateType} from 'models/bom-material'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'
import {DeleteButton} from '@components'
import {DeleteOutlined} from '@ant-design/icons'

type BOMFormPropType = {
    dispatch: (arg: DispatchArgumentType) => void,
    InventoryItem: InventoryItemStateType,
    BomMaterial: BomMaterialStateType,
    inventoryId: number,
}

const BOMForm = (
     {
     dispatch,
     InventoryItem,
     BomMaterial,
     inventoryId
 }:BOMFormPropType
)  => {
    const {table, form} = BomMaterial
    const {Title} = Typography
    const [isEdit, setEdit] = useState<boolean>(false)
    const changeFormData = (key: string, value: any) => dispatch({type: 'BOM_MATERIAL_PUSH_FORM_DATA', payload: {key, value}})
    const changeFormQuantity = (key: number, value: any) => dispatch({type: 'BOM_MATERIAL_CHANGE_FORM_QUANTITY', payload: {key, value}})
    const deleteBom = (key: number) => dispatch({type: 'DELETE_BOM', payload: key})
    const resetState = () => dispatch({type: 'RESET_BOM_STATE'})

    const onConfirm = () => {
      dispatch({type: 'ADD_BOM'})
      resetState()
      setEdit(false)
    }

    const onCancel = () => {
      resetState()
      dispatch({type: 'CANCEL_BOM'})
      dispatch({type: 'SET_BOM_ASSEMBLY_ID', payload: inventoryId})
      setEdit(false)
    }

     const onChange = (value: any) => {
      changeFormData('material_ids',value)
      changeFormData('quantities', 1)
      const tempValue={...InventoryItem.table.find((element: any) => element.id===value), ...{'pivot': {'assembly_id': inventoryId,'material_id': value, 'quantity': 1}}}
      const temp=[...table]
      temp.push(tempValue)
      dispatch({type: 'SET_BOM_ITEMS', payload: temp})

    }

    const onChangeQuantity = (quantity: any, itemId: any) =>{
      const indexQ = form.material_ids.indexOf(itemId)
      changeFormQuantity(indexQ, quantity)
       let newTable=[...table]
       newTable=newTable.map((item: any) => {
         if (item.id===itemId){
           return {
             'id': item.id,
             'cost': item.cost,
             'supplier_id': item.supplier_id,
             'title': item.title,
             'pivot': {'assembly_id': inventoryId,'material_id': item.id, 'quantity': quantity}} } return item})
         dispatch({type: 'SET_BOM_ITEMS', payload: newTable})
    }

    const actionRow = (<Row gutter={{xs: 4, sm: 8, md: 16, lg: 24}}>
      <Col span={6}>
        {isEdit && <Button onClick={() => {onCancel()}}>Cancel</Button>}
      </Col>
      <Col span={6}>
        {isEdit && <Button type='primary' onClick={() => {onConfirm()}}>Confirm</Button>}
      </Col>
    </Row>)

    const {Option} = Select

    const columns = [
        {
            title: 'Quantity',
            dataIndex: ['pivot','quantity'],
            width: 20,
            render: (num: number, record: any) => isEdit?<InputNumber min={1} max={999} value={record.pivot.quantity} onChange={(e)=>{onChangeQuantity(e, record.id)}} />: `${num}`
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
              dispatch({type: 'SET_BOM_ITEMS', payload: table.filter((item: { id: any }) => item.id!==record.id)})
              const index = form.material_ids.indexOf(record.id)
              deleteBom(index)
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
                InventoryItem.table.map((item: any)=>
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
