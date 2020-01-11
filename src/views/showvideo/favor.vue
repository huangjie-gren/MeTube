<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div @click="handleLike" :title="likeTitle">
          <span>
            <svg-icon :icon-class="likeIcon" />
            &nbsp;&nbsp;{{num_like}}
          </span>
        </div>
      </el-col>
      <el-col :span="6">
        <div @click="handleCollection" :title="collectionTitle">
          <span>
            <svg-icon :icon-class="collectionIcon" />
            &nbsp;&nbsp;{{ num_collect }}
          </span>
        </div>
      </el-col>
      <el-col :span="6">
        <div title="分享">
          <i class="el-icon-share"></i>
          &nbsp;&nbsp;{{num_share}}
        </div>
      </el-col>
      <el-col :span="6">
        <div title="更多">
          <i class="el-icon-more"></i>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div>{{description}}</div>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import { addLike } from "@/api/like_collection";
import { cancleLike } from "@/api/like_collection";
import { addCollect } from "@/api/like_collection";
import { cancleCollect } from "@/api/like_collection";
import { countLike } from "@/api/like_collection";
import { countCollect } from "@/api/like_collection";
import { user_video } from "@/api/like_collection";
import { getVideo } from "@/api/video";
import { truncate } from "fs";
import { getToken } from '../../utils/auth'

export default {
  name: "favor",
  computed: {
    ...mapGetters(["username", "nickname", "id"])
  },
  data() {
    return {
      uid: "",
      vid: this.$route.params.videoID,
      likeTitle: "点赞",
      collectionTitle: "收藏",
      isLike: false,
      isCollection: false,
      collectionIcon: "collection-off",
      likeIcon: "like-off",
      num_like: 0,
      num_collect: 0,
      num_share: 0,
      description: "",
      islogin: getToken() == "" || getToken() == undefined ? false : true,
    };
  },
  created() {
    this.uid = this.$store.getters["id"];
    if(typeof(this.uid)=="undefined"){
      this.uid = -1;
    }
    user_video(this.uid, this.vid)
      .then(res => {
        const { data } = res;
        this.isLike = data.like > 0;
        this.isCollection = data.collect > 0;
        this.num_like = data.like_count;
        this.num_share = data.share_count;
        this.num_collect = data.collect_count;

        if (this.isLike) {
          this.likeIcon = "like-on";
          this.likeTitle = "取消点赞";
        } else {
          this.likeIcon = "like-off";
          this.likeTitle = "点赞";
        }

        if (this.isCollection) {
          this.collectionIcon = "collection-on";
          this.collectionTitle = "取消收藏";
        } else {
          this.collectionIcon = "collection-off";
          this.collectionTitle = "收藏";
        }
      })
      .catch(error => {
        // alert("user_video");
      });

    getVideo(this.vid)
      .then(res => {
        const { data } = res;
        const { info } = data;
        this.description = info;
      })
      .catch(error => {
        // alert("get_info_error");
      });
  },
  methods: {

    handleLike: function() {

      if(this.uid < 0){
          this.$router.push('/login');
          return;
      }
      else{
      if (!this.isLike) {
        this.isLike = true;
        this.likeIcon = "like-on";
        this.likeTitle = "取消点赞";
        this.num_like = this.num_like + 1;

        addLike(this.uid, this.vid)
          .then(response => {})
          .catch(error => {
            // console.log("uid:"+this.uid);
          });
      }
      else {
        this.isLike = false;
        this.likeIcon = "like-off";
        this.likeTitle = "点赞";
        this.num_like = this.num_like - 1;

        cancleLike(this.uid, this.vid)
          .then(response => {
            const { code } = response;
            // console.log(code);
          })
          .catch(error => {
          //  console.log("uid:"+this.uid);
          });
      }
      }
    },
    handleCollection: function() {
       if(this.uid < 0){
          this.$router.push('/login');
          return;
      }
       else{
      if (!this.isCollection) {
        this.isCollection = true;
        this.collectionIcon = "collection-on";
        this.collectionTitle = "取消收藏";
        this.num_collect = this.num_collect + 1;

        addCollect(this.uid, this.vid)
          .then(response => {})
          .catch(error => {
            console.log("uid:"+this.uid);
          });
      }
      else {
        this.isCollection = false;
        this.collectionIcon = "collection-off";
        this.collectionTitle = "收藏";
        this.num_collect = this.num_collect - 1;

        cancleCollect(this.uid, this.vid)
          .then(response => {})
          .catch(error => {
            console.log("uid:"+this.uid);
          });
      }
    }
  }
  }
};
</script>

<style scoped>
</style>
