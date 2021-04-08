import React from 'react'
import {Button} from 'antd'
import {logOut} from '@services/setting'

const SettingPage = () => (
  <Button
    shape='round'
    type='primary'
    onClick={() => {
      logOut()
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }}>
    Log Out
  </Button>
)

SettingPage.displayName = 'SettingPage'
export default SettingPage
