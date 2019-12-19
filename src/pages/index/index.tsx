import * as React from 'react'
import { View, Text } from 'remax/wechat'
import styles from './index.module.css'

export default () => {
  return (
    <View className={styles.app}
          style={{
            '---color1': 'red',
            '--color2': 'blue'
          }}>
      <Text className={styles.color1}>Color1</Text>
      <Text className={styles.color2}>Color2</Text>
    </View>
  )
}
