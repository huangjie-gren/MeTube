import request from '@/utils/request'

export function upload(data) {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/video/add',
    method: 'post',
    data
  })
}
export function uploadoss(data) {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/upload/token',
    method: 'post',
    data
  })
}
export function getVideos() {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/videos',
    method: 'get'
  })
}
