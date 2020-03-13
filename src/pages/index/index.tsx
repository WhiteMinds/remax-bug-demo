import React, { useContext } from 'react'
import { View } from 'remax/wechat'
import { AppContext } from '@/app'

export default () => {
  const { bindStatus } = useContext(AppContext)

  return (
    <View>
      {bindStatus ? 'bind' : 'unbind'}
    </View>
  )
}
