<template>
  <div @contextmenu.prevent>
    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered"
      muted
      controls
      preload="auto"
      :poster="videoAvatar"
      :src="videoSourceUrl"
      style="width:100%;height:100%;object-fit:fill"
      controlslist="nodownload"
    >您的浏览器版本不支持播放视频！</video>
  </div>
</template>

<script>
import { getVideo } from '@/api/video'
export default {
  name: 'PlayVideo',
  props: {
    vid: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      videoSourceUrl: '',
      videoAvatar: ''
    }
  },
  created() {
    getVideo(this.vid)
      .then(response => {
        const { data } = response
        const { url } = data
        this.videoSourceUrl = url
        const { avatar } = data
        this.videoAvatar = avatar
      })
      .catch(error => {
        alert(error)
      })
  }
}
</script>

<style scoped>

</style>
