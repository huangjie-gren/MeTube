<template>
  <div>
    <div>
      <video
        id="myVideo"
        class="video-js vjs-default-skin vjs-big-play-centered"
        muted
        controls
        preload="auto"
        :poster="videoAvatar"
        :src="videoSourceUrl"
        style="width:100%; height:100%; object-fit:fill"
      >您的浏览器版本不支持播放视频！</video>
    </div>
    <h1 class="title style-scope ytd-video-primary-info-renderer">{{ title }}</h1>
    <p>{{ views }}次观看</p>
    <p>{{ uploadDate }}</p>
    <el-button>{{ likes }}</el-button>
    <a>
      <img :src="ownerAvatar" alt="">
    </a>
    <p>{{ owner }}</p>
    <p>{{ collects }}</p>
    <el-button>收藏</el-button>
    <p>{{ info }}</p>
    <p>{{ typeName }}</p>
  </div>
</template>

<script>
import { getVideo } from '@/api/video'
/* eslint-disable */
export default {
  name: "PlayVideo",
	props: ["vid"],
  data() {
    return {
      uploadDate: '',
      title: '',
      info: '',
      videoSourceUrl: '',
      videoAvatar: '',
      views: 0,
      owner: '',
      ownerAvatar: '',
      collects: 0,
      likes: 0,
      typeName: '',
    }
  },
  created() {
    getVideo(this.vid)
      .then(response => {
        const { data } = response;
        const { updatedAt } = data;
        const uploadDateTmp = new Date(updatedAt);
        const y = uploadDateTmp.getFullYear();
        const m = uploadDateTmp.getMonth() + 1;
        const d = uploadDateTmp.getDate();
        this.uploadDate = y + "年" + m + "月" + d + "日";
        const { title } = data;
        this.title = title;
        const { info } = data;
        this.info = info;
        const { videoSourceUrl } = data;
        this.videoSourceUrl = videoSourceUrl;
        const { videoAvatar } = data;
        this.videoAvatar = videoAvatar;
        const { views } = data;
        this.views = views;
        const { owner } = data;
        this.owner = owner;
        const { ownerAvatar } = data;
        this.ownerAvatar = ownerAvatar;
        const { collects } = data;
        this.collects = collects;
        const { likes } = data;
        this.likes = likes;
        const { typeName }= data;
        this.typeName = typeName;
      })
      .catch(error => {
        alert(error)
      })
  }
};
</script>

<style scoped>
</style>
