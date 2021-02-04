import {Layout, Menu, Row} from 'antd'
import React from 'react'
import appModules from '../../appModules.json'

const BasicLayout = () => {
    const {Content, Sider} = Layout
    const {Item, SubMenu} = Menu
    return (
      <Layout>
        <Sider
          theme='light'
          style={{height: '100vh'}}>
          <Row>LOGO PLACEHOLDER</Row>
          <Menu mode='inline'>
            {appModules.modules.map((module: any) => {
              if (module.subModules) {
                return (
                  <SubMenu title={module.name}>
                    {module.subModules.map((subModule: any) => (
                      <Item>{subModule}</Item>
                    ))}
                  </SubMenu>
                )
              }
              return (
                <Item>{module.name}</Item>
              )
            })}
          </Menu>
        </Sider>
        <Content style={{margin: '0 16px'}}>
          <Row>Welcome to Cycl.io</Row>
        </Content>
      </Layout>
    )
}

BasicLayout.displayName = 'BasicLayout'
export default BasicLayout