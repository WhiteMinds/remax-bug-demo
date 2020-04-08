import React, { useCallback } from 'react'
import { Button, View, chooseImage, navigateTo } from 'remax/wechat'

export default () => {
  const handler = useCallback(async () => {
    let res = await chooseImage({
      sourceType: ['album'],
    })
    let filePathList = res.tempFiles.map(o => o.path)

    navigateTo({
      url: `/pages/collect-upload-local/index?data=${encodeURIComponent(JSON.stringify(filePathList))}`,
    })
  }, [])

  return (
    <View>
      <Button onClick={handler}>Choose Image</Button>
    </View>
  )
}
