import request from '@/utils/request'
import { wscURL } from '@/utils/const'

/* eslint-disable */
export function showFollowings(uid) {
  return request({
    url: wscURL + '/showFollowings',
    method: 'get',
    params: { uid }
  })
}

export function showFollowers(uid) {
  return request({
    url: wscURL + '/showFollowers',
    method: 'get',
    params: { uid }
  })
}

export function follow(uid1, uid2) {
  return request({
    url: wscURL + '/follow',
    method: 'get',
    params: { uid1, uid2 }
  })
}

export function unfollow(uid1, uid2) {
  return request({
    url: wscURL + '/unfollow',
    method: 'get',
    params: { uid1, uid2 }
  })
}

export function showActivity(uid) {
  return request({
    url: wscURL + '/showActivity',
    method: 'get',
    params: { uid }
  })
}

export function countFollowers(uid) {
  return request({
    url: wscURL + '/countFollowers',
    method: 'get',
    params: { uid }
  })
}

export function countFollowings(uid) {
  return request({
    url: wscURL + '/countFollowings',
    method: 'get',
    params: { uid }
  })
}

export function getOwnerInfoByVid(vid) {
  return request({
    url: wscURL + '/getOwnerInfoByVid',
    method: 'get',
    params: { vid }
  })
}



