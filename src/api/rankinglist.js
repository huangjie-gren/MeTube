import request from '@/utils/request'

export function getVideoInfo(data) {
  return request({
    url: 'http://1901210360.zhangqx.com/api/getvideoinfo',
    method: 'get'
  })
}
