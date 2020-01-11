<template>
  <div class="video-container">
    <el-row :gutter="20" flex style="padding:20px 76px;">
      <el-col :span="18" style="height:50rem; background-color: white;">
        <el-row>
          <VideoInfo :vid="vid" />
        </el-row>
        <el-row>
          <PlayVideo :vid="vid" />
        </el-row>
        <el-row>
          <favor :vid="vid" />
        </el-row>
        <el-row>
          <Comment :vid="vid" />
        </el-row>
      </el-col>
      <el-col :span="6" style="height:50rem">
        <el-row>
          <Profile :vid="vid" />
        </el-row>
        <el-row>
          <RecommendList />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import PlayVideo from "./playVideo.vue";
import { mapGetters } from "vuex";
import Comment from './comment'
import Favor from "./favor"
import RecommendList from './recommendList'
import Profile from './profile'
import VideoInfo from './videoInfo'

export default {
    computed: {
    ...mapGetters(["username","nickname","id"])
  },
  data() {
    return {
      vid:parseInt(this.$route.params.videoID),
    };
  },
  components:{
    Comment,
    RecommendList,
    Profile,
    Favor,
    PlayVideo,
    VideoInfo
  }
};
</script>
@import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>
