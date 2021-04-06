import React from 'react'
import {Button} from 'antd'
import {logOut} from 'services/setting'

type SettingPagePropType = {
    routeToPage: (url: string) => void
}

const SettingPage = ({
    routeToPage
}: SettingPagePropType) => (
  <Button
    shape='round'
    type='primary'
    onClick={() => {
      logOut()
      routeToPage('/login')
    }}>
    Log Out
  </Button>
)

SettingPage.displayName = 'SettingPage'
export default SettingPage
