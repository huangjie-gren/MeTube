<template>
  <div>
    <el-row class="title">
      <el-row class="video-title">
        <el-col class="tit">{{ title }}</el-col>
      </el-row>
      <el-row class="video-data" gutter="20">
        <el-col class="a-crumbs" :span="1">{{ typeName }}</el-col>
        <el-col class="" :span="2">{{ uploadDate }}}</el-col>
      </el-row>
      <el-row class="video-data">
        <el-col :span="2">{{ views }}播放</el-col>
        <!--      <el-col :span="2">2238弹幕</el-col>-->
      </el-row>
    </el-row>
    <el-row style="">
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
    </el-row>
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
  .video-title{
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 26px;
    height: 26px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tit{
    margin-left: -.5em;
    vertical-align: middle;
  }
  .video-data{
    margin-top: 11px;
    font-size: 12px;
    height: 16px;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .a-crumbs{
    margin-right: 16px;
  }
</style>
