import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/user/logout',
    method: 'DELETE'
  })
}

export function update(data) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/user/update',
    method: 'post',
    data
  })
}

export function reg(data) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/user/reg',
    method: 'post',
    data
  })
}

export function ping() {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/ping',
    method: 'get'
  })
}

export function upload(data) {
  return request({
    url: 'http://123.56.96.92:3001/api/v1/upload/token',
    method: 'post',
    data
  })
}
