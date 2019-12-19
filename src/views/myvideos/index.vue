<template>
  <div class="app-container">
    <el-row :xs="24" :sm="6" :md="6" v-for="video in videos" :key="video.id">
      <el-card class="article-body">
        <el-row :gutter="20">
          <el-col :span="6">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
          </el-col>
          <el-col :span="14">
            <metatitle />
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import Metatitle from "./meta-title.vue";
export default {
  data() {
    return {
      videos: [
        {
          name: "video1",
          img: "",
          url: "/"
        },
        {
          name: "video2",
          img: "",
          url: "/"
        },
        {
          name: "video3",
          img: "",
          url: "/"
        }
      ]
    };
  },
  components: {
    Metatitle
  }
};
</script>

<style scoped>
.article-body {
  padding: 10px;
  margin: 20px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  margin: 10px;
  width: 100px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>


