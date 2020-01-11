import request from '@/utils/request'
import { sjcURL, zjlURL } from '@/utils/const'

export function upload(data) {
  return request({
    url: zjlURL + '/api/v1/video/add',
    method: 'post',
    data
  })
}
export function deleteVideo(videoid) {
  return request({
    url: zjlURL + '/api/v1/video/delete?vid=' + videoid,
    method: 'get'
  })
}
export function uploadoss(data) {
  return request({
    url: zjlURL + '/api/v1/upload/token',
    method: 'post',
    data
  })
}
export function getVideos(start, limit) {
  return request({
    url: zjlURL + '/api/v1/videos?start=' + start + '&limit=' + limit,
    method: 'get'
  })
}
export function viewVideo(data) {
  return request({
    url: sjcURL + '/viewvideo',
    method: 'post',
    data
  })
}
export function getVideoComments(data) {
  return request({
    url: sjcURL + '/getvideocomments',
    method: 'post',
    data
  })
}
export function getVideoInfo(videoid) {
  return request({
    url: zjlURL + '/api/v1/video/info?vid=' + videoid,
    method: 'get'
  })
}
export function getMyVideo(uid) {
  return request({
    url: zjlURL + '/api/v1/video/getmy?uid=' + uid,
    method: 'get'
  })
}
export function updateVideo(data) {
  return request({
    url: zjlURL + '/api/v1/video/update',
    method: 'post',
    data
  })
}
export function getSearch(input) {
  return request({
    url: zjlURL + '/api/v1/video/search?input=' + input,
    method: 'get'
  })
}
export function addVideoComment(data) {
  return request({
    url: sjcURL + '/comment',
    method: 'post',
    data
  })
}
export function addReply(data) {
  return request({
    url: sjcURL + '/reply',
    method: 'post',
    data
  })
}
export function getVideo(video_id) {
  return request({
    url: sjcURL + '/getvideo/' + video_id,
    method: 'get'
  })
}
export function replyLike(data) {
  return request({
    url: sjcURL + '/replylike',
    method: 'post',
    data
  })
}
export function commentLike(data) {
  return request({
    url: sjcURL + '/commentlike',
    method: 'post',
    data
  })
}
export function removeAComment(data) {
  return request({
    url: sjcURL + '/removecomment',
    method: 'post',
    data
  })
}
export function removeAReply(data) {
  return request({
    url: sjcURL + '/removereply',
    method: 'post',
    data
  })
}
export function getReplies(data) {
  return request({
    url: sjcURL + '/getreplies',
    method: 'post',
    data
  })
}
