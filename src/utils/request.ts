const noMessageUrlList = ['/api/v1/airdrop/submit']

const req = async (url = '', data: any = {}, type = 'GET') => {
  const BASE_URL = window.config.BASE_URL
  type = type.toUpperCase()
  let fullUrl = BASE_URL + url

  if (type == 'GET') {
    let dataStr = ''
    Object.keys(data).forEach((key) => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.slice(0, dataStr.lastIndexOf('&'))
      fullUrl = fullUrl + '?' + dataStr
    }
  }
  const requestConfig: RequestInit = {
    credentials: 'same-origin',
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }

  if (type == 'POST') {
    Object.defineProperty(requestConfig, 'body', {
      value: JSON.stringify(data)
    })
  }
  try {
    const response = await fetch(fullUrl, requestConfig)
    const responseJson = await response.json()
    if (!noMessageUrlList.includes(url) && responseJson.code !== 0) {
      // @ts-ignore
      ElMessage({
        message: responseJson.msg,
        type: 'warning'
      })
    }
    return responseJson
  } catch (error) {
    console.log('🚀 ~ file: request.ts:37 ~ error:', error)
  }
}

export default {
  async get(url: string, data?: any) {
    return await req(url, data, 'GET')
  },

  async post(url: string, data?: any) {
    return await req(url, data, 'POST')
  }
}

export interface CResponse<T> {
  code: number
  data: T
  msg: string
}
