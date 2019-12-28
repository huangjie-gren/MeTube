import request from '@/utils/request'

export function upload(data) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/video/add',
    method: 'post',
    data
  })
}
export function uploadoss(data) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/upload/token',
    method: 'post',
    data
  })
}
export function getVideos() {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/videos',
    method: 'get'
  })
}
export function getVideo(videoid) {
  return request({
    // url: 'http://1901210759.zhangqx.com/api/v1/user/login',
    url: 'http://114.115.178.1:8081/getvideo/' + videoid,
    method: 'get'
  })
}
