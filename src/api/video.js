import request from '@/utils/request'

export function getVideo(videoid) {
  return request({
    // url: 'http://1901210759.zhangqx.com/api/v1/user/login',
    url: 'http://127.0.0.1:8081/getvideo/' + videoid,
    method: 'get'
  })
}
