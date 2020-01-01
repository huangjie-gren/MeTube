<template>
  <div class="app-container">
    <el-row :xs="24" :sm="6" :md="6" v-for="video in videos" :key="video.id">
      <el-card class="article-body">
        <el-row :gutter="20">
          <el-col :span="6">
            <img
            v-bind:src="video.img"
              class="image"
            />
          </el-col>
          <el-col :span="12">
            <el-row class="meta-title">
              <span class="typename">{{ video.typename }}</span>
              <a v-on:click="goVideo(vid)" class="name ellipsis">{{ video.name }}</a>
            </el-row>
            <el-row class="meta-status">
              <span class="pubdate">{{ video.createtime }}</span>
            </el-row>
          </el-col>
          <el-col :span="6" class="meta-btn">
            <el-row>
              <el-button type="primary" @click.native="doUpdate(video.vid)">编辑</el-button>
            </el-row>
            <el-row>
              <el-button type="info" style="margin-top:10px;">数据</el-button>
            </el-row>
            <el-row>
              <el-button type="danger" style="margin-top:10px;" @click.native="doDelete(video.vid)" >删除</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import { getMyVideo, deleteVideo } from "@/api/video";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["id"])
  },
  data() {
    return {
      uid : this.$store.getters["id"],
      videos: [
      ]
    };
  },
  methods:{
    doUpdate: function (vid) {
      // alert(vid)
      this.$router.push({ name: "UpdateVideo", params: { videoID: vid } });
    },
    doDelete: function(vid){
      this.$confirm('此操作将删除该视频, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteVideo(vid).then(res => {
            console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          }).catch(err => {
            console.log(err)
          this.$message({
            type: 'eroor',
            message: '删除失败!'
          });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    goVideo: function(vid){
      alert(vid)
    }
  },
  created() {
    getMyVideo(this.uid).then(res =>{
      for(var i=0;i<res.data.length;i++){
        var video = {
          vid: res.data[i].id,
          name: res.data[i].title,
          img: res.data[i].avatar,
          typename: res.data[i].typename,
          createtime: res.data[i].created_at.split('T')[0]
        }
        this.videos.push(video)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  components: {}
};
</script>

<style scoped>
.article-body {
  padding: 20px;
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
  width: 150px;
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

.meta-title .typename {
  display: inline-block;
  padding: 0 8px;
  border: 1px solid #e5e9ef;
  color: #666;
  border-radius: 12px;
  vertical-align: top;
  line-height: 22px;
  margin-right: 10px;
}
.meta-title .name {
  display: inline-block;
  max-width: 420px;
  font-size: 18px;
  color: #212121;
}
.meta-status {
  padding: 18px 0 20px;
}
.meta-status .pubdate {
  display: inline-block;
  color: #99a2aa;
  font-weight: 400;
  padding-right: 20px;
  border-right: 1px solid #e5e9ef;
  vertical-align: middle;
}
.meta-footer .view-stat {
  display: inline-block;
  float: left;
  margin-right: 20px;
  color: #99a2aa;
}
.meta-btn {
  text-align: center;
}
</style>


