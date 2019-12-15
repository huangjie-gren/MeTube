import request from '@/utils/request'

export function getVedioInfo(data) {
  return request({
    url: 'http://1901210360.zhangqx.com/api/getvedioinfo',
    method: 'get'
  })
}
