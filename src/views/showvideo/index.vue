<template>
  <div class="video-container">
<!--    <el-container>-->
<!--      <el-main>-->
<!--        <PlayVideo :vid="vid" />-->
<!--      </el-main>-->
<!--      <el-footer>-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="6">-->
<!--            <div @click="handleLike" :title="likeTitle">-->
<!--              <svg-icon :icon-class="likeIcon" />-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="6">-->
<!--            <div @click="handleCollection" :title="collectionTitle">-->
<!--              <svg-icon :icon-class="collectionIcon" />-->
<!--            </div>-->
<!--          </el-col>-->
<!--          &lt;!&ndash; <el-col :span="6"><div @click="handleCollection" :title="collectionTitle"><i :class="collectionIcon"></i></div></el-col> &ndash;&gt;-->
<!--          <el-col :span="6">-->
<!--            <div :title="分享">-->
<!--              <i class="el-icon-share"></i>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-footer>-->
<!--    </el-container>-->
    <el-row :gutter="20" flex style="padding:20px 76px;">
      <el-col :span="18" style="height:50rem; background-color: white;">
        <playVideo :vid="vid" />
        <favor />
<!--        <el-row class="title" style="" >-->
<!--          <el-row class="video-title">-->
<!--            <el-col class="tit">【登月计划】Fate/stay night深度解析Part10.正义的伙伴</el-col>-->
<!--          </el-row>-->
<!--          <el-row class="video-data" gutter="20">-->
<!--            <el-col class="a-crumbs" :span="1">视频类别</el-col>-->
<!--            <el-col class="" :span="2">2019-12-29 15:21:05</el-col>-->
<!--          </el-row>-->
<!--          <el-row class="video-data">-->
<!--              <el-col :span="2"> 13.7万播放</el-col>-->
<!--            <el-col :span="2">2238弹幕</el-col>-->

<!--          </el-row>-->
<!--        </el-row>-->
<!--        <el-row style=""><PlayVideo :vid="vid" /></el-row>-->
<!--        <el-row class="bottom" style="background-color: chartreuse">vvvv</el-row>-->
      </el-col>
      <el-col :span="6" style="height:50rem; background-color: red;">
<!--        <el-row class="userinfo" style="background-color: coral">cccc</el-row>-->
<!--        <el-row class="recommend" style="background-color: cadetblue">ddd</el-row>-->
        <profile />
        <recommendList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import playVideo from "./playVideo.vue";
import { mapGetters } from "vuex";
import { upload } from "@/api/user.js";
import { addLike } from "@/api/like_collection";
import { cancleLike } from "@/api/like_collection";
import { addCollect } from "@/api/like_collection";
import { cancleCollect } from "@/api/like_collection";
import favor from "./favor"
import recommendList from './recommendList'
import profile from './profile'

export default {
    computed: {
    ...mapGetters(["username","nickname","id"])
  },
  data() {
    return {
      uid:'',
      vid:this.$route.params.videoID,
      likeTitle: "点赞",
      collectionTitle: "收藏",
      isLike: false,
      isCollection: false,
      collectionIcon: "collection-off",
      likeIcon: "like-off"
    };
  },
  created() {
    this.uid = this.$store.getters["id"];
    console.log("用户id"+this.uid)
  },
  methods: {
    handleLike: function() {
      //alert(this.vid)
      if (!this.isLike) {
        this.isLike = true;
        this.likeIcon = "like-on";
        this.likeTitle = "取消点赞";

        addLike(this.uid,this.vid)
        .then(response=>{
        })
        .catch(error => {
          alert('add_like_error')
      })

      } else {
        this.isLike = false;
        this.likeIcon = "like-off";
        this.likeTitle = "点赞";

        cancleLike(this.uid,this.vid)
        .then(response=>{
         const { code }=response
          console.log(code)
        })
        .catch(error => {
          alert('cancle_like_error')
      })
      }
    },
    handleCollection: function() {



        if (!this.isCollection) {

        this.isCollection = true;
        this.collectionIcon = "collection-on";
        this.collectionTitle = "取消收藏";

        addCollect(this.uid,this.vid)
        .then(response=>{

        })
        .catch(error => {
          alert('add_collect_error')
      })

      } else {

        this.isCollection = false;
        this.collectionIcon = "collection-off";
        this.collectionTitle = "收藏";

        cancleCollect(this.uid,this.vid)
        .then(response=>{
        })
        .catch(error => {
          alert('handle_collect_error')
      })
      }
    }
  },
  components:{
    recommendList,
    profile,
    favor,
    playVideo,
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
