import React from 'react'
import {PageHeader, Card, Row, Col, Divider} from 'antd'
import {Link} from 'react-router-dom'

const WelcomePage = () => (
  <>
    <PageHeader
      className='site-page-header'
      title='Welcome to Cycl.io' />

    <Divider>Overview</Divider>

    <Row justify='space-around'>
      <Col span={8}>
        <Card hoverable title='Inventory Overview' style={{width: 400}}>
          <p>Preview of inventory</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card hoverable title='Placeholder Overview' style={{width: 400}}>
          <p>Preview of inventory</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card hoverable title='Placeholder 2 Overview' style={{width: 400}}>
          <p>Preview of inventory</p>
        </Card>
      </Col>
    </Row>
  </>
)

WelcomePage.displayName = 'WelcomePage'
export default WelcomePage