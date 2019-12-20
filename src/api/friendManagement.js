import request from '@/utils/request'

export function ping() {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/ping',
    method: 'get'
  })
}

export function hello() {
    return request({
      url: 'http://127.0.0.1:8080/hello',
      method: 'get'
    })
  }

  export function showFollowings(id) {
    return request({
      url: 'http://localhost:8080/showFollowings',
      method: 'get',
      params: { id }
    })
  }
  export function showFollowers(id) {
    return request({
      url: 'http://localhost:8080/showFollowers',
      method: 'get',
      params: { id }
    })
  }

  export function unfollow(from, to) {
    return request({
      url: 'http://localhost:8080/unfollow',
      method: 'get',
      params: { from, to }
    })
  }