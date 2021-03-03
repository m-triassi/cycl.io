import React,{useState} from 'react'
import {Card, Button, Empty, Table, Row, Col, Select} from 'antd'


type BOMFormPropType = {
    BOM: any,
    onEdit: (payload: any) => void,
    onAdd: (payload: any) => void,
    onSearch: (payload: any) => void
}


const BOMForm = (
//     {
//     BOM,
//     onEdit,
//     onAdd,
//     onSearch,
// }:any
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
        (isEdit && <Select mode='multiple' placeholder='Search' style={{width: '100%', paddingBottom: 20}} />)
    )

    const BOM = [
        {quantity: 1, title: 'idk', cost: 'idk', supplier: 'yes'},
        {quantity: 2, title: 'idk1', cost: 'idk1', supplier: 'yes1'},
    ]

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

    return (
      <Card title='Bill Of Material' actions={[actionRow]} extra={!isEdit && <Button block shape='round' onClick={() => {setEdit(true)}}>Edit</Button>} style={{padding: 30}}>
        {actionSearch}
        {BOM.length > 0 ? <Table columns={columns} dataSource={BOM} pagination={false} size='small' />  : <Empty />}
      </Card>
    )
}

BOMForm.displayName = 'BOMForm'
export default BOMForm
