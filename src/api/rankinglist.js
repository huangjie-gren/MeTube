import request from '@/utils/request'
import { crURL } from '@/utils/const'

export function getVideoInfo() {
  return request({
    url: crURL + '/rankinglist',
    method: 'get'
  })
}
