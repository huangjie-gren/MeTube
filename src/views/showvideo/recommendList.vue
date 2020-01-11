<template>
  <div style="background: #f6f5f7;">
    <div style="margin-top:10px;"></div>
    <el-container v-for="video in vData" :key="video.id" :span="6">
      <div style="margin-top:5px; margin-left: 5px; cursor:pointer" @click="handlePlay(video.id)">
        <el-image
          style="width: 140px; height: 80px"
          :src="video.avatar"></el-image>
      </div>
      <div style="height: 80px; margin-top:5px; margin-left: 8px;">
        <div style="width: 120px; font: 16px roboto,arial,sans-serif; color: #222222; cursor:pointer; max-width: 100%; overflow: hidden; -webkit-line-clamp: 2;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;" @click.prevent="handlePlay(video.id)">
          {{ video.title }}
        </div>
        <div style="margin-top:4px; width: 120px; font: 12px roboto,arial,sans-serif; color: #999999;">
          <span>Up主 {{ video.owner }}</span>
        </div>
        <div style="margin-top:4px; width: 120px; font: 12px roboto,arial,sans-serif; color: #999999;">
          <span>播放量 {{ video.views }}</span>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
/* eslint-disable */
import { getVideoInfo } from '@/api/rankinglist'
export default {
  name: 'RecommendList',
  data() {
    return {
      vData: '',
      totalData: ''
    }
  },
  created: function() {
    getVideoInfo() // 一次性获得所有信息
      .then(response => {
        const { data } = response
        this.totalData = data
        this.vData = this.totalData.slice(0, 10)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    handlePlay(id) {
      this.$router.push({ name: 'showVideo', params: { videoID: id }})
    }
  }
}
</script>

<style scoped>
</style>
