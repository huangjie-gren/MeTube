<template>
  <div style="margin-left:150px; margin-right:150px;">
    <img class="bg" :src="bg" />
    <el-row class="h-user">
      <el-col class="h-avatar" :span="6">
        <img class="h-avatar" :src="uavatar" />
      </el-col>
      <el-col :span="18" class="h-basic">
        <div class="h-name">{{uname}}</div>
      </el-col>
    </el-row>
    <el-row style="margin:20px; font-size:20px">TA的视频</el-row>
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
            <el-col :span="6">
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
  </div>
</template>

<script>
/* eslint-disable */
import { getMyVideo } from "@/api/video";
export default {
  data() {
    return {
      bg:
        "http://i0.hdslb.com/bfs/space/cb1c3ef50e22b6096fde67febe863494caefebad.png",
      uid: this.$route.query.uid,
      uavatar: this.$route.query.uavatar,
      uname: this.$route.query.uname,
      videos: [{ title: "aa" }]
    };
  },
  created() {
    // console.log(this.$route.query.uid);
    getMyVideo(this.uid)
      .then(res => {
        // console.log(res.data);
        this.videos = res.data;
      })
      .catch(err => {
        consolelog(err);
      });
  },
  methods: {
    goVideo(video) {
      // alert(video.ID)
      this.$router.push({ name: "showVideo", params: { videoID: video.id } });
    },
    goUser(video) {
      if (video.ownername == this.uname) {
        location.reload();
      } else {
        this.$router.push({
          name: "space",
          query: {
            uid: video.ownerid,
            uname: video.ownername,
            uavatar: video.owneravatar
          }
        });
      }
    }
  }
};
</script>
<style>
.body {
  /* font-family: Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif; */
}
.bg {
  position: relative;
  width: 100%;
}
.h-user {
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 100px;
  margin-left: 20px;
  padding-bottom: 16px;
}
.h-avatar {
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 48px;
}
.h-basic {
  float: left;
  color: #fff;
  font-size: 0;
  margin: 10px 0 0 20px;
}
.h-name {
  display: inline-block;
  margin-right: 5px;
  width: 100%;
  font-weight: 700;
  line-height: 18px;
  font-size: 18px;
  vertical-align: middle;
}
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
}
.owner-info {
  padding-top: 10px;
  padding-right: 24px;
}
</style>
