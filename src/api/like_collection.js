import request from '@/utils/request'
import { wscURL } from '@/utils/const'

/* eslint-disable */
export function addLike(uid,vid) {
    return request({
      url: wscURL + '/like',
      method: 'get',
      params: { uid,vid }
    })
  }
  export function cancleLike(uid,vid) {
    return request({
      url: wscURL + '/unlike',
      method: 'get',
      params: { uid,vid }
    })
  }

  export function addCollect(uid,vid) {
    return request({
      url: wscURL + '/collect',
      method: 'get',
      params: { uid,vid }
    })
  }

  export function cancleCollect(uid,vid) {
    return request({
      url: wscURL + '/uncollect',
      method: 'get',
      params: { uid,vid }
    })
  }

  export function countLike(vid) {
    return request({
      url: wscURL + '/showMyLikes',
      method: 'get',
      params: { vid }
    })
  }

  export function countCollect(vid) {
    return request({
      url: wscURL + '/showMyCollections',
      method: 'get',
      params: { vid }
    })
  }

