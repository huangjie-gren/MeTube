<template>
  <div class="home">
    <div class="video-prefix">推荐视频</div>
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6" v-for="video in videos" :key="video.id">
          <el-card class="video-card" @click.native="goVideo(video)">
            <img class="video-avatar" :src="video.avatar" />
            <el-row :gutter="20" class="owner-info">
              <el-col :span="6">
                <img class="owner-avatar" :src="video.owneravatar" />
              </el-col>
              <el-col :span="18">
                <div class="video-title">{{video.title}}</div>
                <div class="video-upname">{{video.ownername}}</div>
                <div class="video-other">{{video.view}}次观看</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="8"
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
      limit: 8,
      total: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1); // val 页面
      this.load();
    },
    load() {
      getVideos(this.start, this.limit).then(res => {
        console.log(res);
        this.videos = res.data.items.data;
        this.total = res.data.total;
      });
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
.video-upname {
  color: #606060;
  margin-top: 4px;
  font-size:14px;
}
.video-other {
  font-size:14px;
  color: #606060;
}
.video-card {
  width: 100%;
  margin-bottom: 14px;
  cursor: pointer;
}
.owner-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  overflow: hidden;
}
.owner-info {
  padding-top: 10px;
  padding-right: 24px;
}
</style>
