import {
Card, Layout, Menu, Row,
} from 'antd'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import SVG from 'react-inlinesvg'
import {Link, useLocation} from 'react-router-dom'
import {AppContent} from '@components'
import appModules from 'appModules.json'
import {RouterStateType} from 'models/router'
import {StoreType, DispatchArgumentType} from '@types'
import logo from '@public/img/logo.svg'
import './BasicLayout.css'

type BasicLayoutPropType = {
  dispatch: (arg: DispatchArgumentType) => void,
  router: RouterStateType
}

type ModuleDataType = {
  name: string,
  subModules?: ModuleDataType[],
  url: string
}

const BasicLayout = ({
  dispatch,
  router,
}: BasicLayoutPropType) => {
    const {Content, Sider} = Layout
    const {Item, SubMenu} = Menu
    const {route} = router
    const location = useLocation()

    useEffect(() => {
      if (route !== location.pathname) {
        dispatch({type: 'CHANGE_ROUTE', payload: location.pathname})
      }
    }, [location])

    return (
      <Layout>
        <Sider
          theme='light'
          className='Sider'>
          <Row justify='center' className='Logo'>
            <Link onClick={() => dispatch({type: 'CHANGE_ROUTE', payload: '/'})} to='/'>
              <SVG src={logo} width={100} height={60} />
            </Link>
          </Row>
          <Menu selectedKeys={[route]} onClick={(item) => dispatch({type: 'CHANGE_ROUTE', payload: item.key})} mode='inline'>
            {appModules.modules.map((module: ModuleDataType) => {
              if (module.subModules) {
                return (
                  <SubMenu title={module.name}>
                    {module.subModules.map((subModule: ModuleDataType) => (
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
        <Content className='Content'>
          <Card className='ContentCard'>
            <AppContent router={router} />
          </Card>
        </Content>
      </Layout>
    )
}

const mapStateToProps = (state: StoreType) => ({
  router: state.router,
})

BasicLayout.displayName = 'BasicLayout'
export default connect(mapStateToProps)(BasicLayout)
