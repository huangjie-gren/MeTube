<template>
  <div class="home">
    <div class="video-prefix">推荐视频</div>
    <div class="top">
      <div>
        <el-carousel indicator-position="outside" style="width:60%; margin:auto;">
          <el-carousel-item v-for="video in videos4" :key="video.id" style="text-align:center;">
            <!-- <h3>{{ video.title }}</h3> -->
            <img
              :src="video.avatar"
              style="display: inline-block;height:300px; max-width: 100%; cursor:pointer;"
              @click="goVideo(video)"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="video in videos" :key="video.id">
          <el-card class="video-card">
            <img
              class="video-avatar"
              :src="video.avatar"
              style="display: inline-block;height:200px; max-width: 100%; cursor:pointer;"
              @click="goVideo(video)"
            />
            <el-row :gutter="20" class="owner-info">
              <el-col :span="6" style="padding:10px; width:56px;">
                <img class="owner-avatar" :src="video.owneravatar" @click="goUser(video)" />
              </el-col>
              <el-col :span="18">
                <div class="video-title" @click="goVideo(video)">{{video.title}}</div>
                <div class="video-upname" @click="goUser(video)">{{video.ownername}}</div>
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

<script scoped>
/* eslint-disable */
import { getVideos } from "@/api/video";
export default {
  name: "home",
  props: {
    vid: {
      type: String,
      default: "-1"
    }
  },
  data() {
    return {
      videos: [],
      videos4: [],
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
        this.videos = res.data.items.data;
        this.total = res.data.total;
        this.videos4 = this.videos.slice(0, 4);
      });
    },
    goVideo(video) {
      // alert(video.ID)
      this.$router.push({ name: "showVideo", params: { videoID: video.id } });
    },
    goUser(video) {
      this.$router.push({
        name: "space",
        query: {
          uid: video.ownerid,
          uname: video.ownername,
          uavatar: video.owneravatar
        }
      });
    }
  },
  created() {
    this.load();
  },
  components: {}
};
</script>

<style scoped>
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
  cursor: pointer;
}
.video-upname {
  font-size: 14px;
  color: #606060;
  cursor: pointer;
}
.video-other {
  font-size: 14px;
  color: #606060;
}
.video-card {
  width: 100%;
  margin-bottom: 14px;
  /* cursor: pointer; */
}
.owner-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  overflow: hidden;
  cursor: pointer;
}
.owner-info {
  padding-top: 10px;
  padding-right: 24px;
}
</style>
