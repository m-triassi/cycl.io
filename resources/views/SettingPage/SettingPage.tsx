import React from 'react'
import {Button} from 'antd'
import {logOut} from '@services/setting'

const SettingPage = () => (
  <Button
    shape='round'
    type='primary'
    onClick={() => {
      logOut()
      window.location.reload()
    }}>
    Log Out
  </Button>
)

SettingPage.displayName = 'SettingPage'
export default SettingPage
