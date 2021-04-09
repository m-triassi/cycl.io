import React from 'react'
import {PageHeader, Card, Row, Col, Divider, Typography} from 'antd'

type WelcomePagePropType = {
  routeToPage: (url: string) => void
}

const WelcomePage = ({
  routeToPage,
}: WelcomePagePropType) => {
  const {Text} = Typography

  return (
    <>
      <PageHeader title='Welcome to Cycl.io' />
      <Divider>Overview</Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Card onClick={() => routeToPage('/Production/Inventory')} hoverable title='Inventories Overview'>
            <Text>Preview of inventories</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card onClick={() => routeToPage('/Vendor/Suppliers')} hoverable title='Suppliers Overview'>
            <Text>Preview of suppliers</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card onClick={() => routeToPage('/Vendor/Orders')} hoverable title='Orders Overview'>
            <Text>Preview of orders</Text>
          </Card>
        </Col>
      </Row>
    </>
)}

WelcomePage.displayName = 'WelcomePage'
export default WelcomePage