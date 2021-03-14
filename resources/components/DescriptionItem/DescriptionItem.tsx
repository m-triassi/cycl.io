import {Typography} from 'antd'
import React from 'react'

type DescriptionItemPropType = {
  title: string,
  content: any
}

const DescriptionItem = ({
  title,
  content
}: DescriptionItemPropType) => {
  const {Text} = Typography
    return (
      <Text className='site-description-item-profile-wrapper'>
        <Typography.Text className='site-description-item-profile-p-label'>
          {title}
          :
        </Typography.Text>
        {content}
      </Text>
    )
}

DescriptionItem.displayName = 'DescriptionItem'
export default DescriptionItem