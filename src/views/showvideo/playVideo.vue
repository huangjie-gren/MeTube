<template>
  <div class="demo1-video">
    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered"
      muted="muted"
      controls
      autoplay
      preload="auto"
      :poster="videoAvatar"
      :src="videoUrl"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { getVideo } from "@/api/video";
export default {
  name: "PlayVideo",
  props: ["vid"],
  data() {
    return {
      videoAvatar: "",
      videoUrl: "",
    };
  },
  methods: {},
  beforeMount() {
  },
  created() {
    alert(this.vid)
     if (this.vid == 1) {
      this.videoAvatar =
        "https://metube-backend.oss-cn-beijing.aliyuncs.com/WX20191213-195644.png";
      this.videoUrl =
        "https://metube-backend.oss-cn-beijing.aliyuncs.com/1576236687649500.mp4";
    }
    // getVideo(1)
    //   .then(response => {
    //     // console.log('哈哈')
    //     const { data } = response;
    //     const { avatar } = data;
    //     const { url } = data;
    //     this.videoAvatar = avatar;
    //     // console.log(this.videoAvatar)
    //     this.videoUrl = url;
    //     // console.log(this.videoUrl)
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });
  }
};
</script>

<style scoped>
</style>
