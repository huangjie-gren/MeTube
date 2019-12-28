<template>
  <div>
    <div class="welcome-line">{{ username }},欢迎你！</div>
    <div class="update-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频名称">
          <el-input v-model="form.videoname"></el-input>
        </el-form-item>
        <el-form-item label="视频简介">
          <el-input v-model="form.videodescribe"></el-input>
        </el-form-item>
        <el-form-item label="视频分类">
          <el-select v-model="form.typename" placeholder="请选择视频分类">
            <el-option label="动画" value="anime"></el-option>
            <el-option label="生活" value="life"></el-option>
            <el-option label="科技" value="tech"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频封面">
          <el-upload
            class="avatar-uploader"
            label="描述"
            action
            ref="upload"
            :before-upload="fnBeforeUploadAvatar"
            :http-request="fnUploadRequestAvatar"
            :show-file-list="false"
          >
            <img v-if="avatarImageUrl" :src="avatarImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传png/jpg文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { updateVideo } from "@/api/video";
import { ping } from "@/api/user";
import { mapGetters } from "vuex";
import { uploadoss } from "@/api/video";
import { getVideoInfo } from "@/api/video";
export default {
  computed: {
    ...mapGetters(["username"])
  },
  data() {
    return {
      vid: this.$route.params.videoID,
      avatarImageUrl: "",
      form: {
        videoname: "",
        videodescribe: "",
        avatarurl: "",
        typename: ""
      }
    };
  },
  created() {
    // this.form.nickname = "a"
    // this.nickname = this.$store.getters["nickname"];
    // this.form.username = this.$store.getters["username"];
    // alert(this.vid)
    getVideoInfo(this.vid)
      .then(res => {
        console.log(res);
        this.form.videoname = res.data.Title;
        this.form.videodescribe = res.data.Info;
        this.form.typename = res.data.Typename;
        this.avatarImageUrl = res.data.Avatar;
        this.form.avatarurl = res.data.Avatar;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    fnBeforeUploadVideo(file) {
      // const isImage = file.type === "image/png" || file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isImage) {
      //   this.$message.error("上传头像图片只能是图片!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isImage && isLt2M;
      return true;
    },
    fnUploadRequestVideo(option) {
      console.log(option.file.name);
      uploadoss({ filename: option.file.name })
        .then(res => {
          // console.log(res)
          // console.log(option.file)
          const oReq = new XMLHttpRequest();
          oReq.open("PUT", res.data.put, true);
          oReq.send(option.file);
          oReq.onload = () => {
            this.videoImageUrl = option.file.name;
            this.form.videourl = res.data.key;
          };
        })
        .catch(error => {
          this.$notify.error({
            title: "网路错误，或者服务器宕机",
            message: error
          });
        });
    },
    fnBeforeUploadAvatar(file) {
      const isImage = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传头像图片只能是图片!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    fnUploadRequestAvatar(option) {
      console.log(option.file.name);
      uploadoss({ filename: option.file.name })
        .then(res => {
          // console.log(res)
          // console.log(option.file)
          const oReq = new XMLHttpRequest();
          oReq.open("PUT", res.data.put, true);
          oReq.send(option.file);
          oReq.onload = () => {
            this.avatarImageUrl = res.data.get;
            this.form.avatarurl = res.data.get;
          };
        })
        .catch(error => {
          this.$notify.error({
            title: "网路错误，或者服务器宕机",
            message: error
          });
        });
    },
    onSubmit() {
      updateVideo({
        vid: this.vid,
        title: this.form.videoname,
        info: this.form.videodescribe,
        avatar: this.form.avatarurl,
        typename: this.form.typename
      })
        .then(response => {
          this.$notify({
            title: "修改成功",
            message: `修改成功`,
            type: "success"
          });
         this.$router.push({ name: "MyVideos" });
        })
        .catch(error => {
        //   alert(error);
          this.$notify({
            title: "修改",
            message: `修改失败`,
            type: "error"
          });
        });
    }
  }
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  max-width: 178px;
  max-height: 178px;
  display: block;
}
.video-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.video-uploader .el-upload:hover {
  border-color: #409eff;
}
.video-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.video {
  max-width: 200px;
  max-height: 100px;
  display: block;
}
</style>