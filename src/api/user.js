import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/user/logout',
    method: 'DELETE'
  })
}

export function update(data) {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/user/update',
    method: 'post',
    data
  })
}

export function reg(data) {
  return request({
    url: 'http://127.0.0.1:3000/api/v1/user/reg',
    method: 'post',
    data
  })
}
