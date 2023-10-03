<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: DEMO
  icon: mdi:desktop-tower-monitor
  layout: default
  isAuth: false
  isShow: true
  sort: 0
</route>

<template>
  <PageContainer>
    <div>demo</div>
    <el-button @click="onClick">url</el-button>
  </PageContainer>
</template>

<script setup lang="ts">
import { MD5 } from 'crypto-js'
import axios from 'axios'
import dayjs from 'dayjs'
const host = 'ai'
// const md5
const sign = MD5(`xcsz-xhjg${dayjs().format('YYYY-MM-DD')}`).toString()
const url = `${host}/stream/chat?sign=${sign}`

const data = {
  messages: [{ role: 'user', content: '你好' }],
  user: '1',
}

function onClick() {
  console.log(url)

  useFetch()

  // axios
  //   .post(url, data, { responseType: 'text' })
  //   .then(res => {
  //     console.log(res)

  //     const strs = res.data.split('\n')
  //     let str = ''

  //     strs.forEach((item: string) => {
  //       if (item && item.startsWith('data: ')) {
  //         const json = JSON.parse(item.substring(6))
  //         console.log(json)
  //         str += json.result
  //       }
  //     })

  //     console.log(str)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })

  // const xhr = new XMLHttpRequest()
  // // xhr.responseType = 'blob'
  // xhr.onprogress = function (event) {
  //   console.log(xhr.response, event)
  // }
  // xhr.onreadystatechange = function () {
  //   console.log(xhr.response)
  //   // if (xhr.readyState === 4 && xhr.status === 200) {
  //   //   console.log(xhr.responseText)
  //   // }
  // }
  // xhr.onerror = function (error) {
  //   console.log(error)
  // }
  // xhr.open('post', url)
  // xhr.send(JSON.stringify(data))
}

async function useFetch() {
  // new Request()

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader()

  let organStr = ''
  let str = ''
  let conent = ''
  while (true) {
    const res = await reader?.read()

    if (res?.done) {
      // console.log(str)
      break
    }

    // console.log('Received', typeof res?.value, res?.value)
    organStr = organStr + res?.value
    str = str + res?.value

    const index = str.indexOf('\n')
    console.log(index)
    if (index > -1) {
      const current = str.substring(0, index)
      str = str.substring(index + 1)
      console.log(str)

      if (current && current.startsWith('data: ')) {
        const json = JSON.parse(current.substring(6))
        console.log(json)
      }
    }
  }
}
</script>
