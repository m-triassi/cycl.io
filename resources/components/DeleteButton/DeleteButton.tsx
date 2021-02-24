import {Row, Typography, Modal} from 'antd'
import React from 'react'
import {DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

type DeleteButtonPropType = {
  onDelete: () => void,
  type: string
}

const DeleteButton = ({
  onDelete,
  type
}: DeleteButtonPropType) => {
    const [modal,contextHolder] = Modal.useModal()

    const deleteItemModal = () => {
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
        onOk: () => onDelete()
      })
      }

    return (
      <>
        {contextHolder}
        <DeleteOutlined style={{color: '#fe7f2d', fontSize: 22}} onClick={() => {deleteItemModal()}} />
      </>
    )
}

DeleteButton.displayName = 'DeleteButton'
export default DeleteButton