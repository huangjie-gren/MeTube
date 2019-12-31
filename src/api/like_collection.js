import request from '@/utils/request'

const preUrl = 'http://49.233.170.51:8080'

export function addLike(uid,vid) {
    return request({
      url: preUrl + '/like',
      method: 'get',
      params: { uid,vid }
    })
  }
  export function cancleLike(uid,vid) {
    return request({
      url: preUrl + '/unlike',
      method: 'get',
      params: { uid,vid }
    })
  }

  export function addCollect(uid,vid) {
    return request({
      url: preUrl + '/collect',
      method: 'get',
      params: { uid,vid }
    })
  }

  export function cancleCollect(uid,vid) {
    return request({
      url: preUrl + '/uncollect',
      method: 'get',
      params: { uid,vid }
    })
  }

  export function countLike(vid) {
    return request({
      url: preUrl + '/showMyLikes',
      method: 'get',
      params: { vid }
    })
  }

  export function countCollect(vid) {
    return request({
      url: preUrl + '/showMyCollections',
      method: 'get',
      params: { vid }
    })
  }

