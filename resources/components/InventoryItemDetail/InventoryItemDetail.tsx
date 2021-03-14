import {Row, Col} from 'antd'
import React from 'react'
import './styleSheet.css'
import {DescriptionItem} from '@components'

type InventoryItemDetailPropType = {
  data: any
}

const InventoryItemDetail = ({
  data
}: InventoryItemDetailPropType ) => (
  <>
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
        <DescriptionItem title='Size' content={data?data.size:''}  />
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <DescriptionItem title='Color' content={data?data.color:''}  />
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <DescriptionItem title='Finish' content={data?data.finish:''}  />
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <DescriptionItem title='Material' content={data?data.material:''}  />
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <DescriptionItem title='Provider' content={data?data.Provider:''} />
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <DescriptionItem title='Cost' content={`$ ${data.cost}`} />
      </Col>
    </Row>
  </>
    )

InventoryItemDetail.displayName = 'InventoryItemDetail'
export default InventoryItemDetail