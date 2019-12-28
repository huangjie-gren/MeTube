<template>
  <div class="video-container">
    <el-container>
      <el-main>
        <PlayVideo :vid="vid"/>
      </el-main>
      <el-footer>
        <el-row :gutter="20">
          <el-col :span="6">
            <div @click="handleLike" :title="likeTitle">
              <svg-icon :icon-class="likeIcon" />
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="handleCollection" :title="collectionTitle">
              <svg-icon :icon-class="collectionIcon" />
            </div>
          </el-col>
          <!-- <el-col :span="6"><div @click="handleCollection" :title="collectionTitle"><i :class="collectionIcon"></i></div></el-col> -->
          <el-col :span="6">
            <div :title="分享">
              <i class="el-icon-share"></i>
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
/* eslint-disable */
import PlayVideo from "./playVideo.vue";
import { mapGetters } from "vuex";
import { upload } from "@/api/user.js";
import { addLike } from "@/api/like_collection";
import { cancleLike } from "@/api/like_collection";
import { addCollect } from "@/api/like_collection";
import { cancleCollect } from "@/api/like_collection";

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
    PlayVideo,
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