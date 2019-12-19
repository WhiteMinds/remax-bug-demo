import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { View, Button, createSelectorQuery } from 'remax/wechat'
import styles from './index.module.css'
import { createGuidGenerator } from '@/utils/common'
const guid = createGuidGenerator()

const Step1 = () => {
  const uniqueClass = useMemo(() => `step-${guid()}`, [])

  useEffect(() => {
    // 在mount时获取一次bounding
    getBounding(`.${uniqueClass}`)
      .then(res => console.log('res', res))
  }, [])

  return (
    <View className={uniqueClass}>Step1</View>
  )
}

const Step2 = () => {
  return (
    <View>Step2</View>
  )
}

export default () => {
  const steps = useMemo(() => [Step1, Step2], [])
  const [step, setStep] = useState(0)
  const [changing, setChanging] = useState(false)

  // 会导致bug的版本
  const next = useCallback(() => {
    if (changing) return
    setChanging(true)
    setStep(step + 1)
    setChanging(false)
  }, [step, setStep, changing, setChanging])

  // 无bug版本
  const next_ = useCallback(() => {
    setStep(step + 1)
  }, [step, setStep])

  const StepComponent = steps[step % steps.length]

  return (
    <View className={styles.app}>
      <StepComponent />
      <Button onClick={next}>Next (bug)</Button>
      <Button onClick={next_}>Next</Button>
    </View>
  )
}

/* 通过选择器获取指定元素的bounding */
function getBounding (selector: string) {
  return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>(resolve => {
    createSelectorQuery().select(selector)
      .boundingClientRect(resolve)
      .exec()
  })
}
