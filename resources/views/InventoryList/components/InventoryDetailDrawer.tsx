import React from 'react'
import {Drawer, Typography, Button, Col, Row} from 'antd'
import '../styleSheet.css'
import {BOMForm, DescriptionItem} from '@components'
import {StoreType} from '@types'
import {connect} from 'react-redux'
import {InventoryDetailStateType} from 'models/inventory-detail'

type InventoryDetailDrawerPropType = {
    routeToPage: (url: string) => void,
    isVisible: boolean,
    setIsVisible: (payload: boolean) => void,
    InventoryDetail: InventoryDetailStateType
}

const InventoryDetailDrawer = ({
    routeToPage,
    isVisible,
    setIsVisible,
    InventoryDetail
}: InventoryDetailDrawerPropType) => {
    const {data} = InventoryDetail
    const {Text} = Typography
    return (
      <Drawer
        title={data?data.title:'Hi Inventory Item Detail'}
        width={450}
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        footer={
          <Text
            style={{
              textAlign: 'left',
            }}>
            <Button type='primary' onClick={() => routeToPage('/OrderForm')}>
              Order
            </Button>
          </Text>
        }>
        <Row>
          <Col span={16}>
            <DescriptionItem title='Description' content={data?data.description:''} />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <DescriptionItem title='Categoty' content={data?data.category:''}  />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <DescriptionItem title='Finish' content={data?data.finish:''}  />
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <DescriptionItem
              title='Material'
              content={data?data.material:''}  />
          </Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col span={16}>
            <DescriptionItem
              title='Provider'
              content='' />
          </Col>
        </Row>
        <BOMForm inventoryId={data?data.id:0} />
      </Drawer>
    )
}

const mapStateToProps = (state: StoreType) => ({
  InventoryDetail: state.InventoryDetail,
})

InventoryDetailDrawer.displayName = 'InventoryDetailDrawer'
export default connect(mapStateToProps)(InventoryDetailDrawer)
