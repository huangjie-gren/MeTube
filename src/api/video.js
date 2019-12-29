import request from '@/utils/request'

export function upload(data) {
  return request({
    // url: 'http://127.0.0.1:3000/api/v1/video/add',
    url: 'http://123.56.96.92:3001/api/v1/video/add',
    method: 'post',
    data
  })
}
export function uploadoss(data) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/upload/token',
    // url: 'http://127.0.0.1:3000/api/v1/upload/token',
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
    // url: 'http://114.115.178.1:8081/getvideo/' + videoid,
    url: 'http://localhost:8081/getvideo/' + videoid,
    method: 'get'
  })
}
export function getVideoInfo(videoid) {
  return request({
    url: 'http://127.0.0.1:3001/api/v1/video/info?vid=' + videoid,
    method: 'get'
  })
}
