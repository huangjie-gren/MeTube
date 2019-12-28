import request from '@/utils/request'
/* eslint-disable */
const preUrl = 'http://49.233.170.51:8080'

export function showFollowings(id) {
  return request({
    url: preUrl + '/showFollowings',
    method: 'get',
    params: { id }
  })
}

export function showFollowers(id) {
  return request({
    url: preUrl + '/showFollowers',
    method: 'get',
    params: { id }
  })
}

export function unfollow(uid1, uid2) {
  return request({
    url: preUrl + '/unfollow',
    method: 'get',
    params: { uid1, uid2 }
  })
}