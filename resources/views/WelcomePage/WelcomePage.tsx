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
          <Card onClick={() => routeToPage('/Production/Inventory')} hoverable title='Inventory Overview'>
            <Text>Preview of inventory</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable title='Placeholder Overview'>
            <Text>Preview of placeholder</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable title='Placeholder 2 Overview'>
            <Text>Preview of placeholder</Text>
          </Card>
        </Col>
      </Row>
    </>
)}

WelcomePage.displayName = 'WelcomePage'
export default WelcomePage