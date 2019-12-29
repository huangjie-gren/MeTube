<template>
  <div class="home">
    <div class="video-prefix">推荐视频</div>
    <div class="top">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="6" :md="6" v-for="video in videos" :key="video.id">
          <el-card class="video-card" @click.native="goVideo(video)">
            <img class="video-avatar" :src="video.Avatar" />
            <div>
              <div class="video-title">{{video.Title}}</div>
              <div class="video-bottom clearfix">
                <!-- <span class="video-info">{{video.info.substring(0, 40)}}</span> -->
                <span class="video-info">{{video.Info}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="6"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getVideos } from "@/api/video";
export default {
  name: "home",
  data() {
    return {
      videos: [],
      start: 0,
      limit: 6,
      total: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1); // val 页面
      this.load();
    },
    load() {
      console.log("zairu");
      getVideos(this.start, this.limit).then(res => {
        this.videos = res.data.items.data;
        this.total = res.data.total;
        console.log(this.videos);
      });
      console.log(this.videos);
      console.log(this.videos[0].Title);
    },
    goVideo(video) {
      // alert(video.ID)
      this.$router.push({ name: "showVideo", params: { videoID: video.ID } });
    }
  },
  created() {
    this.load();
  },
  components: {}
};
</script>

<style>
.video-prefix {
  /* background-color: red; */
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 36px 0 24px 24px;
}
.video-avatar {
  width: 100%;
}
.video-title {
  margin: 4px 0px 4px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.video-bottom {
  margin-top: 4px;
}
.video-info {
  color: #909399;
}
.video-card {
  margin-bottom: 14px;
  cursor: pointer;
}
</style>
