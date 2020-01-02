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

export function showActivity(id) {
  return request({
    url: wscURL + '/showActivity',
    method: 'get',
    params: { id }
  })
}

export function getUserInfo(id) {
  return request({
    url: wscURL + '/getUserInfo',
    method: 'get',
    params: { id }
  })
}

export function countFollowers(id) {
  return request({
    url: wscURL + '/countFollowers',
    method: 'get',
    params: { id }
  })
}

export function countFollowings(id) {
  return request({
    url: wscURL + '/countFollowings',
    method: 'get',
    params: { id }
  })
}