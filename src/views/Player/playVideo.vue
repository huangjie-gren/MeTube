<template>
  <div class="demo1-video">
    <el-button type="primary" @click="onClick">play</el-button>
    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered"
      muted="muted"
      controls
      preload="auto"
      :poster="videoAvatar"
      :src="videoUrl"
    ></video>
  </div>
</template>

<script>
import { getVideo } from '@/api/video'
export default {
  name: 'PlayVideo',
  data() {
    return {
      videoAvatar: '',
      videoUrl: ''
    }
  },
  methods: {
    onClick() {
      getVideo(1)
        .then(response => {
          // console.log('哈哈')
          const { data } = response
          const { avatar } = data
          const { url } = data
          this.videoAvatar = avatar
          // console.log(this.videoAvatar)
          this.videoUrl = url
          // console.log(this.videoUrl)
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
