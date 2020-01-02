import request from '@/utils/request'
import { wscURL } from '@/utils/const'

/* eslint-disable */

export function showFollowings(id) {
  return request({
    url: wscURL + '/showFollowings',
    method: 'get',
    params: { id }
  })
}

export function showFollowers(id) {
  return request({
    url: wscURL + '/showFollowers',
    method: 'get',
    params: { id }
  })
}

export function unfollow(uid1, uid2) {
  return request({
    url: wscURL + '/unfollow',
    method: 'get',
    params: { uid1, uid2 }
  })
}
