import { StringUtil } from '@pefish/js-node-assist'

export const isPhoneFunc = () => {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent)
}

export const abbAddressText = (addr?: string, start = 6, end = 4) => {
  if (!addr) return ''
  return addr.slice(0, start) + '...' + addr.slice(-end)
}

export const validateEmail = (email: string) => {
  const reg = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/
  return reg.test(email)
}

export const toThousands = (num?: number | string) => {
  if (!num) return 0
  const res: string[] = []
  const splits = num.toString().split('.')
  splits[0]
    .split('')
    .reverse()
    .map(function (item, i) {
      if (i % 3 == 0 && i != 0) {
        res.push(',')
      }
      res.push(item)
    })
  return res.reverse().join('') + (splits.length > 1 ? '.' + splits[1] : '')
  // safari bug
  // return (num || 0).toString().replace(/(?<!\.\d*)\B((?=(\d{3})+(?!\d)))/, ',')
}

export const toFloor = (num: string | number, decimal: number = 4) => {
  if (num === '-') num = 0
  return StringUtil.start(num || 0)
    .shiftedBy(decimal)
    .remainDecimal(0)
    .unShiftedBy(decimal)
    .toString()
}

export const getDiffTime = (time: string) => {
  const utcTime = getUTCTime(time)
  const current = new Date().getTime()
  const diff = utcTime - current
  return diff
}

export const getUTCTime = (time: string) => {
  const t = new Date(time).getTime()
  const offset = new Date().getTimezoneOffset()
  return t - offset
}

export const getClipboardText = () => {
  return new Promise((resolve, reject) => {
    navigator.permissions
      .query({
        name: 'clipboard-read' as PermissionName
      })
      .then((result) => {
        if (result.state == 'granted' || result.state == 'prompt') {
          navigator.clipboard.readText().then((text) => {
            resolve(text)
          })
        } else {
          reject(new Error('no permissions'))
        }
      })
  })
}

export const strTo16 = (numStr: string | number): string => {
  if (typeof numStr === 'number') {
    numStr = numStr + ''
  }
  return '0x' + parseInt(numStr).toString(16)
}

export const validNumber = (val: string, max?: string | number) => {
  const res = val.match(/^\d*(\.?\d*)/g) ?? ['']
  let newNum: string | number = res[0]
  if (!newNum) return ''
  if (newNum.length > 1 && newNum.slice(0, 1) === '0' && newNum.slice(1, 2) !== '.') {
    // Remove leading 0
    newNum = newNum.slice(1)
  }
  if (newNum.length > 1 && newNum.slice(0, 1) === '.') {
    // Remove leading .
    newNum = newNum.slice(1)
  }
  if (newNum.slice(-1) === '.') {
    // Remove the tail .
    newNum = newNum.slice(0, -1)
  }
  if (max === undefined) {
    return newNum
  }
  const isExceedMax = StringUtil.start(newNum).gt(max)
  if (isExceedMax) newNum = max
  return newNum
}

export const chunkArray = (inputArray: any[], perChunk: number) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}
