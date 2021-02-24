import {Row, Typography, Modal, message} from 'antd'
import React from 'react'
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import {StoreType, DispatchArgumentType} from '@types'
import {connect} from 'react-redux'

type DeleteButtonPropType = {
  dispatch: (arg: DispatchArgumentType) => void,
  record: any,
  refreshItems: Function,
  type: string
}

type ModuleDataType = {
  name: string,
  subModules?: ModuleDataType[],
  url: string
}

const DeleteButton = ({
  dispatch,
  record,
  refreshItems: fetchInventoryList,
  type
}: DeleteButtonPropType) => {
    const [modal,contextHolder] = Modal.useModal()
    const onDelete = (value: any) => {
        switch (type) {
            case 'Inventory':{
              dispatch({type: 'DELETE_INVENTORY', payload: value})
              fetchInventoryList()
              break
            }
            default:
                message.error('Failed to delete')
          }
    }
    const deleteItemModal = (selectedItem: any) => {
        modal.confirm({
        title: `Delete ${type} Item`,
        icon: <ExclamationCircleOutlined />,
        okText: 'Delete',
        cancelText: 'Cancel',
        content: (
          <Typography.Text>
            <Row>This item will be permanantly deleted.</Row>
            <Row><Typography.Text strong>Are you sure you want to delete this item?</Typography.Text></Row>
          </Typography.Text>
        ),
        onOk() {
          onDelete(selectedItem.id)
        }
      })
      }

    return (
      <>
        {contextHolder}
        <DeleteOutlined style={{color: '#fe7f2d', fontSize: 22}} onClick={() => {deleteItemModal(record)}} />
      </>
    )
}

const mapStateToProps = (state: StoreType) => ({
  router: state.router,
})

DeleteButton.displayName = 'DeleteButton'
export default connect(mapStateToProps)(DeleteButton)