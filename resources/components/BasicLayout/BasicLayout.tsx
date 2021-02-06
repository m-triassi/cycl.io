import {
Card, Layout, Menu, Row,
} from 'antd'
import React from 'react'
import {connect} from 'react-redux'
import SVG from 'react-inlinesvg'
import {Link} from 'react-router-dom'
import appModules from '../../appModules.json'
import logo from '../../../public/img/logo.svg'
import {AppContent} from '../index'

const BasicLayout = ({
  dispatch,
  router,
}: any) => {
    const {Content, Sider} = Layout
    const {Item, SubMenu} = Menu
    return (
      <Layout>
        <Sider
          theme='light'
          style={{height: '100vh'}}>
          <Row justify='center' style={{minHeight: 60, minWidth: 200}}>
            <Link onClick={() => dispatch({type: 'CHANGE_ROUTE', payload: '/'})} to='/'>
              <SVG src={logo} width={100} height={60} />
            </Link>
          </Row>
          <Menu onClick={(item) => dispatch({type: 'CHANGE_ROUTE', payload: item.key})} mode='inline'>
            {appModules.modules.map((module: any) => {
              if (module.subModules) {
                return (
                  <SubMenu title={module.name}>
                    {module.subModules.map((subModule: any) => (
                      <Item key={subModule.url}>
                        <Link to={subModule.url}>{subModule.name}</Link>
                      </Item>
                    ))}
                  </SubMenu>
                )
              }
              return (
                <Item key={module.url}>
                  <Link to={module.url}>{module.name}</Link>
                </Item>
              )
            })}
          </Menu>
        </Sider>
        <Content style={{margin: '0 16px'}}>
          <Card style={{marginTop: '16px', minHeight: '90vh'}}>
            <AppContent router={router} />
          </Card>
        </Content>
      </Layout>
    )
}

const mapStateToProps = (state: any) => ({
  router: state.router,
})

BasicLayout.displayName = 'BasicLayout'
export default connect(mapStateToProps)(BasicLayout)
