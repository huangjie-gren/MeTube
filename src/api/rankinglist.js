import request from '@/utils/request'

export function getVideoInfo() {
  return request({
    url: 'http://114.115.149.142:8083/rankinglist',
    // url: 'http://localhost:8083/rankinglist',
    method: 'get'
  })
}
