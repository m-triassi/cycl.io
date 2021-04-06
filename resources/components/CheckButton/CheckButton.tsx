import {Row, Typography, Modal} from 'antd'
import React from 'react'
import {CheckOutlined, ExclamationCircleOutlined} from '@ant-design/icons'

type CheckButtonPropType = {
  onCheck: () => void,
  type: string
}

const CheckButton = ({
  onCheck,
  type
}: CheckButtonPropType) => {
    const [modal,contextHolder] = Modal.useModal()

    const checkItemModal = () => {
        modal.confirm({
        title: `Confirm ${type} Item`,
        icon: <ExclamationCircleOutlined />,
        okText: 'Confirm',
        cancelText: 'Cancel',
        content: (
          <Typography.Text>
            <Row>This item will be confirmed.</Row>
            <Row><Typography.Text strong>Are you sure you want to confirm this item?</Typography.Text></Row>
          </Typography.Text>
        ),
        onOk: () => onCheck()
      })
      }

    return (
      <>
        {contextHolder}
        <CheckOutlined style={{color: '#619b8a', fontSize: 22}} onClick={() => {checkItemModal()}} />
      </>
    )
}

CheckButton.displayName = 'CheckButton'
export default CheckButton